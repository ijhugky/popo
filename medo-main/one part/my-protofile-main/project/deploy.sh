#!/bin/bash

echo "🚀 Starting deployment process..."

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
    echo "🌐 Ready for deployment to Netlify!"
    
    # List build files
    echo "📋 Build contents:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi