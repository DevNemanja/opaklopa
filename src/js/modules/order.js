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
    <button id="show-last-order" class="btn btn-primary mb-3">LAST ORDER</button>
    <div id="last-order-details" class="hidden"></div>
  `;

    const button = this.el.querySelector('#show-last-order');
    const detailsContainer = this.el.querySelector('#last-order-details');

    // Napravi HTML za poručene proizvode
    const itemsHtml =
      order.line_items && order.line_items.length > 0
        ? `<ul class="mb-2">
          ${order.line_items
            .map(
              (item) => `
              <div>
                <li>
                  ${item.image.src ? `<img src="${item.image.src}" alt="${item.name}" />` : ''}
                  <strong>${item.name}</strong> — Qty: ${item.quantity} — Price: ${item.price}
                </li>
              </div>
          `
            )
            .join('')}
        </ul>`
        : '<p>No products found.</p>';

    // Napravi HTML za ostale informacije
    detailsContainer.innerHTML = `
      <div class="last-order">
        <p class="mb-0"><strong>Name:</strong> ${order.billing.first_name}</p>
        <p class="mb-0"><strong>Email:</strong> ${order.billing.email}</p>
        <p class="mb-0"><strong>Phone:</strong> ${order.billing.phone}</p>
        <p class="mb-0"><strong>Address:</strong> ${order.billing.address_1}</p>
        <div class="small text-dark mb-2">
          ETA: ${
            order.meta_data.length > 0
              ? `<span class="fw-bold">${new Date(order.meta_data[0].value).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}</span>`
              : `<span class="fw-bold">N/A</span>`
          }
        </div>
        <h5>Ordered Products:</h5>
        ${itemsHtml}
      </div>
    `;

    button.addEventListener('click', () => {
      detailsContainer.classList.toggle('hidden');
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

    return orderId ? JSON.parse(orderId) : null;
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
