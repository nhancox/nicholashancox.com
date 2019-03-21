# nicholashancox.com

This is the source for my personal site, [nicholashancox.com](https://nicholashancox.com).

## Acknowledgments/Tools Used

* Netlify: hosting and deployment
* Bulma: CSS framework
* Font Awesome: LinkedIn and GitHub icons
* Fontello: To extract only the used icons and easily rename them to avoid browser and ad-block filtering
* Yarn: Package management

## Notes

### Bulma

The minified Bulma CSS is committed to avoid any build step requirement.

`scripts/get_bulma` can be used to download Bulma and move the minified version to the proper location.

### Fontello

The Fontello files were compiled outside of the project. To replicate, use the provided `fontello.config.json`.
