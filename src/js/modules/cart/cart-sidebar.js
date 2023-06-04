import Cart from ".";

export default class CartSidebar extends Cart {
    constructor(app, el) {
        super()
        this.app = app;
        this.el = el;
        this.id = +this.el.dataset.id;

        this.handleClick = this.handleClick.bind(this);
        
        this.updateMarkup();

        el.addEventListener('click', this.handleClick);
    }

    handleClick(e) {
        e.target.className === 'submit-cart' ? this.submitOrder() : null
    }
}