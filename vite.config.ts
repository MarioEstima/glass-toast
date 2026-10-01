import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Playground/dev config: maps `react-native` to `react-native-web`
// so the same library source runs in the browser.
export default defineConfig({
  plugins: [react()],
  define: {
    // react-native-web expects the Metro-style `__DEV__`/`global` globals.
    __DEV__: 'true',
    global: 'globalThis',
  },
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: 'react-native-web' },
      // Web shim: the registry package is RN-CLI-only (asset resolution).
      { find: /@react-native\/assets-registry\/registry/, replacement: '/patches/@react-native_assets-registry-registry.js' },
    ],
    // Prefer the web variants shipped by react-native-svg (the default
    // entries import Flow-only fabric files).
    extensions: ['.web.js', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    // Keep the playground output separate from the library `dist/`.
    outDir: 'dist-playground',
  },
})
