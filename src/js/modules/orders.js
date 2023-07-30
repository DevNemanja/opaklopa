import { CLIENT_KEY, CLIENT_SECRET, LOCATION_URL } from '../utils';

export default class Orders {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.loadingSection = document.getElementById('loading-section');

    this.handleClick = this.handleClick.bind(this);

    this.fetchOrders();

    el.addEventListener('click', this.handleClick);
  }

  fetchOrders() {
    const fetchData = () => {
      console.log('fetching data');
      this.loadingSection.classList.remove('d-none');

      fetch(LOCATION_URL + '/wp-json/wc/v3/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_KEY}:${CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.updateMarkup(data);
          this.loadingSection.classList.add('d-none');
          console.log(data);
        });

      // Schedule subsequent runs every 10 seconds
      this.fetchInterval = setInterval(fetchData, 10000);
    };

    // Clear previous interval before starting a new one
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }

    // Run immediately
    fetchData();
  }

  updateMarkup(orders) {
    let newOrders = '';
    let acceptedOrders = '';
    let completedOrders = '';
    let rejectedOrders = '';

    orders.forEach((order) => {
      switch (order.status) {
        case 'pending':
          newOrders += `
            <div class="col-12 col-md-4 col-lg-3 g-2">
              <div class="card d-flex flex-column">
                <div class="p-3 fs-6 alert alert-primary mb-0">
                  <p class="mb-0">${order.billing.first_name}</p>
                  <p class="mb-0">${order.billing.email}</p>
                  <p class="mb-0">${order.billing.phone}</p>
                  <p class="mb-0">${order.billing.address_1}</p>
                </div>
                <div class="p-3 card-body flex-grow-1" >
                    <p>${order.customer_note}</p>
                    <ol class="list-group">${order.line_items
                      .map(
                        (item) =>
                          `
                          <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                              <div class="fw-bold">${item.name}</div>
                              ${item.total}rsd
                            </div>
                            <span class="badge bg-primary rounded-pill">${item.quantity}</span>
                          </li>
                      
                        `
                      )
                      .join('')}
                    </ol>
                    <p class="m-0 mt-2 text-end">Ukupno: <strong>${
                      order.total
                    }</strong>rsd</p>
                  </div>
                  <button class="btn btn-primary mb-2" data-order-number=${
                    order.number
                  } data-status="processing">Potvrdi</button>

                  <button class="btn btn-outline-danger" type="button" data-bs-toggle="collapse" data-bs-target="#${
                    order.order_key
                  }" aria-expanded="false" aria-controls="${order.order_key}">
                    Odbij
                  </button>
                  <div class="collapse" id="${order.order_key}">
                    <button class="mt-2 btn btn-danger btn-sm" data-order-number=${
                      order.number
                    } data-status="cancelled">Potvrdi odbijanje porudžbine</button>
                  </div>
              </div>
            </div>
          `;
          break;
        case 'processing':
          acceptedOrders += `
                <div class="col-12 col-md-4 col-lg-3 g-2">
                  <div class="card d-flex flex-column">
                    <div class="p-3 fs-6 alert alert-info mb-0">
                      <p class="mb-0">${order.billing.first_name}</p>
                      <p class="mb-0">${order.billing.email}</p>
                      <p class="mb-0">${order.billing.phone}</p>
                      <p class="mb-0">${order.billing.address_1}</p>
                    </div>
                    <div class="p-3 card-body flex-grow-1" >
                        <ol class="list-group">${order.line_items
                          .map(
                            (item) =>
                              `
                              <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">${item.name}</div>
                                  ${item.total}rsd
                                </div>
                                <span class="badge bg-info rounded-pill">${item.quantity}</span>
                              </li>
                          
                            `
                          )
                          .join('')}
                        </ol>
                      </div>
                      <button class="btn btn-info" data-order-number=${
                        order.number
                      } data-status="completed">Završi</button>
                  </div>
                </div>
              `;
          break;
        case 'completed':
          completedOrders += `
          <div class="col-12 col-md-4 col-lg-3 g-2">
            <div class="card d-flex flex-column">
              <div class="p-3 fs-6 alert alert-success mb-0">
                <p class="mb-0">${order.billing.first_name}</p>
                <p class="mb-0">${order.billing.email}</p>
                <p class="mb-0">${order.billing.phone}</p>
                <p class="mb-0">${order.billing.address_1}</p>
              </div>
              <div class="p-3 card-body flex-grow-1" >
                  <ol class="list-group">${order.line_items
                    .map(
                      (item) =>
                        `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">${item.name}</div>
                            ${item.total}rsd
                          </div>
                          <span class="badge bg-success rounded-pill">${item.quantity}</span>
                        </li>
                      `
                    )
                    .join('')}
                  </ol>
                </div>
            </div>
          </div>
        `;
          break;
        case 'cancelled':
          rejectedOrders += `
          <div class="col-12 col-md-4 col-lg-3 g-2">
            <div class="card d-flex flex-column">
              <div class="p-3 fs-6 alert alert-danger mb-0">
                <p class="mb-0">${order.billing.first_name}</p>
                <p class="mb-0">${order.billing.email}</p>
                <p class="mb-0">${order.billing.phone}</p>
                <p class="mb-0">${order.billing.address_1}</p>
              </div>
              <div class="p-3 card-body flex-grow-1" >
                  <ol class="list-group">${order.line_items
                    .map(
                      (item) =>
                        `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">${item.name}</div>
                            ${item.total}rsd
                          </div>
                          <span class="badge bg-danger rounded-pill">${item.quantity}</span>
                        </li>
                    
                      `
                    )
                    .join('')}
                  </ol>
                </div>
            </div>
          </div>
        `;
          break;

        default:
          break;
      }
    });

    document.getElementById('new-orders').innerHTML =
      newOrders === ''
        ? '<div class="ml-5"><p class="alert alert-primary">Nema novih porudžbina</p></div>'
        : newOrders;
    document.getElementById('accepted-orders').innerHTML = acceptedOrders;
    document.getElementById('completed-orders').innerHTML = completedOrders;
    document.getElementById('rejected-orders').innerHTML = rejectedOrders;
  }

  updateOrder(orderId, status) {
    this.loadingSection.classList.remove('d-none');

    fetch(`${LOCATION_URL}/wp-json/wc/v3/orders/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_KEY}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.fetchOrders();
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleClick(e) {
    console.log('ORDERS');
    const { orderNumber, status } = e.target.dataset;

    if (e.target.dataset.status) this.updateOrder(orderNumber, status);
  }
}
