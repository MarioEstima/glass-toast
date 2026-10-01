let counter = 0

/** Generates a unique toast id. */
export function generateToastId(): string {
  counter = (counter + 1) % Number.MAX_SAFE_INTEGER
  return `glass-toast-${Date.now().toString(36)}-${counter.toString(36)}`
}
