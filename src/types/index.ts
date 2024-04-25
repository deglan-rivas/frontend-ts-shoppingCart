export type Guitar = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export type CartItem = Omit<Guitar, 'description'> & {
  quantity: number
}

// export type cartId = CartItem['id']
// export type CartItemId = Pick<CartItem, 'id'>
export type CartItemId = CartItem['id']