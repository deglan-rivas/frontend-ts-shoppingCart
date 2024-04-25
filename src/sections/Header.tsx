import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CartItem } from "@/types"

type HeaderProps = {
  cart: CartItem[]
}

type CarItemProps = {
  guitar: CartItem
}

function CartItemGuitar({guitar}: CarItemProps) {
  const  {name, image, price, quantity} = guitar

  return (
    <tr className="border-b border-gray-300">
      <td className="">
        <img src={`/img/${image}.jpg`} alt={`${image}`} className="w-8 mx-auto"/>
      </td>
      <td className="text-center">
        {name}
      </td>
      <td className="text-center font-semibold">
        {"$"}{price}
      </td>
      <td className="text-center space-x-2">
        <span className="p-0 w-4 h-6 font-semibold rounded-md inline-flex justify-center items-center bg-black text-white">
          +
        </span>
        <span>
          {quantity}
        </span>
        <span className="p-0 w-4 h-6 font-semibold rounded-md inline-flex justify-center items-center bg-black text-white">
          -
        </span>
      </td>
      <td className="text-center">
        <div className="bg-red-500 text-white rounded-full p-1 font-semibold">
          x
        </div>
      </td>
    </tr>
  )
}

export default function Header ({cart}: HeaderProps) {
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
                        cart.map((guitar) => (
                          <CartItemGuitar key={guitar.id} guitar={guitar} />
                        ))
                      }
                    </tbody>
                  </table>

                  <div className="text-right mb-4">
                    Total pagar:
                    <span className="font-semibold">
                      $1276
                    </span>
                  </div>

                  <button className="uppercase w-full px-4 py-2 text-center text-white bg-black rounded-md font-semibold hover:bg-black/90">
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