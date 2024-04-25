import type { Guitar } from '../types/index';

type GuitarItemProps = {
  guitar: Guitar
  addToCart: (item: Guitar) => void
}

type MainProps = {
  // db: Array<Guitar>
  db: Guitar[]
  addToCart: (item: Guitar) => void
}

function GuitarItem ({guitar, addToCart} : GuitarItemProps) {

  const { name, image, description, price } = guitar

  return (
    <div className="grid grid-cols-3 px-4 gap-4">
      <div className="col-span-1">
        <img src={`/img/${image}.jpg`} alt={`${image}`} />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <h4 className="font-medium uppercase text-2xl">
          {name}
        </h4>
        <p>
          {description}
        </p>
        <p className="text-orange-600 font-semibold text-3xl">
          {/* {"$"}{price} */}
          ${price}
        </p>
        <button className="w-full bg-black text-white uppercase text-center text-lg font-semibold py-2 hover:bg-black/90"
          onClick={() => addToCart(guitar)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default function Main ({db, addToCart}: MainProps) {
  return (
    <main>
      <h2 className="text-orange-600 text-3xl md:text-5xl w-full text-center py-8 font-bold">
        Nuestra Colección
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 py-12">
        {db.map(guitar => (
          <>
            <GuitarItem
              key = {guitar.id}
              guitar = {guitar}
              addToCart = {addToCart}
            />
          </>
        ))}
      </div>
    </main>
  )
}