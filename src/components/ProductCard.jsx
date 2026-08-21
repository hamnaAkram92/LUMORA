function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />

      <div className="product-info">
        <span className="category">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <div className="product-bottom">
          <strong>Rs. {product.price}</strong>
          <button onClick={() => onAddToCart(product)}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard