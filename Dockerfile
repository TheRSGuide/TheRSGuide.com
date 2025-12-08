FROM node:20-alpine AS base

ARG GITHUB_TOKEN

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./
COPY source.config.ts tsconfig.json vite-env.d.ts ./

RUN npm ci

COPY src ./src
COPY next.config.mjs postcss.config.mjs ./

RUN ([ -d .git ] && git submodule update --init --recursive || true) || true; \
    ([ ! -d content ] || [ -z "$(ls -A content 2>/dev/null)" ]) && \
      rm -rf content && \
      git clone --depth 1 https://github.com/TheRSGuide/TheRSGuide.git content || exit 1; \
    ([ ! -d src/mdx_components ] || [ -z "$(ls -A src/mdx_components 2>/dev/null)" ]) && \
      rm -rf src/mdx_components && \
      if [ -n "$GITHUB_TOKEN" ]; then \
        git clone --depth 1 https://${GITHUB_TOKEN}@github.com/TheRSGuide/MDX-Component-Lib.git src/mdx_components || exit 1; \
      else \
        git clone --depth 1 https://github.com/TheRSGuide/MDX-Component-Lib.git src/mdx_components || exit 1; \
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

