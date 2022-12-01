const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, './src/**/*.{ts,html}'),
    join(__dirname, './header/**/*.{ts,html}'),
    join(__dirname, './button/**/*.{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: [
    {
      pattern: /tui-./
    }
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
