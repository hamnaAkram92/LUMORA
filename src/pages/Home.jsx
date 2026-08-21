import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

function Home() {
  const { products, addToCart } = useStore()
  const [category, setCategory] = useState('All')

  const filteredProducts =
    category === 'All'
      ? products
      : products.filter(product => product.category === category)

  return (
    <main>
      <section className="hero">
        <p>WELCOME TO LUMORA</p>
        <h1>Jewelry & Clothes<br />Made For You ✨</h1>
        <p>Discover beautiful pieces for every occasion.</p>
      </section>

      <section className="products-section">
        <div className="section-heading">
          <h2>Our Collection</h2>

          <div className="filters">
            {['All', 'Jewelry', 'Clothes'].map(item => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item === 'Jewelry' ? '💎 Jewelry' : item === 'Clothes' ? '👗 Clothes' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home