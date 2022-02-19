import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

export default class Projects {
    constructor(app, element) {
        this.root = app;
        this.element = element;

        this.initIsotope();

        this.element.addEventListener('click', this.handleClick);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        const target = e.target;

        switch (true) {
            case (target.classList.contains('projects__filters-toggler')):
                document.querySelector('.projects__filters-wrapper').style.display = 'flex';
                break;

            case (target.classList.contains('projects__filters-wrapper') || target.classList.contains('projects__button') && window.innerWidth < 601):
                document.querySelector('.projects__filters-wrapper').style.display = 'none';

                break;
            default:
                break;
        }
    }

    initIsotope() {
        const iso = new Isotope('.projects__grid', {
            // options
            itemSelector: '.projects__grid-item'
        });
        imagesLoaded(document.querySelector('.projects__grid'));

        const buttons = this.element.querySelectorAll('.projects__button');

        buttons.forEach((button, i) => {
            if (i === 0) {
                button.addEventListener('click', function () {
                    iso.arrange({
                        filter: '*'
                    })

                    document.querySelector('.projects__single-filter.active').classList.remove('active');
                    this.parentElement.classList.add('active');
                });


                return;
            }

            button.addEventListener('click', function () {
                iso.arrange({
                    filter: '.' + button.textContent
                })

                document.querySelector('.projects__single-filter.active').classList.remove('active');
                this.parentElement.classList.add('active');
            });
        });
    }
}
