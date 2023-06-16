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

  openSidebar() {
    document.querySelector('.cart-sidebar').classList.add('cart-sidebar--open');
    document.body.classList.add('noscroll');
  }

  handleClick(e) {
    const target = e.target;

    switch (true) {
      case target.classList.contains('header__cart') ||
        target.classList.contains('header__cart-icon'):
        this.openSidebar();
        break;

      default:
        break;
    }
  }
}
