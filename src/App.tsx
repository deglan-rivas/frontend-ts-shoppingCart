import { useCart } from "./hooks/useCart";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Main from "./sections/Main";

import { db } from "@/data/db";

function App() {

  const { cart, totalPrice, isEmpty, increaseQuantity, decreaseQuantity, deleteCartItem, clearCart, addToCart } = useCart()

  return (
    <>
      <Header
        cart={cart}
        totalPrice={totalPrice}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteCartItem={deleteCartItem}
        cleanCart={clearCart}
        isEmpty={isEmpty}
      />
      <Main
        db={db}
        addToCart={addToCart}
      />
      <Footer />
    </>
  )
}

export default App
