import Footer from "./sections/Footer"
import Header from "./sections/Header"
import Main from "./sections/Main"

import { useEffect, useState } from "react"

import { db } from "@/data/db";
import { CartItem, CartItemId, Guitar } from "./types";

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


  function addToCart (item: Guitar): void {
    // const updatedCart = [...cart, item]
    // setCart(updatedCart)

    const existsCarItem = cart.some(carItem => carItem.id === item.id)
    if(existsCarItem) {
      const updatedCart = cart.map(carItem => {
        if(carItem.id === item.id) {
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

    const carItem: CartItem = {...item, quantity: 1}
    setCart(prevCart => [...prevCart, carItem])
    return
  }

  function calculateTotalPrice (cart: CartItem[]): number {
    return cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
  }

  function increaseQuantity (cart: CartItem[], id: CartItemId): void {
    const updatedCart: CartItem[] = cart.map((carItem) => {
      if(carItem.id === id) {
        return {
          ...carItem,
          quantity: carItem.quantity + 1
        }
      }
      return carItem
    })
    setCart(updatedCart)
  }

  function decreaseQuantity (cart: CartItem[], id: CartItemId): void {
    const updatedCart: CartItem[] = cart.map((carItem) => {
      if(carItem.id === id) {
        return {
          ...carItem,
          quantity: carItem.quantity - 1
        }
      }
      return carItem
    })
    setCart(updatedCart)
  }

  function deleteCartItem (cart: CartItem[], id: CartItemId): void {
    const updatedCart: CartItem[] = cart.filter((carItem) => carItem.id !== id)
    setCart(updatedCart)
  }

  function clearCart (): void {
    setCart([])
  }

  function isEmpty (cart: CartItem[]): boolean {
    return cart.length === 0
  }

  return (
    <>
      <Header
        cart = {cart}
        calculateTotalPrice = {calculateTotalPrice}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        deleteCartItem={deleteCartItem}
        cleanCart = {clearCart}
        isEmpty = {isEmpty}
      />
      <Main
        db = {db}
        addToCart = {addToCart}
      />
      <Footer/>
    </>
  )
}

export default App
