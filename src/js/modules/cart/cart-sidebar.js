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

    console.log(target.classList);

    switch (true) {
      case target.classList.contains('cart-sidebar__submit-cart'):
        e.preventDefault();
        this.submitOrder();
        break;
      case target.classList.contains('remove-product'):
        this.updateCart(
          +product.dataset.productId,
          'decrease',
          product.dataset.productName,
          +product.dataset.price,
          product.dataset.imgUrl
        );
        break;
      case target.classList.contains('add-product'):
        this.updateCart(
          +product.dataset.productId,
          'increase',
          product.dataset.productName,
          +product.dataset.price,
          product.dataset.imgUrl
        );
        break;
      case target.classList.contains('cart-sidebar__form-toggle'):
        document
          .querySelector('.cart-sidebar__form')
          .classList.toggle('cart-sidebar__form--open');
        document
          .querySelector('.cart-sidebar__form-toggle')
          .classList.toggle('cart-sidebar__form-toggle--open');
        break;

      case target.classList.contains('cart-sidebar__close-button'):
        this.el.classList.remove('cart-sidebar--open');
        break;

      default:
        break;
    }
  }
}
