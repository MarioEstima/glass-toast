import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute path so the optimizer resolves the shim regardless of importer dir.
const ASSETS_REGISTRY_SHIM = path.resolve(process.cwd(), 'patches/@react-native_assets-registry-registry.js')

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
      // Absolute path: the dep optimizer resolves replacements against the
      // filesystem (a root-relative '/patches/...' would look at /patches).
      { find: /@react-native\/assets-registry\/registry/, replacement: ASSETS_REGISTRY_SHIM },
    ],
    // Prefer the web variants shipped by react-native-svg (the default
    // entries import Flow-only fabric files).
    extensions: ['.web.js', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  optimizeDeps: {
    // Vite 8's rolldown optimizer does NOT inherit the top-level `resolve`
    // options. Without these, it tries to parse the real `react-native`
    // package (Flow syntax) and fails with "Flow is not supported".
    rolldownOptions: {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          '@react-native/assets-registry/registry': ASSETS_REGISTRY_SHIM,
        },
        extensions: ['.web.js', '.mjs', '.js', '.json'],
      },
    },
  },
  build: {
    // Keep the playground output separate from the library `dist/`.
    outDir: 'dist-playground',
  },
})
