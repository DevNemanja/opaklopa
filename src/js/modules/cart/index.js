import { CLIENT_KEY, CLIENT_SECRET, LOCATION_URL } from '../../utils';

export default class Cart {
  constructor() {
    this.cartButton = document.querySelector('.header__cart');
    this.orderForm = document.querySelector('.order-form');
    this.emptyCartSuggestions = document.querySelector('.cart-sidebar__empty-cart-suggestion');
    this.fullCartSuggestions = document.querySelector('.cart-sidebar__full-cart-suggestion');
    this.loading = document.querySelector('.cart-sidebar__loading');
    this.cartTotalAmountPlaceholder = document.querySelector('.cart-sidebar__total-amount');
    this.cartTotalAmountDigit = document.getElementById('cart-total');
    this.errorOverlay = document.querySelector('.cart-sidebar__error');
    this.orderConfirmationModal = document.querySelector('.order-confirmation__modal');
    this.orderConfirmationModalPending = document.querySelector(
      '.order-confirmation__message--pending'
    );
    this.orderConfirmationModalSuccess = document.querySelector(
      '.order-confirmation__message--success'
    );
    this.orderConfirmationModalReject = document.querySelector(
      '.order-confirmation__message--reject'
    );

    this.coupon = document.querySelector('#coupon');

    this.sidebarOpenedFirstTime = false;
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
      JSON.stringify([{ id, quantity: 1, productName, price, imgUrl, hasVariations }])
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

  updateTotalAmount() {
    const cart = this.getCart();

    const totalPrice = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );

    this.cartTotalAmountDigit.innerHTML = totalPrice;
  }

  openSidebar() {
    document.querySelector('.cart-sidebar').classList.add('cart-sidebar--open');
    document.body.classList.add('noscroll');
  }

  closeSidebar() {
    document.querySelector('.cart-sidebar').classList.remove('cart-sidebar--open');
    document.body.classList.remove('noscroll');
  }

  removeItemFromCartUsingIndex(index) {
    let cart = this.getCart(); // Učitaj cart iz localStorage-a

    if (!cart || cart.length === 0) return; // Ako nema ništa, ništa ne radimo

    // Proveri da li je index validan
    if (index < 0 || index >= cart.length) return;

    // Ukloni stavku sa datog indeksa
    cart.splice(index, 1);

    // Sačuvaj izmenjeni cart u localStorage
    localStorage.setItem('opa-cart', JSON.stringify(cart));

    // Ažuriraj markup da se reflektuje promena
    this.updateMarkup();
  }

