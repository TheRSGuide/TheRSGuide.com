# Railway Deployment Setup

This project uses Git submodules for content management. Here are the recommended ways to deploy to Railway:

## Option 1: Use Railway Environment Variable (Recommended)

Set the following environment variable in your Railway project settings:

```
RAILWAY_GIT_CLONE_FLAGS=--recursive --depth 1
```

This tells Railway to clone the repository with submodules automatically. This is the simplest solution.

**How to set it:**
1. Go to your Railway project
2. Navigate to Variables
3. Add a new variable:
   - Name: `RAILWAY_GIT_CLONE_FLAGS`
   - Value: `--recursive --depth 1`
4. Redeploy your service

## Option 2: Use Dockerfile (Automatic Fallback)

The project includes a `Dockerfile` that automatically handles submodules. If Railway detects a Dockerfile, it will use it for building.

The Dockerfile will:
- Check if `.git` exists and initialize submodules if it does
- If `.git` doesn't exist, it will clone the submodule content directly from GitHub
- Build your Next.js application

This works automatically - no additional configuration needed. Submodules are handled entirely during the Docker build process.

## Troubleshooting

If you're still getting 404 errors:

1. **Check build logs**: Look for messages about submodule initialization
2. **Verify content directory**: After build, check if the `content` directory exists and has files
3. **Check Railway logs**: Look for any errors during the build process
4. **Try Option 1 first**: The environment variable approach is the most reliable

## Testing Locally

To test the build process locally (simulating Railway):

```bash
# Build using Docker (simulates Railway's build process)
docker build -t thersguide-test .

# Or test the submodule handling directly
docker build --target base -t thersguide-test .
```

The Dockerfile will automatically handle fetching the submodule content if needed.

