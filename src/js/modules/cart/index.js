export default class Cart {
    constructor() {
        console.log('Greetings from Cart')
    }

    getCart() {
        return JSON.parse(localStorage.getItem('opa-cart'));
    }

    createCart(id) {
        localStorage.setItem('opa-cart', JSON.stringify([{id, quantity: 1}]));

        return this.getCart();
    }

    removeItemFromCart(id) {
        const cart = this.getCart();

        if(!cart) return false;

        return cart.filter(item => {
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

    
    updateCart(id, action) {
        let cart = this.getCart();

        // Ako nema nista u localStorage-u
        if(!cart) {
            // Kreiraj cart sa osnovnim podacima

            cart = this.createCart(id);
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
                cart.push({id, quantity: 1})
            }
        }

        localStorage.setItem('opa-cart', JSON.stringify(cart));
    }
}