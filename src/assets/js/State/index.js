class State {
    cart = {}
    KEY = 'carrito'
    static instance
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new State();
        return this.instance
    }
    constructor() {
        if (localStorage.getItem(this.KEY)) {
            this.cart = JSON.parse(localStorage.getItem(this.KEY))
        }
    }
    get cartObject() {
        return Object.values(this.cart)
    }

    add(product) {
        const { id } = product;
        if (this.cart.hasOwnProperty(id)) {
            product.qty = this.cart[id].qty + 1
        }
        this.cart[id] = product
        // console.log(this.cart);
    }
    increment(id) {
        const product = this.cart[id]
        product.qty++
        this.cart[id] = { ...product }
    }
    decrement(id) {
        const product = this.cart[id]
        product.qty--
        if (product.qty !== 0) {
            this.cart[id] = { ...product }
        } else {
            delete this.cart[id]
        }
    }
    clear() {
        this.cart = {}
        localStorage.removeItem(this.KEY)
    }
    setLocalStorage() {
        localStorage.setItem(this.KEY, JSON.stringify(this.cart))
    }
    total() {
        const qtyTotal = this.cartObject.reduce((acc, { qty }) => acc + qty, 0)
        const total = this.cartObject.reduce((acc, { qty, price }) => acc + qty * price, 0)
        return [qtyTotal, total]
    }
}


export default State.getInstance()