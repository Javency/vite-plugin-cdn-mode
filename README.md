## Install

```bash
$ npm install vite-plugin-cdn-mode -D

# or

$ yarn add vite-plugin-cdn-mode -D

# or

$ pnpm add vite-plugin-cdn-mode -D

```

## Usage

```js
import { defineConfig } from 'vite'
import cdnPlugin from 'vite-plugin-cdn-mode'

export default defineConfig({
  plugins: [
    // ...
    cdnPlugin({
      modules: [
        {
          name: 'package name',
          var: 'used variable name',
          mode: 'script-mode',
          path: 'script-src',
          css: 'link-href',
        },
      ],
    }),
  ],
})
```
