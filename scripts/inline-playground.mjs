// Inlines the built playground (dist-playground) into a single HTML file so it
// can be previewed without a dev server. Uses replacement FUNCTIONS because a
// plain string replacement would interpret `$&`-style patterns inside the JS
// bundle (React ships literal `$&/` strings) and corrupt it.
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] ?? process.cwd()
const dist = path.join(root, 'dist-playground')

const files = fs.readdirSync(path.join(dist, 'assets'))
const jsFile = files.find((f) => f.endsWith('.js'))
const cssFile = files.find((f) => f.endsWith('.css'))
if (!jsFile || !cssFile) {
  console.error('Missing bundle assets in dist-playground/assets')
  process.exit(1)
}

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
// Drop the external script tag(s) — we inline them.
html = html.replace(/<script[^>]*src="[^"]*"[^>]*>\s*<\/script>/g, () => '')

const js = fs.readFileSync(path.join(dist, 'assets', jsFile), 'utf8')
const css = fs.readFileSync(path.join(dist, 'assets', cssFile), 'utf8')

// Neutralize sequences that terminate or confuse the HTML script tokenizer.
const safeJs = js
  .replace(/<\/script/gi, () => '<\\/script')
  .replace(/<!--/g, () => '\\x3C!--')
  .replace(/<script/gi, () => '\\x3Cscript')

const inline = `<style>${css}</style><script type="module">${safeJs}</` + `script>`
html = html.replace('</head>', () => `${inline}</head>`)

const out = path.join(dist, 'index.inline.html')
fs.writeFileSync(out, html)
console.log(`inline playground written: ${out} (${(html.length / 1024).toFixed(0)} kB)`)
