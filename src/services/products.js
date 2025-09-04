const KEY = 'everclean.products'

const seed = [
    {
        id: 'p1',
        name: 'Oxford Impermeable',
        price: 1299,
        sizes: ['26', '26.5', '27'],
        color: 'Negro',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200'
    },
    {
        id: 'p2',
        name: 'Derby Casual',
        price: 1199,
        sizes: ['25', '26', '27.5'],
        color: 'Café',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200'
    },
    {
        id: 'p3',
        name: 'Monk Strap',
        price: 1599,
        sizes: ['26', '27', '28'],
        color: 'Miel',
        image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200'
    }
]

function load() {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
        localStorage.setItem(KEY, JSON.stringify(seed))
        return seed
    }
    try { return JSON.parse(raw) } catch { return seed }
}

function save(list) { localStorage.setItem(KEY, JSON.stringify(list)) }

export function getAll() { return load() }

export function create(p) {
    const list = load()
    const id = 'p' + (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 8))
    const prod = { ...p, id }
    list.push(prod); save(list); return prod
}

export function update(id, partial) {
    const list = load()
    const i = list.findIndex(x => x.id === id)
    if (i < 0) throw new Error('Producto no encontrado')
    list[i] = { ...list[i], ...partial }; save(list); return list[i]
}

export function remove(id) {
    const list = load().filter(x => x.id !== id)
    save(list)
    return true
}
