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

    console.log(product, 'product');

    switch (target.className) {
      case 'cart-sidebar__submit-cart button':
        this.submitOrder();
        break;
      case 'remove-product button button--qty':
        this.updateCart(
          +product.dataset.productId,
          'decrease',
          product.dataset.productName,
          +product.dataset.price,
          product.dataset.imgUrl
        );
        break;
      case 'add-product button button--qty':
        this.updateCart(
          +product.dataset.productId,
          'increase',
          product.dataset.productName,
          +product.dataset.price,
          product.dataset.imgUrl
        );
        break;

      default:
        break;
    }
  }
}
