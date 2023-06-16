import Cart from '.';

export default class AddToCart extends Cart {
  constructor(app, el) {
    super();
    this.app = app;
    this.el = el;
    this.id = +this.el.dataset.id;
    this.name = this.el.dataset.name;
    this.price = +this.el.dataset.price;
    this.imgUrl = this.el.dataset.imgUrl;
    this.hasVariations = false;

    this.handleClick = this.handleClick.bind(this);

    el.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (e.target.classList.contains('product__variation-input')) {
      if (this.el.querySelector('input:checked')) {
        this.id = +this.el.querySelector('input:checked').dataset.id;
        this.price = +this.el.querySelector('input:checked').dataset.price;
        this.hasVariations = true;
      }
    }

    if (e.target.classList.contains('button')) {
      if (this.el.querySelector('input:checked')) {
        this.id = +this.el.querySelector('input:checked').dataset.id;
        this.price = +this.el.querySelector('input:checked').dataset.price;
        this.hasVariations = true;
      }

      this.updateCart(
        this.id,
        e.target.className === 'remove-product button button--qty'
          ? 'decrease'
          : e.target.className === 'add-to-cart button' ||
            e.target.className === 'add-product button button--qty'
          ? 'increase'
          : null,
        this.name,
        this.price,
        this.imgUrl,
        this.hasVariations
      );
    }

    this.resetVariationMarkup(this.id, this.name);
    this.updateMarkup();
  }
}
