export default class Header {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);
    el.addEventListener('click', this.handleClick);

    window.addEventListener('scroll', function () {
      if (window.scrollY >= 50) {
        document
          .querySelector('.header__wrapper')
          .classList.add('header__wrapper--scrolled');
      } else {
        document
          .querySelector('.header__wrapper')
          .classList.remove('header__wrapper--scrolled');
      }
    });
  }

  handleClick(e) {
    const target = e.target;
    const sidebar = document.querySelector('.cart-sidebar');

    switch (true) {
      case target.classList.contains('header__cart') ||
        target.classList.contains('header__cart-icon'):
        sidebar.classList.add('cart-sidebar--open');
        break;

      default:
        break;
    }
  }
}
