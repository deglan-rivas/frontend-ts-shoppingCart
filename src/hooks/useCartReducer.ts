import { CartContext } from "@/context/CartContext"
import { useContext } from "react"

export const useCartReducer = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCartReducer must be used within a CartProvider')
  }

  return context
}