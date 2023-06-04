import Cart from ".";

export default class CartSidebar extends Cart {
    constructor(app, el) {
        super()
        this.app = app;
        this.el = el;
        this.id = +this.el.dataset.id;

        this.handleClick = this.handleClick.bind(this);
        
        this.updateMarkup();

        window.addEventListener('cart-updated', () => console.log('Got inside sidebar'));
        el.addEventListener('click', this.handleClick);
    }

    handleClick() {
        this.updateMarkup()
    }
}