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
const removeButton = document.querySelector('#remove');
const logCart = document.querySelector('#log-cart');
const nonce = document.getElementById('nonce');

const id = addButton.dataset.id;

const url = 'https://opaklopa.local/wp-json/rae/v1/cart/items';
const originalUrl = 'https://opaklopa.local/wp-json/wc/store/cart';

logCart.addEventListener('click', () => {
  console.log('Logging cart');

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Headless-CMS': true,
      Authorization: `Basic ck_ddd6fa7a0529f127ddb19cde94fe15be16c2a31e:cs_f4f28a4196afb82c2a3d4ae63c9ef0c3f1fa9a8b`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

addButton.addEventListener('click', () => {
  console.log('Adding to cart');

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Headless-CMS': true,
      Authorization: `Basic ck_ddd6fa7a0529f127ddb19cde94fe15be16c2a31e:cs_f4f28a4196afb82c2a3d4ae63c9ef0c3f1fa9a8b`,
    },
    body: JSON.stringify({ product_id: id, quantity: 2 }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

removeButton.addEventListener('click', () => {
  console.log('Removing from cart');

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Headless-CMS': true,
      Authorization: `Basic ck_ddd6fa7a0529f127ddb19cde94fe15be16c2a31e:cs_f4f28a4196afb82c2a3d4ae63c9ef0c3f1fa9a8b`,
    },
    body: JSON.stringify({ product_id: id, quantity: 1 }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
