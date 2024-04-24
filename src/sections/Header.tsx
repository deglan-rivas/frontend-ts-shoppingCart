export default function Header () {
  return (
    <section className="w-full bg-[url(/img/header.jpg)] bg-center bg-no-repeat bg-cover">
      <div className=" bg-black/55">
        <header className="px-6 py-12 flex justify-between items-center container">
          <img src="/img/logo.svg" alt="logo de GuitarLA"
            className="w-48"
            />
          <img src="/img/carrito.png" alt="carrito de compras" 
            className="w-6"
            />
        </header>
      </div>
    </section>
  )
}