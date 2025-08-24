# 📚 Git Commands for Deployment

## 🚀 Initial Setup (if needed)

```bash
# Initialize git repository
git init

# Add remote origin
git remote add origin <your-github-repo-url>

# Check remote
git remote -v
```

## 📝 Daily Development Workflow

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Fix deployment configuration and optimize build"

# Push to main branch
git push origin main
```

## 🔄 Update from Remote

```bash
# Pull latest changes
git pull origin main

# Or fetch and merge
git fetch origin
git merge origin/main
```

## 🏷️ Create and Switch Branches

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch to existing branch
git checkout main

# List all branches
git branch -a
```

## 🚨 Emergency Fixes

```bash
# If something goes wrong, reset to last commit
git reset --hard HEAD

# If you need to force push (be careful!)
git push origin main --force
```

## 📋 Check Deployment Status

```bash
# View commit history
git log --oneline -10

# Check which files changed
git diff HEAD~1
```

## 🔧 Recommended Commit Messages

```bash
git commit -m "Fix: Resolve Netlify deployment issues"
git commit -m "Feat: Add SEO optimization and meta tags"
git commit -m "Fix: Update build configuration for production"
git commit -m "Docs: Add deployment instructions and README"
git commit -m "Perf: Optimize bundle size and loading speed"
```

## 🌐 After Pushing to GitHub

1. **Netlify will automatically detect the push**
2. **Build process will start**
3. **Check Netlify dashboard for build status**
4. **Site will be updated at**: https://poetic-kelpie-2d5bfe.netlify.app/

## ⚠️ Important Notes

- **Always commit before pushing**
- **Use descriptive commit messages**
- **Don't commit node_modules or dist folders**
- **Check build logs if deployment fails**