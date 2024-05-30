import { CartAction, cartReducer, CartState, initialState } from "@/reducers/cart-reducer";
import { createContext, Dispatch, useReducer } from "react";

type CartContextProps = {
  state: CartState
  dispatch: Dispatch<CartAction>
}

export const CartContext = createContext<CartContextProps>(null!)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  )
}