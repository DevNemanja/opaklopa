import Cart from ".";

export default class AddToCart extends Cart {
    constructor(app, el) {
        super()
        this.app = app;
        this.el = el;
        this.id = +this.el.dataset.id;
        this.name = this.el.dataset.name;
        this.price = +this.el.dataset.price;

        this.handleClick = this.handleClick.bind(this);
        
        el.addEventListener('click', this.handleClick);
    }

    handleClick(e) {
        this.updateCart(
            this.id, 
            e.target.className === 'remove-product' ? 'decrease' : 'increase',
            this.name,
            this.price    
        )

        this.updateMarkup();
    }
}