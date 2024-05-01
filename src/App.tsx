import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Main from "./sections/Main";

import { useEffect, useMemo, useState } from "react";

import { db } from "@/data/db";
import { CartItem, CartItemId, Guitar } from "./types";

const MAX_ITEMS = 5
const MIN_ITEMS = 1

function App() {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // const [cart, setCart] = useState([])
  // const [cart, setCart] = useState([] as Guitar[])
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  function addToCart(item: Guitar): void {
    // const updatedCart = [...cart, item]
    // setCart(updatedCart)

    const hasCartItem = cart.some(carItem => carItem.id === item.id)
    if (hasCartItem) {
      // not null assertion operator
      const cartItem: CartItem = cart.find(carItem => carItem.id === item.id)!
      // if (item?.quantity >= MAX_ITEMS) return
      if (cartItem.quantity >= MAX_ITEMS) return
      const updatedCart = cart.map(carItem => {
        if (carItem.id === item.id) {
          return {
            ...carItem,
            quantity: carItem.quantity + 1
          }
        }
        return carItem
      })
      setCart(updatedCart)
      return
    }

    const carItem: CartItem = { ...item, quantity: 1 }
    setCart(prevCart => [...prevCart, carItem])
    return
  }

  const totalPrice = useMemo(() =>
    cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0), [cart]
  )

  function increaseQuantity(cart: CartItem[], id: CartItemId): void {
    const updatedCart: CartItem[] = cart.map((carItem) => {
      if (carItem.id === id) {
        if (carItem.quantity >= MAX_ITEMS) return carItem
        return {
          ...carItem,
          quantity: carItem.quantity + 1
        }
      }
      return carItem
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(cart: CartItem[], id: CartItemId): void {
    const updatedCart: CartItem[] = cart.map((carItem) => {
      if (carItem.id === id) {
        if (carItem.quantity <= MIN_ITEMS) return carItem
        return {
          ...carItem,
          quantity: carItem.quantity - 1
        }
      }
      return carItem
    })
    setCart(updatedCart)
  }

  function deleteCartItem(cart: CartItem[], id: CartItemId): void {
    const updatedCart: CartItem[] = cart.filter((carItem) => carItem.id !== id)
    setCart(updatedCart)
  }

  function clearCart(): void {
    setCart([])
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart])

  return (
    <>
      <Header
        cart={cart}
        totalPrice={totalPrice}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteCartItem={deleteCartItem}
        cleanCart={clearCart}
        isEmpty={isEmpty}
      />
      <Main
        db={db}
        addToCart={addToCart}
      />
      <Footer />
    </>
  )
}

export default App
