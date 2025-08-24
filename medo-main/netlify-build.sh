#!/bin/bash

echo "🚀 Starting Netlify build process..."

# Navigate to project directory
cd "one part/my-protofile-main/project"

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: dist/"
    echo "🌐 Ready for Netlify deployment!"
    
    # Copy netlify.toml to dist if it doesn't exist
    if [ ! -f "dist/netlify.toml" ]; then
        echo "📋 Copying netlify.toml to dist..."
        cp ../../netlify.toml dist/
    fi
    
    echo "📋 Final build contents:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi