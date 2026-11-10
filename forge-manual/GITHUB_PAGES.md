# GitHub Pages Deployment Guide

## Setup GitHub Pages

1. **Push to GitHub:**
   ```bash
   cd /home/ryoku/Work/Github/Infinix-X663-GSI-Fixes
   git add .
   git commit -m "Add modern branding and GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Save

3. **Wait 2-3 minutes** for deployment

4. **Your site will be live at:**
   ```
   https://[YOUR-USERNAME].github.io/GSI-Ready-X663/
   ```

## What's Deployed

### Main Pages
- **Homepage:** `index.html` - Landing page with logo, banner, features
- **Interactive Guide:** `docs/interactive-guide.html` - Step-by-step installation
- **Logo:** `assets/logo.html` - Animated brand logo (800x200)
- **Banner:** `assets/banner.html` - Before/after visualization (1280x640)

### Update README Links

Replace placeholder links in README with actual GitHub Pages URLs:

```markdown
![Banner](https://[YOUR-USERNAME].github.io/GSI-Ready-X663/assets/banner.html)

[📱 Interactive Installation Guide](https://[YOUR-USERNAME].github.io/GSI-Ready-X663/docs/interactive-guide.html)
```

## Custom Domain (Optional)

If you have a custom domain:

1. Create `CNAME` file in repository root:
   ```
   gsi-x663.yourdomain.com
   ```

2. Add DNS record:
   ```
   Type: CNAME
   Name: gsi-x663
   Value: [YOUR-USERNAME].github.io
   ```

3. Enable HTTPS in GitHub Pages settings

## Local Preview

Test before pushing:

```bash
# Simple HTTP server
cd /home/ryoku/Work/Github/Infinix-X663-GSI-Fixes
python3 -m http.server 8000

# Visit: http://localhost:8000
```

## File Structure
```
GSI-Ready-X663/
├── index.html              ← Homepage (NEW)
├── README.md
├── docs/
│   ├── interactive-guide.html
│   └── NEW_README.md
├── assets/
│   ├── logo.html           ← Animated logo (NEW)
│   ├── banner.html         ← Animated banner (NEW)
│   ├── logo.svg           (old - can remove)
│   └── banner.svg         (old - can remove)
└── ...
```

## SEO Optimization

### Add to README.md
```markdown
<div align="center">

<iframe src="https://[YOUR-USERNAME].github.io/GSI-Ready-X663/assets/banner.html" width="1280" height="640" frameborder="0"></iframe>

# GSI-Ready X663

**[🚀 Get Started](https://[YOUR-USERNAME].github.io/GSI-Ready-X663/docs/interactive-guide.html)** | 
**[📖 Documentation](https://github.com/[YOUR-USERNAME]/GSI-Ready-X663)** | 
**[💬 Support](https://t.me/MedoX71T)**

</div>
```

### Social Media Sharing

When sharing on social media, use these URLs:
- **Main site:** `https://[YOUR-USERNAME].github.io/GSI-Ready-X663/`
- **Banner preview:** `https://[YOUR-USERNAME].github.io/GSI-Ready-X663/assets/banner.html`
- **Logo preview:** `https://[YOUR-USERNAME].github.io/GSI-Ready-X663/assets/logo.html`

## Analytics (Optional)

Add Google Analytics or Plausible to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Troubleshooting

### Assets not loading
Check file paths are relative:
- ✅ `assets/logo.html`
- ❌ `/assets/logo.html`

### 404 errors
Ensure all files are committed and pushed to main branch.

### Slow loading
HTML files are lightweight and load instantly. If slow, check internet connection.

## Next Steps

1. Update `index.html` - Replace `[YOUR-USERNAME]` with actual GitHub username
2. Push to GitHub
3. Enable Pages in settings
4. Update README with live URLs
5. Share on XDA, Reddit, Telegram
