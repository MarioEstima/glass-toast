// Minimal web shim for `@react-native/assets-registry/registry`, which the
// react-native-svg web build imports for asset resolution (unused on web).
export function getAssetByID() {
  return undefined
}
export function registerAsset() {
  return -1
}
