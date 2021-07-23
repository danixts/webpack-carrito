import Component from './Component';
import Data from "./Data"
import cart from "./State"

export class Product extends Component {
    constructor() {
        super('template-product', 'app-product');
        this.Cart = new Cart();
        this.event()
    }
    render() {
        Data.forEach(product => {
            const { id, url, name, price } = product
            this.template.querySelector('img').src = url
            this.template.querySelector('span').textContent = name
            this.template.querySelector("strong").textContent = `${price}`
            this.template.querySelector("button").dataset.id = id
            const clone = this.template.cloneNode(true)
            this.fragment.appendChild(clone)
        })
        this.root.appendChild(this.fragment)
    }

    event() {
        this.root.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-buy')) {
                this.createElementCart(e.target.parentNode)
                this.Cart.render()
            }
        })
    }

    createElementCart(node) {
        const id = node.querySelector('button').dataset.id
        const price = node.querySelector('strong').textContent
        const name = node.querySelector("span").textContent
        const product = { id, price: +price, name, qty: 1 }
        cart.add(product)
    }
}

class Cart extends Component {
    constructor() {
        super('template-cart-list', 'app-cart-list')
        this.clear = document.getElementById('btn-clear')
        this.Total = new Total()
        this.event()
        this.render()
    }
    render() {
        this.root.innerHTML = ""
        console.log(cart.cartObject);
        cart.cartObject.forEach(product => {
            const { id, price, name, qty } = product
            this.template.querySelector('.text-id').textContent = id
            this.template.querySelector('.text-name').textContent = name
            this.template.querySelector('.btn-minus').dataset.id = id
            this.template.querySelector('.text-qty').textContent = qty
            this.template.querySelector('.btn-plus').dataset.id = id
            this.template.querySelector('.text-total').textContent = qty * price
            const clone = this.template.cloneNode(true);
            this.fragment.appendChild(clone)
        })
        this.root.appendChild(this.fragment)
        this.Total.render()
        cart.setLocalStorage()
    }

    event() {
        this.clear.addEventListener('click', () => {
            cart.clear()
            this.render()
        })
        this.root.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-minus')) {
                const id = e.target.dataset.id
                cart.decrement(id)
                this.render()
            }
            if (e.target.classList.contains('btn-plus')) {
                const id = e.target.dataset.id
                cart.increment(id)
                this.render()
            }
        })
    }
}

class Total extends Component {
    constructor() {
        super('template-cart-total', 'app-cart-total')
        this.render()
    }
    render() {
        this.root.innerHTML = ""
        const [qtyTotal, total] = cart.total()
        this.template.querySelector('.text-qty').textContent = qtyTotal
        this.template.querySelector('.text-total').textContent = total
        const clone = this.template.cloneNode(true);
        this.fragment.appendChild(clone)
        this.root.appendChild(this.fragment)
    }
}