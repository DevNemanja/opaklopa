import Cart from '.';

export default class CartSidebar extends Cart {
  constructor(app, el) {
    super();
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);

    this.updateMarkup();

    el.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    const target = e.target;
    const product = e.target.closest('[data-product-id]');

    switch (target.className) {
      case 'cart-sidebar__submit-cart':
        this.submitOrder();
        break;
      case 'remove-product':
        this.updateCart(
          +product.dataset.productId,
          'decrease',
          product.dataset.productName,
          +product.dataset.price
        );
        break;
      case 'add-product':
        this.updateCart(
          +product.dataset.productId,
          'increase',
          product.dataset.productName,
          +product.dataset.price
        );
        break;

      default:
        break;
    }
  }
}
