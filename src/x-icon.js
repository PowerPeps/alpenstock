document.addEventListener('alpine:init', () => {
  const cache = new Map()

  const providers = {
    lucide: (name) => `https://unpkg.com/lucide-static@latest/icons/${name}.svg`,
    pixel:  (name) => `https://unpkg.com/pixelarticons@1.8.1/svg/${name}.svg`
  }

  Alpine.directive('icon', (el, { expression, value }) => {
    if (!expression) return
    const resolver = providers[value]
    if (!resolver) return

    const url = resolver(expression)

    const render = (svg) => {
      const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
      const node = doc.querySelector('svg')
      if (!node) return
      Array.from(el.attributes).forEach(attr => {
        if (!attr.name.startsWith('x-icon')) {
          node.setAttribute(attr.name, attr.value)
        }
      })
      el.replaceWith(node)
    }

    if (cache.has(url)) {
      cache.get(url).then(render)
    } else {
      const p = fetch(url).then(r => r.text())
      cache.set(url, p)
      p.then(render).catch(() => console.warn(`[x-icon] ${expression} not found`))
    }
  })
})
