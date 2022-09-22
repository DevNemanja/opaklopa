export default class Header {
    constructor(app, el) {
        this.app = app;
        this.el = el;

        window.addEventListener('scroll', function () {
            if (window.scrollY >= 50) {
                document.querySelector('.header__wrapper').classList.add('header__wrapper--scrolled')
            } else {
                document.querySelector('.header__wrapper').classList.remove('header__wrapper--scrolled')
            }
        });
    }
}