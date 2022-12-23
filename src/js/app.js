import { generateGuid } from './utils';
import { modules } from './modules';

class App {
  constructor(modules) {
    this.module = {};

    this.initModules(modules);
  }

  initModules(modules) {
    let moduleElements = document.querySelectorAll('[data-module]') || [];

    if (!moduleElements.length) {
      console.warn(
        'MISSING MODULES: No modules were defined on the page, please check your HTML'
      );
      return this;
    }

    moduleElements.forEach((element) => {
      const elementModule = element.getAttribute('data-module');

      modules.forEach((module) => {
        if (module.name === elementModule) {
          this.module[`${module.name}-${generateGuid()}`] =
            new module.constructor(this, element);
        }
      });
    });
  }

  emitEvent({ name, payload }) {
    const event = new CustomEvent(name, {
      detail: payload,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  }
}

const app = new App(modules);
export default app;

// for debugging
window.APP = app || {};

const addButton = document.querySelector('#add');

addButton.addEventListener('click', () => {
  console.log('Adding to cart');

  const data = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    billing: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
      email: "john.doe@example.com",
      phone: "(555) 555-5555"
    },
    shipping: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US"
    },
    line_items: [
      {
        product_id: 93,
        quantity: 2
      },
      {
        product_id: 22,
        variation_id: 23,
        quantity: 1
      }
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00"
      }
    ]
  };


  fetch('https://opaklopa.local/wp-json/wc/v3/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa('ck_47fc00cf4013b0019059255c037ec51d6f916797:cs_95133a72259ada71c449a10bb254eab7bb30ce38')}`,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});


