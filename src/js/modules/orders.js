import { CLIENT_KEY, CLIENT_SECRET } from '../app';

export default class Orders {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);

    this.fetchOrders();

    el.addEventListener('click', this.handleClick);
  }

  fetchOrders() {
    const fetchData = () => {
      console.log('fetching data');
      fetch('https://opaklopa.local/wp-json/wc/v3/orders', {
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
          console.log(data);
        });
    };

    // Run immediately
    fetchData();

    // Schedule subsequent runs every 10 seconds
    setInterval(fetchData, 10000);
  }

  updateMarkup(orders) {
    let markup = '';

    orders.forEach((order) => {
      markup += `
            <h2>${order.billing.first_name} ${order.billing.last_name}</h2>
        `;
    });

    document.getElementById('orders').innerHTML = markup;
  }

  handleClick() {
    console.log('ORDERS');
  }
}
