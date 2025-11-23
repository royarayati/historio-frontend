# Build Timeout Fix - Liara Deployment

## Problem
Build is timing out after 5 minutes on Liara platform. The `npm ci` completes successfully, but `npm run build` takes too long.

## Solutions Applied

### 1. Build Memory Optimization
Added memory allocation to build script:
```json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```
This allocates 4GB of memory to Node.js during build, preventing out-of-memory issues.

### 2. Next.js Build Optimizations
Added to `next.config.js`:
- `experimental.optimizeCss: true` - Optimizes CSS during build
- Webpack optimizations for deterministic module IDs
- PWA build optimizations with reduced runtime caching

### 3. PWA Build Optimization
Optimized PWA configuration to reduce build time:
- Set `mode: 'production'`
- Reduced `runtimeCaching` to empty array during build
- Optimized service worker generation

## Alternative Solutions (If Still Timing Out)

### Option A: Temporarily Disable PWA (Fastest Build)
If PWA is not critical, you can temporarily disable it:

**In `next.config.js`:**
```javascript
// Temporarily disable PWA for faster builds
const pwaConfig = process.env.DISABLE_PWA === 'true' 
  ? nextConfig 
  : withPWA({...})(nextConfig);
```

**In `package.json`:**
```json
"build": "DISABLE_PWA=true NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Option B: Use Build Cache
Liara should cache `node_modules` between builds. Ensure:
- `package-lock.json` is committed
- Dependencies are stable

### Option C: Optimize Dependencies
Review and remove unused dependencies:
```bash
npm install -g depcheck
depcheck
```

### Option D: Split Build Process
If the project is very large, consider:
1. Reducing the number of pages being built
2. Using dynamic imports for large components
3. Disabling static page generation for non-critical pages

## Monitoring Build Performance

After deploying, check build logs for:
- Build time duration
- Memory usage
- Specific slow steps

## Next Steps

1. ✅ Push optimized configuration to GitHub
2. ✅ Trigger new deployment on Liara
3. ⏳ Monitor build logs
4. ⏳ If still timing out, try Option A (disable PWA temporarily)

## Expected Results

With these optimizations:
- Build should complete in **3-4 minutes** (under 5-minute limit)
- Memory allocation prevents OOM errors
- Optimized PWA build reduces service worker generation time

---

**Status:** Optimizations applied and pushed to GitHub ✅  
**Next:** Deploy from GitHub and monitor build time

