export default class Navigator {
  constructor(app, el) {
    this.app = app;
    this.el = el;

    this.products = document.querySelectorAll('.products');
    this.navItems = el.querySelectorAll('.navigator__list-item');
    this.navList = el.querySelector('.navigator__list');

    this.scrollToSection = this.scrollToSection.bind(this);

    this.navItems.forEach((item) => {
      item.addEventListener('click', this.scrollToSection);
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY >= 50) {
        document
          .querySelector('.navigator__list')
          .classList.add('navigator__list--open');
      } else {
        document
          .querySelector('.navigator__list')
          .classList.remove('navigator__list--open');
      }

      this.products.forEach((product) => {
        if (
          window.scrollY + 100 >= product.offsetTop &&
          window.scrollY < product.offsetTop + product.offsetHeight
        ) {
          const activeTitle =
            product.querySelector('.title__header').textContent;
          this.setActive(activeTitle);
        }
      });
    });
  }

  scrollToSection(e) {
    // Dohvati ime kategorije iz kliknutog dugmeta
    const target = e.target.textContent;

    this.products.forEach((product) => {
      // Dohvati ime dugmeta iz naslova svake sekcije
      const activeTitle = product.querySelector('.title__header').textContent;

      // Ako se kategorije slazu - skroluj do te sekcije
      if (target === activeTitle) {
        var headerOffset = 100;
        var elementPosition = product.getBoundingClientRect().top;
        var offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  }

  setActive(product) {
    this.navItems.forEach((item) => {
      if (item.textContent === product) {
        document
          .querySelector('.navigator__list-item--active')
          .classList.remove('navigator__list-item--active');
        item.classList.add('navigator__list-item--active');
        this.navList.scrollLeft = item.offsetLeft - 20; // 20px da se slozi sa paddingom
      }
    });
  }
}
