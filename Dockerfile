FROM node:20-alpine AS base

ARG GITHUB_TOKEN

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./
COPY source.config.ts tsconfig.json vite-env.d.ts ./

RUN npm ci

COPY src ./src
COPY next.config.mjs postcss.config.mjs ./

# Fetch submodules (handles Railway not cloning submodules)
RUN set -e; \
    # Try git submodule first if .git exists
    if [ -d .git ]; then git submodule update --init --recursive 2>/dev/null || true; fi; \
    # Clone content if missing/empty (public repo)
    if [ ! -d content ] || [ -z "$(ls -A content 2>/dev/null)" ]; then \
      rm -rf content; \
      git clone --depth 1 https://github.com/TheRSGuide/TheRSGuide.git content; \
    fi; \
    # Clone MDX components if missing/empty (private repo - needs GITHUB_TOKEN)
    if [ ! -d src/mdx_components ] || [ -z "$(ls -A src/mdx_components 2>/dev/null)" ]; then \
      rm -rf src/mdx_components; \
      if [ -n "$GITHUB_TOKEN" ]; then \
        git clone --depth 1 https://${GITHUB_TOKEN}@github.com/TheRSGuide/MDX-Component-Lib.git src/mdx_components; \
      else \
        echo "ERROR: GITHUB_TOKEN required for private MDX-Component-Lib repo" && exit 1; \
      fi; \
    fi

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=base /app/.next ./.next
COPY --from=base /app/content ./content
COPY --from=base /app/next.config.mjs ./
RUN mkdir -p ./public

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]

