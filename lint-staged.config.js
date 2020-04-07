module.exports = {
  "*.{json,json5,jsonc}": ["npm run lint:prettier"],
  "*.css": ["npm run lint:prettier"],
  "*.html": ["npm run lint:prettier"],
  "*.js": ["npm run lint:eslint"], // ESLint internally runs Prettier
  "*.md": ["npm run lint:markdown", "npm run lint:prettier"]
};
