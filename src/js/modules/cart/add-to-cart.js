import Cart from ".";

export default class AddToCart extends Cart {
    constructor(app, el) {
        super()
        this.app = app;
        this.el = el;
        this.id = +this.el.dataset.id;

        this.handleClick = this.handleClick.bind(this);
        
        this.generateHTML();

        el.addEventListener('click', this.handleClick);
    }

    generateHTML() {
        let markup;
        const product = this.getProduct(this.id);

        if(product && product.quantity > 0) {
            markup = `
            <div class="product__cart">
                <button class="remove-product">-</button>
                <span class="product__amount">${product.quantity}</span>
                <button class="add-product">+</button>
            </div>
        `
        } else {
            markup = `<button class="add-to-cart">Add to cart</button>`
        }

        this.el.querySelector('.product__cart-data').innerHTML = markup;
    }

    handleClick(e) {
        switch (e.target.className) {
            case 'add-to-cart':
                this.updateCart(this.id, 'increase');
                break;
            case 'add-product':
                this.updateCart(this.id, 'increase');
                break;
            case 'remove-product':
                this.updateCart(this.id, 'decrease');
                break;
            default:
                break;
        }
       
        this.generateHTML()
    }
}