import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    total,
    placeOrder
  } = useStore()

  const navigate = useNavigate()

  function handleOrder() {
    const result = placeOrder()

    if (result.error) {
      alert(result.error)
      navigate('/login')
      return
    }

    alert('🎉 Order placed successfully! Thank you for shopping with Lumora.')
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <main className="cart-page empty-cart">
        <h1>Your Cart 🛒</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <h1>Your Cart 🛒</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image_url} alt={item.name} />

              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>Rs. {item.price}</p>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button className="remove-button"
                  onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>

              <strong>
                Rs. {Number(item.price) * item.quantity}
              </strong>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="total-row">
            <span>Total</span>
            <strong>Rs. {total}</strong>
          </div>

          <button className="place-order-button" onClick={handleOrder}>
            Place Order
          </button>
        </div>
      </div>
    </main>
  )
}

export default Cart