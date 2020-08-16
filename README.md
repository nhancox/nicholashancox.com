# nicholashancox.com

This is the source for my personal site,
[nicholashancox.com](https://www.nicholashancox.com).

## Production Build

```sh
npm install
npm run build
```

The build process is custom, with PostCSS, PostHTML and Rollup with terser
forming the base.

All processed files appear in a `dist/` directory at the project root. This
directory is structured so that the file paths are the same as the site's
routes.

The site is completely static, so only that single directory has to be served.

## Development

```sh
npm run dev
```

Browsersync is used to watch files, trigger rebuilds and refresh attached
browsers. The triggered build processes save over existing files and don't
utilize any sort of filename hashing, so the directory doesn't have to be
cleaned between builds.

To manually clean out the `dist/` directory, use `npm run clean`.

## Deployment

The site is hosted by [Netlify](https://www.netlify.com/) and is automatically
deployed when changes are detected on this GitHub repository.

The few settings required are contained in [`netlify.toml`](netlify.toml).
