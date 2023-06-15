import Cart from '.';

export default class CartSidebar extends Cart {
  constructor(app, el) {
    super();
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);
    this.persistData = this.persistData.bind(this);

    this.userData = {
      name: '',
      address: '',
      mail: '',
      telefon: '',
      poruka: '',
    };

    this.updateMarkup();

    this.inputs = el.querySelectorAll('.writtable');
    this.loadUserInfo();

    this.inputs.forEach((input) => {
      input.addEventListener('blur', this.persistData);
    });

    el.addEventListener('click', this.handleClick);
  }

  loadUserInfo() {
    const userData = JSON.parse(localStorage.getItem('opa-user-data'));

    if (!userData) return;

    this.inputs.forEach((input) => {
      input.value = userData[input.id];
    });
  }

  persistData(e) {
    this.userData[e.target.id] = e.target.value;

    localStorage.setItem('opa-user-data', JSON.stringify(this.userData));
  }

  handleClick(e) {
    const target = e.target;
    const product = e.target.closest('[data-product-id]');

    switch (true) {
      case target.classList.contains('cart-sidebar__suggestion-img') ||
        target.classList.contains('cart-sidebar__suggestion-desc') ||
        target.classList.contains('cart-sidebar__suggestion-button'):
        const suggestedProduct = e.target.closest('[data-suggestion-id]');

        this.updateCart(
          +suggestedProduct.dataset.suggestionId,
          'increase',
          suggestedProduct.dataset.suggestionName,
          +suggestedProduct.dataset.price,
          suggestedProduct.dataset.imgUrl
        );
        break;
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

      case target.classList.contains('cart-sidebar__close-button') ||
        target instanceof SVGElement ||
        target.classList.contains('cart-sidebar__overlay'):
        this.el.classList.remove('cart-sidebar--open');
        break;

      default:
        break;
    }
  }
}
