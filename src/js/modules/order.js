import { CLIENT_KEY, CLIENT_SECRET, LOCATION_URL } from "../utils";

export default class Order {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);
    el.addEventListener("click", this.handleClick);

    this.orderId = this.getOrderId();

    if (this.orderId) {
      this.fetchOrder(this.orderId);
    } else {
      this.el.innerHTML = "No orders yet.";
    }
  }

  renderLastOrder(order) {
    this.el.innerHTML = `
    <div class="last-order">
      <p class="mb-0">${order.billing.first_name}</p>
      <p class="mb-0">${order.billing.email}</p>
      <p class="mb-0">${order.billing.phone}</p>
      <p class="mb-0">${order.billing.address_1}</p>
      <div class="small text-dark">
        ETA: ${
          order.meta_data.length > 0
            ? `<span class="fw-bold">${new Date(
                order.meta_data[0].value
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}</span>`
            : `<span class="fw-bold">N/A</span>`
        }
      </div>
    </div>
  `;
  }

  fetchOrder(orderId) {
    fetch(LOCATION_URL + "/wp-json/wc/v3/orders/" + orderId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_KEY}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Order data:", data);
        this.renderLastOrder(data);
      })
      .catch((err) => {
        console.error(err);
        this.removeLoading();
        this.setErrorMessage();
      });
  }

  getOrderId() {
    const orderId = localStorage.getItem("opa-order");

    if (orderId) {
      return JSON.parse(orderId);
    }

    return null;
  }

  saveOrderId(orderId) {
    localStorage.setItem("opa-order", JSON.stringify(orderId));
  }

  handleClick(e) {
    const target = e.target;

    switch (true) {
      case target.classList.contains("header__cart") ||
        target.classList.contains("header__cart-icon"):
        this.openSidebar();
        break;

      default:
        break;
    }
  }
}
