# Use the official Node.js runtime as base image
FROM node:20-alpine AS base

# Install git (needed for submodules)
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy only files needed for postinstall (fumadocs-mdx)
COPY source.config.ts tsconfig.json vite-env.d.ts ./

# Install dependencies
# postinstall script (fumadocs-mdx) needs source.config.ts which we just copied
RUN npm ci

# Copy source code and config files needed for build
COPY src ./src
COPY next.config.mjs postcss.config.mjs ./
COPY tsconfig.json ./

# Initialize and update git submodules
# This handles the case where Railway clones without submodules
RUN if [ -d .git ]; then \
      echo "Git repository found. Initializing submodules..."; \
      git submodule update --init --recursive || true; \
    fi && \
    if [ ! -d content ] || [ -z "$(ls -A content 2>/dev/null)" ]; then \
      echo "Content directory missing or empty. Fetching submodule content from GitHub..."; \
      rm -rf content; \
      git clone --depth 1 https://github.com/TheRSGuide/TheRSGuide.git content; \
      echo "Content submodule fetched successfully."; \
    else \
      echo "Content directory already exists with files. Skipping submodule fetch."; \
    fi && \
    if [ ! -d src/mdx_components ] || [ -z "$(ls -A src/mdx_components 2>/dev/null)" ]; then \
      echo "MDX components directory missing or empty. Fetching submodule from GitHub..."; \
      rm -rf src/mdx_components; \
      git clone --depth 1 https://github.com/TheRSGuide/MDX-Component-Lib.git src/mdx_components; \
      echo "MDX components submodule fetched successfully."; \
    else \
      echo "MDX components directory already exists with files. Skipping submodule fetch."; \
    fi

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies only
# Skip postinstall script since build already completed in base stage
RUN npm ci --omit=dev --ignore-scripts

# Copy built application and runtime files
COPY --from=base /app/.next ./.next
COPY --from=base /app/content ./content
COPY --from=base /app/next.config.mjs ./
# Create public directory (Next.js expects it, even if empty)
RUN mkdir -p ./public

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]

