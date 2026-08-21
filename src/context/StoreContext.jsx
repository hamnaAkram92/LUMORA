import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialProducts } from '../data/products'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lumora-products')
    return saved ? JSON.parse(saved) : initialProducts
  })

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('lumora-cart')
    return saved ? JSON.parse(saved) : []
  })

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lumora-user')
    return saved ? JSON.parse(saved) : null
  })

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('lumora-orders')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('lumora-products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('lumora-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (user) localStorage.setItem('lumora-user', JSON.stringify(user))
    else localStorage.removeItem('lumora-user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('lumora-orders', JSON.stringify(orders))
  }, [orders])

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem('lumora-users') || '[]')
    if (users.some(item => item.email.toLowerCase() === email.toLowerCase())) {
      return { error: 'An account with this email already exists.' }
    }

    users.push({ email, password })
    localStorage.setItem('lumora-users', JSON.stringify(users))
    setUser({ email })
    return { error: null }
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('lumora-users') || '[]')
    const found = users.find(
      item => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    )

    if (!found) return { error: 'Invalid email or password.' }

    setUser({ email: found.email })
    return { error: null }
  }

  function logout() {
    setUser(null)
  }

  function addProduct(product) {
    const newProduct = {
      ...product,
      id: Date.now()
    }
    setProducts(current => [newProduct, ...current])
  }

  function addToCart(product) {
    setCart(current => {
      const existing = current.find(item => item.id === product.id)
      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  function increaseQuantity(id) {
    setCart(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseQuantity(id) {
    setCart(current =>
      current
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setCart(current => current.filter(item => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  function placeOrder() {
    if (!user) return { error: 'Please login before placing an order.' }

    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    const order = {
      id: Date.now(),
      userEmail: user.email,
      total,
      items: cart,
      createdAt: new Date().toISOString()
    }

    setOrders(current => [order, ...current])
    clearCart()
    return { error: null }
  }

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart]
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  return (
    <StoreContext.Provider
      value={{
        products,
        user,
        cart,
        orders,
        total,
        cartCount,
        signUp,
        login,
        logout,
        addProduct,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        placeOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}