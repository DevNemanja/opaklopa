import { CLIENT_KEY, CLIENT_SECRET, LOCATION_URL } from '../../utils';

export default class Cart {
  constructor() {
    this.cartButton = document.querySelector('.header__cart');
    this.orderForm = document.querySelector('.order-form');
    this.emptyCartSuggestions = document.querySelector(
      '.cart-sidebar__empty-cart-suggestion'
    );
    this.fullCartSuggestions = document.querySelector(
      '.cart-sidebar__full-cart-suggestion'
    );
    this.loading = document.querySelector('.cart-sidebar__loading');
    this.cartTotalAmountPlaceholder = document.querySelector(
      '.cart-sidebar__total-amount'
    );
  }

  setLoading() {
    this.loading.classList.add('cart-sidebar__loading--show');
  }

  removeLoading() {
    this.loading.classList.remove('cart-sidebar__loading--show');
  }

  getCart() {
    const cart = JSON.parse(localStorage.getItem('opa-cart')) || [];

    if (cart.length > 0) {
      this.cartButton.classList.add('header__cart--has-items');
      this.orderForm.classList.remove('order-form--hidden');
    } else {
      this.cartButton.classList.remove('header__cart--has-items');
      this.orderForm.classList.add('order-form--hidden');
    }

    return cart;
  }

  createCart(id, productName, price, imgUrl, hasVariations) {
    localStorage.setItem(
      'opa-cart',
      JSON.stringify([
        { id, quantity: 1, productName, price, imgUrl, hasVariations },
      ])
    );

    return this.getCart();
  }

  removeItemFromCart(id) {
    const cart = this.getCart();

    if (!cart) return false;

    return cart.filter((item) => {
      if (item.hasVariations) {
        if (document.querySelector(`[data-id="${item.id}"]`).checked) {
          const products = document.querySelectorAll(
            `[data-name="${item.productName}"] .product__cart-data`
          );

          products.forEach(
            (product) =>
              (product.innerHTML = `<button class="add-to-cart button">Dodaj u korpu</button>`)
          );
        }
      } else {
        document.querySelector(
          `[data-name="${item.productName}"] .product__cart-data`
        ).innerHTML = `<button class="add-to-cart button">Dodaj u korpu</button>`;
      }

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

  updateCart(id, action, productName, price, imgUrl, hasVariations) {
    if (!action) return;

    let cart = this.getCart();

    // Ako nema nista u localStorage-u
    if (!cart) {
      // Kreiraj cart sa osnovnim podacima

      cart = this.createCart(id, productName, price, hasVariations);
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
        cart.push({
          id,
          quantity: 1,
          productName,
          price,
          imgUrl,
          hasVariations,
        });
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
      cartMarkup =
        '<p class="cart-sidebar__empty-message">Vaša korpa je prazna</p>';
      this.emptyCartSuggestions.classList.remove(
        'cart-sidebar__empty-cart-suggestion--hidden'
      );
      this.fullCartSuggestions.classList.add(
        'cart-sidebar__full-cart-suggestion--hidden'
      );
      this.cartTotalAmountPlaceholder.classList.add(
        'cart-sidebar__total-amount--hidden'
      );
    } else {
      this.emptyCartSuggestions.classList.add(
        'cart-sidebar__empty-cart-suggestion--hidden'
      );
      this.fullCartSuggestions.classList.remove(
        'cart-sidebar__full-cart-suggestion--hidden'
      );
      this.cartTotalAmountPlaceholder.classList.remove(
        'cart-sidebar__total-amount--hidden'
      );

      cart.forEach((product) => {
        // Sidebar markup
        cartMarkup += `
        <div class="product product--sidebar" data-product-id="${
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

        // Ako ima varijacije
        if (product.hasVariations) {
          // Proveri da li je ta varijacija cekirana
          if (document.querySelector(`[data-id="${product.id}"]`).checked) {
            // Ako jeste odradi update markupa, ako nije iskuliraj
            let markup = '';
            if (product.quantity > 0) {
              markup = `
              <div class="product__cart">
                  <button class="remove-product button button--qty">-</button>
                  <span class="product__amount">${product.quantity}</span>
                  <button class="add-product button button--qty">+</button>
              </div>
          `;
            } else {
              markup = `<button class="add-to-cart button">Dodaj u korpu</button>`;
            }
            document.querySelector(
              `[data-name="${product.productName}"] .product__cart-data`
            ).innerHTML = markup;
          }
        } else {
          // Svakako uradi proveru markapa ako nije varijacija u pitanju
          document.querySelector(
            `[data-name="${product.productName}"] .product__cart-data`
          ).innerHTML = `
                <div class="product__cart">
                    <button class="remove-product button button--qty">-</button>
                    <span class="product__amount">${product.quantity}</span>
                    <button class="add-product button button--qty">+</button>
                </div>
            `;
        }
      });
    }

    document.querySelector('.cart-sidebar__list').innerHTML = cartMarkup;
  }

  checkIfIdExistsInCart(id) {
    const cart = this.getCart();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        return true; // ID exists in the array
      }
    }
    return false; // ID does not exist in the array
  }

  resetVariationMarkup(variationId, productName) {
    // Ako ovog proizvoda nema u cartu
    if (!this.checkIfIdExistsInCart(variationId)) {
      const selectedProduct = document.querySelector(
        `.products [data-name="${productName}"] .product__cart-data`
      );

      selectedProduct.innerHTML = `<button class="add-to-cart button">Dodaj u korpu</button>`;
    }
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
    const ime = document.getElementById('name');
    const adresa = document.getElementById('address');
    const mail = document.getElementById('mail');
    const phone = document.getElementById('telefon');
    const poruka = document.getElementById('poruka');

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

    this.setLoading();

    fetch(LOCATION_URL + '/wp-json/wc/v3/orders', {
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
        this.removeLoading();
        this.clearCart();
        console.log(data);
      });
  }
}
