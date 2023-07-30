export default class OrderConfirmationModal {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);

    el.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (e.target.classList.contains('close-modal')) {
      document
        .querySelector('.order-confirmation__message--show')
        .classList.remove('order-confirmation__message--show');
    }
  }
}
