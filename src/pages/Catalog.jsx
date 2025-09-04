import { useEffect, useState } from 'react'
import { getAll } from '../services/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Catalog() {
    const [products, setProducts] = useState([])
    useEffect(() => { setProducts(getAll()) }, [])
    return (
        <>
            <header style={{ marginBottom: '1rem' }}>
                <h1 style={{ margin: '0 0 .25rem' }}>Catálogo</h1>
                <small className="muted">Criterio H1: imágenes, precios y tallas visibles.</small>
            </header>
            <section className="grid">
                {products.map(p => <ProductCard key={p.id} p={p} />)}
            </section>
        </>
    )
}
