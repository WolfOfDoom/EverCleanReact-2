export default function ProductCard({ p }) {
    return (
        <article className="card" aria-label={`Producto ${p.name}`}>
            <img src={p.image} alt={`Foto de ${p.name}`} />
            <h3 style={{ margin: '0.5rem 0' }}>{p.name}</h3>
            <div className="price">${p.price.toLocaleString('es-MX')} MXN</div>
            <div style={{ marginTop: '.35rem' }}>
                {p.sizes.map(s => <span key={s} className="badge">Talla {s}</span>)}
            </div>
            <small className="muted">Color: {p.color}</small>
        </article>
    )
}
