type CartItem = {
  name: string
  price: number
}

type OrderStatus = 'open' | 'closed'

export class ShoppingCart {

  private readonly _items: CartItem[] = []
  private _orderStatus: OrderStatus = 'open'

  addItem (item: CartItem): void {
    this._items.push(item)
  }

  removeItem (index: number): void {
    this._items.splice(index, 1)
  }

  get items (): Readonly<CartItem>[] {
    return this._items
  }

  get orderStatus (): Readonly<OrderStatus> {
    return this._orderStatus
  }

  total (): number {
    return +this._items.reduce((total, next) => {
      return total + next.price
    }, 0).toFixed(2)
  } 

  checkout (): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio');
      return
    }

    this._orderStatus = 'closed'
    this.sendMessage(`Seu pedido com total de ${this.total()} foi recebido`)
    this.saveOrder()
    this.clear()
  }

  sendMessage (msg: string): void {
    console.log('Mensagem Enviada', msg);
  }

  saveOrder (): void {
    console.log('Pedido salvo com sucesso');
  }

  clear (): void {
    this._items.length =0
    console.log('Carrinho de compras foi limpo')
  }

  isEmpty () : boolean {
    return this._items.length === 0
  }
}

const shoppingCart = new ShoppingCart()
shoppingCart.addItem({name: 'Camiseta', price: 49.50})
shoppingCart.addItem({name: 'Blusa', price: 69.50})
shoppingCart.addItem({name: 'Tennis', price: 39.45})
console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(shoppingCart.orderStatus);
shoppingCart.checkout()
console.log(shoppingCart.orderStatus);

