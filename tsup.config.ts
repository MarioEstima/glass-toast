import { defineConfig } from 'tsup'

/**
 * Library build. Emits a single ESM bundle with TypeScript declarations.
 * React, react-native and react-native-reanimated stay external (peers).
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  platform: 'neutral',
  external: ['react', 'react-native', 'react-native-reanimated', 'react-native-web', 'react-native-svg'],
})
