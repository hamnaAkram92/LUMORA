import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function AddProduct() {
  const { addProduct } = useStore()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState('Jewelry')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    addProduct({
      name,
      description,
      price: Number(price),
      image_url: imageUrl,
      category
    })

    setMessage('Product added successfully! ✨')

    setTimeout(() => navigate('/'), 700)
  }

  return (
    <main className="add-product-page">
      <div className="form-box">
        <h1>Add New Product ✨</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Product name" value={name}
            onChange={e => setName(e.target.value)} required />

          <textarea placeholder="Product description" value={description}
            onChange={e => setDescription(e.target.value)} required />

          <input type="number" placeholder="Price" value={price}
            onChange={e => setPrice(e.target.value)} min="1" required />

          <input type="url" placeholder="Image URL" value={imageUrl}
            onChange={e => setImageUrl(e.target.value)} required />

          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Jewelry">Jewelry</option>
            <option value="Clothes">Clothes</option>
          </select>

          <button type="submit">Add Product</button>
        </form>

        {message && <p className="success-message">{message}</p>}
      </div>
    </main>
  )
}

export default AddProduct