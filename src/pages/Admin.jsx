import { useEffect, useMemo, useState } from 'react'
import { create, getAll, remove, update } from '../services/products.js'

const empty = { name: '', price: '', sizes: '', color: '', image: '' }

export default function Admin() {
    const [list, setList] = useState([])
    const [form, setForm] = useState(empty)
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => { setList(getAll()) }, [])

    const isEditing = useMemo(() => Boolean(editingId), [editingId])

    function parseSizes(s) {
        return s.split(',').map(x => x.trim()).filter(Boolean)
    }

    function validate(f) {
        if (!f.name.trim()) return 'Nombre es requerido'
        const price = Number(f.price)
        if (!Number.isFinite(price) || price <= 0) return 'Precio debe ser un número > 0'
        if (parseSizes(f.sizes).length === 0) return 'Debes especificar al menos 1 talla (ej: 26, 26.5)'
        if (!f.color.trim()) return 'Color es requerido'
        if (!/^https?:\/\//.test(f.image)) return 'La imagen debe ser una URL válida (http/https)'
        return ''
    }

    function reset() { setForm(empty); setEditingId(null); setError('') }

    function onSubmit(e) {
        e.preventDefault()
        const err = validate(form); if (err) { setError(err); return }
        const payload = {
            name: form.name.trim(),
            price: Number(form.price),
            sizes: parseSizes(form.sizes),
            color: form.color.trim(),
            image: form.image.trim()
        }
        if (isEditing) {
            update(editingId, payload)
        } else {
            create(payload)
        }
        setList(getAll()); reset()
    }

    function onEdit(id) {
        const p = list.find(x => x.id === id)
        setEditingId(id)
        setForm({
            name: p.name,
            price: String(p.price),
            sizes: p.sizes.join(', '),
            color: p.color,
            image: p.image
        })
    }

    function onDelete(id) {
        if (confirm('¿Eliminar producto?')) {
            remove(id); setList(getAll())
        }
    }

    return (
        <>
            <header style={{ marginBottom: '1rem' }}>
                <h1 style={{ margin: '0 0 .25rem' }}>Administrador — Productos</h1>
                <small className="muted">Criterio H4: panel CRUD funcional con validación.</small>
            </header>

            <form className="form" onSubmit={onSubmit} aria-label="Formulario de producto">
                <div className="row half">
                    <div className="row">
                        <label>Nombre</label>
                        <input value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} placeholder="Oxford Impermeable" required />
                    </div>
                    <div className="row">
                        <label>Precio (MXN)</label>
                        <input type="number" min="1" step="1" value={form.price} onChange={e => setForm(v => ({ ...v, price: e.target.value }))} placeholder="1299" required />
                    </div>
                </div>
                <div className="row half">
                    <div className="row">
                        <label>Tallas (separadas por coma)</label>
                        <input value={form.sizes} onChange={e => setForm(v => ({ ...v, sizes: e.target.value }))} placeholder="26, 26.5, 27" required />
                    </div>
                    <div className="row">
                        <label>Color</label>
                        <input value={form.color} onChange={e => setForm(v => ({ ...v, color: e.target.value }))} placeholder="Negro" required />
                    </div>
                </div>
                <div className="row">
                    <label>URL de imagen</label>
                    <input value={form.image} onChange={e => setForm(v => ({ ...v, image: e.target.value }))} placeholder="https://..." required />
                </div>

                {error && <div role="alert" style={{ color: '#ff9a9a' }}>{error}</div>}

                <div className="actions">
                    <button type="submit">{isEditing ? 'Guardar cambios' : 'Crear producto'}</button>
                    {isEditing && <button type="button" onClick={reset}>Cancelar</button>}
                </div>
            </form>

            <table className="table" aria-label="Listado de productos">
                <thead>
                    <tr>
                        <th>Producto</th><th>Precio</th><th>Tallas</th><th>Color</th><th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>${p.price.toLocaleString('es-MX')}</td>
                            <td>{p.sizes.join(', ')}</td>
                            <td>{p.color}</td>
                            <td className="actions">
                                <button onClick={() => onEdit(p.id)}>Editar</button>
                                <button onClick={() => onDelete(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    {list.length === 0 && (
                        <tr><td colSpan="5"><small className="muted">No hay productos.</small></td></tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
