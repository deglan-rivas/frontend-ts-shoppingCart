import { CartAction, cartReducer, CartState, initialState } from "@/reducers/cart-reducer";
import { createContext, Dispatch, useMemo, useReducer } from "react";

type CartContextProps = {
  state: CartState
  dispatch: Dispatch<CartAction>
  isEmpty: boolean
  totalPrice: number
}

export const CartContext = createContext<CartContextProps>(null!)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const isEmpty = useMemo(() => state.cart.length === 0, [state.cart])
  const totalPrice = useMemo(() =>
    state.cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0), [state.cart]
  )


  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        isEmpty,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}