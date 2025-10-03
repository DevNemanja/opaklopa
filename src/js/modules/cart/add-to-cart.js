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
    this.hasVariations = Boolean(this.el.dataset.hasVariations);

    this.handleClick = this.handleClick.bind(this);

    el.addEventListener('click', this.handleClick);
  }

  uncheckAllSides() {
    const inputs = this.el.querySelectorAll('input[type="checkbox"]');
    inputs.forEach((input) => {
      input.checked = false;
    });
  }

  openSidesModal() {
    const wrapper = this.el.querySelector('.product__sides-wrapper');
    const overlay = this.el.querySelector('.product__overlay');
    const button = this.el.querySelector('.product__show-sides');

    button && button.classList.add('hidden');
    overlay.classList.add('product__overlay--show');
    wrapper && wrapper.classList.add('product__sides-wrapper--visible');
    document.body.classList.add('noscroll');
  }

  closeSidesModal() {
    const wrapper = this.el.querySelector('.product__sides-wrapper');
    const overlay = this.el.querySelector('.product__overlay');
    const button = this.el.querySelector('.product__show-sides');

    button && button.classList.remove('hidden');
    overlay.classList.remove('product__overlay--show');
    wrapper && wrapper.classList.remove('product__sides-wrapper--visible');
    document.body.classList.remove('noscroll');
  }

  handleClick(e) {
    if (e.target.classList.contains('product__variation-input') && e.target.dataset.variation) {
      if (this.el.querySelector('input:checked')) {
        this.id = +this.el.querySelector('input:checked').dataset.id;
        this.price = +this.el.querySelector('input:checked').dataset.price;

        this.hasVariations = true;
      }
    }

    if (e.target.classList.contains('product__show-sides')) {
      this.openSidesModal();
      this.id = +this.el.dataset.id;
    }

    if (e.target.classList.contains('product__overlay')) {
      this.closeSidesModal();
    }

    const sidesEls = this.el.querySelectorAll('.sides:checked');
    const sides =
      sidesEls.length === 0
        ? null
        : Array.from(sidesEls).map((el) => ({
            id: el.value,
            name: el.name,
            price: el.dataset.price,
          }));

    if (e.target.classList.contains('button')) {
      if (this.el.querySelector('input:checked') && this.hasVariations) {
        this.id = +this.el.querySelector('input:checked').dataset.id;
        this.price = +this.el.querySelector('input:checked').dataset.price;
      }

      this.uncheckAllSides();

      const isIncrease =
        e.target.className === 'add-to-cart button' ||
        e.target.className === 'add-product button button--qty';

      const isDecrease = e.target.className === 'remove-product button button--qty';

      const action = isIncrease ? 'increase' : isDecrease ? 'decrease' : null;

      if (isIncrease) {
        this.animateAddToCart();
        this.closeSidesModal();
      } else if (isDecrease) {
        this.animateRemoveFromCart();
      }

      this.updateCart(
        this.id,
        action,
        this.name,
        this.price,
        this.imgUrl,
        this.hasVariations,
        sides
      );
    }

    this.resetVariationMarkup(this.id, this.name);
    this.updateMarkup();
  }
}
