import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCartReducer } from "@/hooks/useCartReducer"
import { CartAction } from "@/reducers/cart-reducer"
import { CartItem } from "@/types"
import { Dispatch, useEffect } from "react"

type CarItemProps = {
  guitar: CartItem
  dispatch: Dispatch<CartAction>
}

function CartItemGuitar({ guitar, dispatch }: CarItemProps) {
  const { name, image, price, quantity } = guitar

  return (
    <tr className="border-b border-gray-300">
      <td className="">
        <img src={`/img/${image}.jpg`} alt={`${image}`} className="w-8 mx-auto" />
      </td>
      <td className="text-center">
        {name}
      </td>
      <td className="text-center font-semibold">
        {"$"}{price}
      </td>
      <td className="text-center space-x-2">
        <span className="p-0 w-4 h-6 font-semibold rounded-md inline-flex justify-center items-center bg-black text-white cursor-pointer"
          onClick={() => dispatch({ type: "increase-quantity", payload: { id: guitar.id } })}
        >
          +
        </span>
        <span>
          {quantity}
        </span>
        <span className="p-0 w-4 h-6 font-semibold rounded-md inline-flex justify-center items-center bg-black text-white cursor-pointer"
          onClick={() => dispatch({ type: "decrease-quantity", payload: { id: guitar.id } })}
        >
          -
        </span>
      </td>
      <td className="text-center">
        <div className="bg-red-500 text-white rounded-full p-1 font-semibold cursor-pointer"
          onClick={() => dispatch({ type: "delete-cart-item", payload: { id: guitar.id } })}
        >
          x
        </div>
      </td>
    </tr>
  )
}

export default function Header() {
  const { totalPrice, isEmpty, state, dispatch } = useCartReducer()

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <section className="w-full bg-[url(/img/header.jpg)] bg-center bg-no-repeat bg-cover">
      <div className=" bg-black/55">
        <header className="px-6 py-12 flex justify-between items-center container">
          <img src="/img/logo.svg" alt="logo de GuitarLA"
            className="w-48"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="data-[state=delayed-open]:bg-gray-800">
                <img src="/img/carrito.png" alt="carrito de compras"
                  className="w-6"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end">
                <div className="bg-white w-96 ">
                  {
                    isEmpty ? (
                      <p className="text-center font-semibold">El carrito está vacio</p>
                    ) : (
                      <table className="w-full mb-4">
                        <thead>
                          <tr className="border-b border-gray-300 pb-2">
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {
                            state.cart.map((guitar) => (
                              <CartItemGuitar
                                key={guitar.id}
                                guitar={guitar}
                                dispatch={dispatch}
                              />
                            ))
                          }
                        </tbody>
                      </table>
                    )
                  }

                  <div className="text-right mb-4">
                    Total pagar:
                    <span className="font-semibold">
                      ${totalPrice}
                    </span>
                  </div>

                  <button className="uppercase w-full px-4 py-2 text-center text-white bg-black rounded-md font-semibold hover:bg-black/90"
                    onClick={() => dispatch({ type: "clean-cart" })}
                  >
                    Vaciar carrito
                  </button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
      </div>
    </section>
  )
}