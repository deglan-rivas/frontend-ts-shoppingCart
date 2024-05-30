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


export const initialState: CartState = {
  cart: []
}

export const cartReducer = (
  state: CartState = initialState,
  action: CartAction
) => {

  switch (action.type) {
    case "add-to-cart":
      return {
        ...state
      }
    case "increase-quantity":
      return {
        ...state
      }
    case "decrease-quantity":
      return {
        ...state
      }
    case "delete-cart-item":
      return {
        ...state
      }
    case "clean-cart":
      return {
        ...state
      }
    default:
      return state
  }
}