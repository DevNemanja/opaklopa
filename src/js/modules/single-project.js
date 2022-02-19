export default class SingleProject {
    constructor(app, el) {
        this.app = app;
        this.el = el;

        this.popModal = this.popModal.bind(this);
        this.removeModal = this.removeModal.bind(this);

        this.allImgs = this.el.querySelectorAll('img');

        this.allImgs.forEach(img => {
            img.addEventListener('click', this.popModal);
        });

        this.modal = document.querySelector('.single-project__modal');
        this.modalImg = document.querySelector('.single-project__modal img');

        this.modal.addEventListener('click', this.removeModal);
    }

    popModal(e) {
        if (window.innerWidth < 601) {
            this.modalImg.src = e.target.src;
            this.modal.style.display = 'flex';
            document.body.classList.add('noscroll');
        }
    }

    removeModal() {
        this.modal.style.display = 'none';
        document.body.classList.remove('noscroll');
    }
}