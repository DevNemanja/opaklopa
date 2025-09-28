import { CLIENT_KEY, CLIENT_SECRET, LOCATION_URL } from '../utils';

export default class Order {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);
    el.addEventListener('click', this.handleClick);

    this.orderId = this.getOrderId();

    if (this.orderId) {
      this.fetchOrder(this.orderId);
    }
  }

  renderLastOrder(order) {
    // Napravi dugme
    this.el.innerHTML = `
    <button id="show-last-order">LAST ORDER</button>
    <div id="last-order-details" class="hidden last-order"></div>
  `;

    const button = this.el.querySelector('#show-last-order');
    const detailsContainer = this.el.querySelector('#last-order-details');

    // HTML za poručene proizvode sa BEM klasama
    const itemsHtml =
      order.line_items && order.line_items.length > 0
        ? `
        <ul class="last-order__products-list">
          ${order.line_items
            .map((item) => {
              const imageSrc = item.image && item.image.src ? item.image.src : '';
              return `
                <li class="last-order__product">
                  ${
                    imageSrc
                      ? `<img class="last-order__product-image" src="${imageSrc}" alt="${item.name}">`
                      : ''
                  }
                  <div class="last-order__product-details">
                    <strong class="last-order__product-name">${item.name}</strong> <span> x${
                item.quantity
              } </span>
                  </div>
                </li>
              `;
            })
            .join('')}
        </ul>`
        : '<p class="last-order__no-products">No products found.</p>';

    // HTML za ostale informacije sa BEM klasama
    detailsContainer.innerHTML = `
    <div class="last-order__modal">
      <div class="last-order__info">
        <div class="last-order__customer-info">
          <p class="last-order__field">Ime: <strong>${order.billing.first_name}</strong></p>
          <p class="last-order__field">Email: <strong>${order.billing.email}</strong></p>
          <p class="last-order__field">Telefon: <strong>${order.billing.phone}</strong></p>
          <p class="last-order__field">Adresa: <strong>${order.billing.address_1}</strong></p>
        </div>
        <div class="last-order__eta">
          Očekivano vreme dostave: ${
            order.meta_data.length > 0
              ? `<span class="last-order__eta-value">${new Date(
                  order.meta_data[0].value
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}</span>`
              : `<span class="last-order__eta-value">N/A</span>`
          }
        </div>
      </div>

      <div class="last-order__products">
        <h5 class="last-order__products-title">Vaša porużbina:</h5>
        ${itemsHtml}
      </div>
    </div>
  `;

    button.addEventListener('click', () => {
      detailsContainer.classList.toggle('hidden');
      document.body.classList.toggle('noscroll');
    });
  }

  fetchOrder(orderId) {
    fetch(LOCATION_URL + '/wp-json/wc/v3/orders/' + orderId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${CLIENT_KEY}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Order data:', data);
        this.renderLastOrder(data);
      })
      .catch((err) => {
        console.error(err);
        this.removeLoading();
        this.setErrorMessage();
      });
  }

  getOrderId() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('opa-order');

    return orderId && orderId !== 'undefined' ? JSON.parse(orderId) : null;
  }

  saveOrderId(orderId) {
    const params = new URLSearchParams(window.location.search);
    params.set('opa-order', orderId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  handleClick(e) {
    const target = e.target;

    switch (true) {
      case target.classList.contains('header__cart') ||
        target.classList.contains('header__cart-icon'):
        this.openSidebar();
        break;

      default:
        break;
    }
  }
}