  updateCart(id, action, productName, price, imgUrl, hasVariations, sides) {
    if (!action) return;

    let cart = this.getCart();

    // Ako nema nista u localStorage-u
    if (!cart) {
      // Kreiraj cart sa osnovnim podacima

      cart = this.createCart(id, productName, price, hasVariations);
    } else {
      // Ako ima azuriraj Cart
      if (cart.length === 0) {
        if (!this.sidebarOpenedFirstTime) {
          this.openSidebar();
        }

        this.sidebarOpenedFirstTime = true;
      }

      // Proveri da li ovaj proizvod postoji u kartu
      let cartIndex = this.getProductIndex(id);

      console.log('cartIndex', cartIndex, id);

      // Ako postoji i ako nema priloge promeni kolicinu
      if (cartIndex > -1 && !sides) {
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
          sides,
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
      cartMarkup = '<p class="cart-sidebar__empty-message">Vaša korpa je prazna</p>';
      this.emptyCartSuggestions.classList.remove('cart-sidebar__empty-cart-suggestion--hidden');
      this.fullCartSuggestions.classList.add('cart-sidebar__full-cart-suggestion--hidden');
      this.cartTotalAmountPlaceholder.classList.add('cart-sidebar__total-amount--hidden');
    } else {
      this.emptyCartSuggestions.classList.add('cart-sidebar__empty-cart-suggestion--hidden');
      this.fullCartSuggestions.classList.remove('cart-sidebar__full-cart-suggestion--hidden');
      this.cartTotalAmountPlaceholder.classList.remove('cart-sidebar__total-amount--hidden');

      cart.forEach((product, i) => {
        // Sidebar markup
        cartMarkup += `
        <div class="product product--sidebar" data-product-id="${product.id}" data-product-name="${
          product.productName
        }" data-price="${product.price}" data-img-url="${product.imgUrl ? product.imgUrl : ''}">
            <div class="product__info product__info--sidebar">
              <div class="product__name-wrapper product__name-wrapper--sidebar">
                <div class="product__name">${product.productName}</div>
                <div class="product__price">${product.price}rsd</div>
              </div>
              ${
                product.sides
                  ? `
                <div class="product__sides">${product.sides.map(
                  (side) => side.name + (side.price ? `(${side.price}rsd)` : '')
                )}</div>
                  `
                  : ''
              }
              <div class="product__cart">
              ${
                product.sides
                  ? `<button class="remove-product-with-sides button button--qty" data-i=${i}>Izbaci iz korpe</button>`
                  : `
                  <button class="remove-product button button--qty">-</button>
                  <span class="product__amount">${product.quantity}</span>
                  <button class="add-product button button--qty">+</button>
              `
              }
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
        } else if (!product.sides) {
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

    this.updateTotalAmount();
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

  setErrorMessage() {
    this.errorOverlay.classList.remove('cart-sidebar__error--hidden');
  }

  removeErrorMessage() {
    this.errorOverlay.classList.add('cart-sidebar__error--hidden');
  }

  openConfirmationModal(orderId) {
    this.orderConfirmationModal.classList.add('order-confirmation__modal--show');
    this.orderConfirmationModalPending.classList.add('order-confirmation__message--show');

    const interval = setInterval(() => {
      fetch(`${LOCATION_URL}/wp-json/wc/v3/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${CLIENT_KEY}:${CLIENT_SECRET}`).toString(
            'base64'
          )}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.orderConfirmationModal.classList.add('order-confirmation__modal--show');

          if (data.status === 'processing') {
            this.orderConfirmationModalPending.classList.remove(
              'order-confirmation__message--show'
            );
            this.orderConfirmationModalSuccess.classList.add('order-confirmation__message--show');

            document.getElementById('eta').innerText = new Date(
              data.meta_data[0].value
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });

            document.querySelector('.cart-sidebar').classList.remove('cart-sidebar--open');
            document.body.classList.remove('noscroll');

            clearInterval(interval);
          }
          if (data.status === 'cancelled') {
            this.orderConfirmationModalPending.classList.remove(
              'order-confirmation__message--show'
            );
            this.orderConfirmationModalReject.classList.add('order-confirmation__message--show');

            document.querySelector('.cart-sidebar').classList.remove('cart-sidebar--open');
            document.body.classList.remove('noscroll');

            clearInterval(interval);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, 10000);
  }

  submitOrder() {
    const ime = document.getElementById('name');
    const adresa = document.getElementById('address');
    const mail = document.getElementById('mail');
    const phone = document.getElementById('telefon');
    const poruka = document.getElementById('poruka');
    const kupon = document.getElementById('coupon').value.trim() || '';

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

    if (kupon) {
      orderData.coupon_lines = [
        {
          code: kupon,
        },
      ];
    }

    this.setLoading();

    fetch(LOCATION_URL + '/wp-json/wc/v3/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${CLIENT_KEY}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.removeLoading();
        this.clearCart();
        this.closeSidebar();

        this.openConfirmationModal(data.number);

        const params = new URLSearchParams(window.location.search);
        params.set('opa-order', data.id);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
      })
      .catch((err) => {
        console.error(err);
        this.removeLoading();
        this.setErrorMessage();
      });
  }
}
