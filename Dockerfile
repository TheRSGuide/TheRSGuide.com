# Use the official Node.js runtime as base image
FROM node:20-alpine AS base

# Install git (needed for submodules)
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application (but we'll handle content separately)
COPY . .

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
      echo "Submodule content fetched successfully."; \
    else \
      echo "Content directory already exists with files. Skipping submodule fetch."; \
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

# Copy built application from builder
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/content ./content
COPY --from=base /app/next.config.mjs ./
COPY --from=base /app/src ./src
COPY --from=base /app/source.config.ts ./
COPY --from=base /app/tsconfig.json ./
COPY --from=base /app/postcss.config.mjs ./

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]

