---
name: migrate
description: Safely migrate a project to a new location with verification
---

# Project Migration

Safely migrate a project from one location to another.

## Pre-Migration Checklist

1. **Commit all changes** in source repository
2. **Push to remote** as backup
3. **Verify target path** is on local disk (NOT OneDrive/cloud sync)
4. **Verify target path** uses English-only folder names (no Japanese/Unicode)

## Migration Steps

### 1. Copy with Exclusions
```powershell
robocopy "<source>" "<target>" /E /XD node_modules .next dist .turbo /XF nul
```

### 2. Verify Copy
- Check `.git` directory exists
- Check key source files exist
- Confirm excluded dirs were NOT copied

### 3. Clean Install
```bash
cd "<target>"
npm install
# For Next.js projects with peer deps:
npm install --legacy-peer-deps
```

### 4. Verify Build
```bash
npx tsc --noEmit    # TypeScript check
npm run build        # Full build
```

### 5. Update Git Remote (if needed)
```bash
git remote set-url origin <new-url>
```

## Post-Migration Cleanup
- Delete old location (after confirming new build works)
- Update any CI/CD paths
- Update CLAUDE.md with new paths

## Known Issues
- OneDrive paths cause hanging builds due to file sync I/O
- Japanese folder names cause cp932/UTF-8 encoding issues in CLI tools
- Windows `nul` files created by `> nul` in git bash (use `> /dev/null` instead)
- `setInterval` in proxy.ts/middleware.ts blocks build process termination
- Always use `--legacy-peer-deps` for Next.js 16+ projects
- After migration, delete `.next` and rebuild from clean state
