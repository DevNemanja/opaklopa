export default class AddToCart {
    constructor(app, el) {
        this.app = app;
        this.el = el;
        this.id = +this.el.dataset.id;

        this.handleClick = this.handleClick.bind(this);
        
        this.generateHTML();

        el.addEventListener('click', this.handleClick);
    }

    updateCart(action) {
        let cart = this.getCart();
     
        // Ako nema nista u localStorage-u
        if(!cart) {
            // Kreiraj cart sa osnovnim podacima
            this.createCart();
        } else {
            // Ako ima azuriraj Cart
            
            // Proveri da li ovaj proizvod postoji u kartu
            let cartIndex = this.getProductIndex();

            // Ako postoji promeni kolicinu
            if(cartIndex > -1) {
                switch (action) {
                    case 'increase':
                        cart[cartIndex].quantity++
                        break;
                    case 'decrease':
                        if(cart[cartIndex].quantity === 1) {
                            cart = this.removeItemFromCart();
                        } else {
                            cart[cartIndex].quantity--;
                        }
                        break;
                
                    default:
                        break;
                }
            } else {
                // Ako ne postoji dodaj u niz novi objekat
                cart.push({id: this.id, quantity: 1})
            }
        }

        localStorage.setItem('opa-cart', JSON.stringify(cart));
    }

    createCart() {
        localStorage.setItem('opa-cart', JSON.stringify([{id: this.id, quantity: 1}]));
    }

    removeItemFromCart() {
        const cart = this.getCart();

        if(!cart) return false;

        return cart.filter(item => {
            if(item.id !== this.id) {
                return item;
            }
        });
    }

    getProductIndex() {
        const cart = this.getCart();
        let cartIndex = -1;

        cart.forEach((item, i) => {
            if(item.id === this.id) {
                cartIndex = i;
            }
        })

        return cartIndex;
    }

    getCart() {
        return JSON.parse(localStorage.getItem('opa-cart'));
    }

    getProduct() {
        const cart = this.getCart();

        if(!cart) return false;

        return cart.filter(item => {
            if(item.id === this.id) {
                return item;
            }
        })[0];
    }

    generateHTML() {
        let markup;
        const product = this.getProduct();

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
                this.updateCart('increase');
                break;
            case 'add-product':
                this.updateCart('increase');
                break;
            case 'remove-product':
                this.updateCart('decrease');
                break;
            default:
                break;
        }

        console.log(this.el)
       
        this.generateHTML()
    }
}