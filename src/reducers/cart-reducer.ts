import { CartItem } from "@/types";

export type CartState = {
  cart: CartItem[]
}

export type CartAction =
  { type: "add-to-cart", payload: { item: CartItem } } |
  { type: "increase-quantity", payload: { id: CartItem["id"] } } |
  { type: "decrease-quantity", payload: { id: CartItem["id"] } } |
  { type: "delete-cart-item", payload: { id: CartItem["id"] } } |
  { type: "clean-cart" }

const getLSCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
  cart: getLSCart()
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export const cartReducer = (
  state: CartState = initialState,
  action: CartAction
) => {

  switch (action.type) {
    case "add-to-cart": {
      const hasCartItem = state.cart.some(carItem => carItem.id === action.payload.item.id)
      if (hasCartItem) {
        // not null assertion operator
        const cartItem: CartItem = state.cart.find(carItem => carItem.id === action.payload.item.id)!
        // if (item?.quantity >= MAX_ITEMS) return
        if (cartItem.quantity >= MAX_ITEMS) return
        const updatedCart = state.cart.map(carItem => {
          if (carItem.id === action.payload.item.id) {
            return {
              ...carItem,
              quantity: carItem.quantity + 1
            }
          }
          return carItem
        })
        return {
          ...state,
          cart: updatedCart
        }
      }

      const carItem: CartItem = { ...action.payload.item, quantity: 1 }
      return {
        ...state,
        cart: [...state.cart, carItem]
      }
    }


    case "increase-quantity": {
      const updatedCart: CartItem[] = state.cart.map((carItem) => {
        if (carItem.id === action.payload.id) {
          if (carItem.quantity >= MAX_ITEMS) return carItem
          return {
            ...carItem,
            quantity: carItem.quantity + 1
          }
        }
        return carItem
      })

      return {
        ...state,
        cart: updatedCart
      }
    }

    case "decrease-quantity": {
      const updatedCart: CartItem[] = state.cart.map((carItem) => {
        if (carItem.id === action.payload.id) {
          if (carItem.quantity <= MIN_ITEMS) return carItem
          return {
            ...carItem,
            quantity: carItem.quantity - 1
          }
        }
        return carItem
      })

      return {
        ...state,
        cart: updatedCart
      }
    }
    case "delete-cart-item": {
      const updatedCart: CartItem[] = state.cart.filter((carItem) => carItem.id !== action.payload.id)

      return {
        ...state,
        cart: updatedCart
      }
    }
    case "clean-cart":
      return {
        ...state,
        cart: []
      }
    default:
      return state
  }
}