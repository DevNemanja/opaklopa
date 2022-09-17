export default class Hamburger {
    constructor(app, el) {
        this.app = app;
        this.el = el;
        console.log(el);

        this.handleClick = this.handleClick.bind(this);

        el.addEventListener('click', this.handleClick);
    }

    handleClick() {
        this.el.classList.toggle('is-open');
        this.el.classList.toggle('is-closed');
    }
}