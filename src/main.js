import './tailwind.css'

import { Product } from "./assets/js/components"

document.addEventListener('DOMContentLoaded', () => {
    const product = new Product()
    product.render()
})

// import _ from 'lodash'
// console.log(_.shuffle([1, 2, 3, 4]))