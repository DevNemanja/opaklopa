export default class Hamburger {
    constructor(app, el) {
        this.app = app;
        this.el = el;

        this.handleClick = this.handleClick.bind(this);

        el.addEventListener('click', this.handleClick);
    }

    handleClick() {
        this.el.classList.toggle('is-open');
        this.el.classList.toggle('is-closed');

        document.querySelector('.mobile-menu').classList.toggle('mobile-menu--open');
        document.body.classList.toggle('noscroll');
    }
}