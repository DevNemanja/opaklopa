export default class Cart {
    constructor() {}

    getCart() {
        return JSON.parse(localStorage.getItem('opa-cart'));
    }

    createCart(id, productName, price) {
        localStorage.setItem('opa-cart', JSON.stringify([{id, quantity: 1, productName, price}]));

        return this.getCart();
    }

    removeItemFromCart(id) {
        const cart = this.getCart();

        if(!cart) return false;

        return cart.filter(item => {
            document.querySelector(`[data-id="${item.id}"] .product__cart-data`).innerHTML = `<button class="add-to-cart">Add to cart</button>`;
            if(item.id !== id) {
                return item;
            }
        });
    }

    getProductIndex(id) {
        const cart = this.getCart();
        let cartIndex = -1;

        cart.forEach((item, i) => {
            if(item.id === id) {
                cartIndex = i;
            }
        })

        return cartIndex;
    }

    getProduct(id) {
        const cart = this.getCart();

        if(!cart) return false;

        return cart.filter(item => {
            if(item.id === id) {
                return item;
            }
        })[0];
    }

    
    updateCart(id, action, productName, price) {
        let cart = this.getCart();

        // Ako nema nista u localStorage-u
        if(!cart) {
            // Kreiraj cart sa osnovnim podacima

            cart = this.createCart(id, productName, price);
        } else {
            // Ako ima azuriraj Cart
            
            // Proveri da li ovaj proizvod postoji u kartu
            let cartIndex = this.getProductIndex(id);

            // Ako postoji promeni kolicinu
            if(cartIndex > -1) {
                switch (action) {
                    case 'increase':
                        cart[cartIndex].quantity++
                        break;
                    case 'decrease':
                        if(cart[cartIndex].quantity === 1) {
                            cart = this.removeItemFromCart(id);
                        } else {
                            cart[cartIndex].quantity--;
                        }
                        break;
                
                    default:
                        break;
                }
            } else {
                // Ako ne postoji dodaj u niz novi objekat
                cart.push({id, quantity: 1, productName, price})
            }
        }

        localStorage.setItem('opa-cart', JSON.stringify(cart));
    }

    updateMarkup() {
        const cart = this.getCart();
        let cartMarkup = '';

        cart.forEach(product => {
            // Sidebar markup
            cartMarkup += `
                <p>Ime: ${product.productName}</p>
                <p>Cena: ${product.price}</p>
                <div class="product__cart">
                    <button class="remove-product">-</button>
                    <span class="product__amount">${product.quantity}</span>
                    <button class="add-product">+</button>
                </div>
            `;

            // All products markup
            document.querySelector(`[data-id="${product.id}"] .product__cart-data`).innerHTML = `
                <div class="product__cart">
                    <button class="remove-product">-</button>
                    <span class="product__amount">${product.quantity}</span>
                    <button class="add-product">+</button>
                </div>
            `
        }) 

        document.querySelector('.cart-sidebar__list').innerHTML = cartMarkup;
    }
}