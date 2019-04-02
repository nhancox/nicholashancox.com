# nicholashancox.com

This is the source for my personal site, [nicholashancox.com](https://nicholashancox.com).

## Acknowledgments/Tools Used

* Netlify: hosting and deployment
* Bulma: CSS framework
* Font Awesome: LinkedIn and GitHub icons
* Fontello: To extract only the used icons and easily rename them to avoid browser and ad-block filtering
* Yarn: Package management

## Notes

### Netlify

* Publish Directory: `public/`
* Redirects and Routing: `public/_redirects`

#### Asset Optimization

* URLs: pretty URLs

Netlify uses a CDN for included images by default. However, to reduce reliance on third-party domains other assets are kept separate (e.g., CSS files are not optimized through Netlify's pipeline).

### Bulma

The minified Bulma CSS is committed to avoid any build step requirement.

`scripts/get_bulma` can be used to download Bulma and move the minified version to the proper location.

### Fontello

The Fontello files were compiled outside of the project. To replicate, use the provided `fontello.config.json`.
