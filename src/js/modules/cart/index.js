import { CLIENT_KEY, CLIENT_SECRET } from '../../app';

export default class Cart {
  constructor() {
    this.cartButton = document.querySelector('.header__cart');
  }

  getCart() {
    const cart = JSON.parse(localStorage.getItem('opa-cart')) || [];

    if (cart.length > 0) {
      this.cartButton.classList.add('header__cart--has-items');
    } else {
      this.cartButton.classList.remove('header__cart--has-items');
    }

    return cart;
  }

  createCart(id, productName, price, imgUrl) {
    localStorage.setItem(
      'opa-cart',
      JSON.stringify([{ id, quantity: 1, productName, price, imgUrl }])
    );

    return this.getCart();
  }

  removeItemFromCart(id) {
    const cart = this.getCart();

    if (!cart) return false;

    return cart.filter((item) => {
      document.querySelector(
        `[data-id="${item.id}"] .product__cart-data`
      ).innerHTML = `<button class="add-to-cart button">Dodaj u korpu</button>`;
      if (item.id !== id) {
        return item;
      }
    });
  }

  getProductIndex(id) {
    const cart = this.getCart();
    let cartIndex = -1;

    cart.forEach((item, i) => {
      if (item.id === id) {
        cartIndex = i;
      }
    });

    return cartIndex;
  }

  getProduct(id) {
    const cart = this.getCart();

    if (!cart) return false;

    return cart.filter((item) => {
      if (item.id === id) {
        return item;
      }
    })[0];
  }

  updateCart(id, action, productName, price, imgUrl) {
    let cart = this.getCart();

    if (!action) return;

    // Ako nema nista u localStorage-u
    if (!cart) {
      // Kreiraj cart sa osnovnim podacima

      cart = this.createCart(id, productName, price);
    } else {
      // Ako ima azuriraj Cart

      // Proveri da li ovaj proizvod postoji u kartu
      let cartIndex = this.getProductIndex(id);

      // Ako postoji promeni kolicinu
      if (cartIndex > -1) {
        switch (action) {
          case 'increase':
            cart[cartIndex].quantity++;
            break;
          case 'decrease':
            if (cart[cartIndex].quantity === 1) {
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
        cart.push({ id, quantity: 1, productName, price, imgUrl });
      }
    }

    localStorage.setItem('opa-cart', JSON.stringify(cart));
    this.updateMarkup();
  }

  updateMarkup() {
    const cart = this.getCart();
    let cartMarkup = '';

    if (!cart) return;

    if (cart.length === 0) {
      cartMarkup = 'Vasa korpa je prazna';
    } else {
      cart.forEach((product) => {
        // Sidebar markup
        cartMarkup += `
        <div class="product" data-product-id="${
          product.id
        }" data-product-name="${product.productName}" data-price="${
          product.price
        }" data-img-url="${product.imgUrl ? product.imgUrl : ''}">
            <div class="product__info product__info--sidebar">
              <div class="product__name-wrapper product__name-wrapper--sidebar">
                <div class="product__name">${product.productName}</div>
                <div class="product__price">${product.price}rsd</div>
              </div>
              <div class="product__cart">
                  <button class="remove-product button button--qty">-</button>
                  <span class="product__amount">${product.quantity}</span>
                  <button class="add-product button button--qty">+</button>
              </div>
            </div>
            ${
              product.imgUrl &&
              `<div class="product__image-wrapper">
            <img src="${product.imgUrl}" alt="${product.productName}"  title="${product.productName}" class="product__image">     
        </div>`
            }
            
        </div>
      `;

        // All products markup
        document.querySelector(
          `[data-id="${product.id}"] .product__cart-data`
        ).innerHTML = `
                <div class="product__cart">
                    <button class="remove-product button button--qty">-</button>
                    <span class="product__amount">${product.quantity}</span>
                    <button class="add-product button button--qty">+</button>
                </div>
            `;
      });
    }

    document.querySelector('.cart-sidebar__list').innerHTML = cartMarkup;
  }

  prepareCartForOrder() {
    const cart = this.getCart();

    return cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
  }

  clearCart() {
    const cart = this.getCart();

    cart.map((item) => this.removeItemFromCart(item.id));

    localStorage.setItem('opa-cart', JSON.stringify([]));
    this.updateMarkup();
  }

  submitOrder() {
    const ime = document.querySelector('#name');
    const adresa = document.querySelector('#address');
    const mail = document.querySelector('#mail');
    const phone = document.querySelector('#telefon');
    const poruka = document.querySelector('#poruka');

    function clearForm() {
      ime.value = '';
      adresa.value = '';
      mail.value = '';
      phone.value = '';
      poruka.value = '';
    }

    const orderData = {
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      billing: {
        first_name: ime.value,
        last_name: '',
        address_1: adresa.value,
        email: mail.value,
        phone: phone.value,
      },
      line_items: this.prepareCartForOrder(),
      customer_note: poruka.value,
    };

    fetch('https://opaklopa.local/wp-json/wc/v3/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_KEY}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        clearForm();
        this.clearCart();
        console.log(data);
      });
  }
}
