import Cart from '.';
import { CLIENT_KEY, CLIENT_SECRET, LOCATION_URL } from '../../utils';

export default class CartSidebar extends Cart {
  constructor(app, el) {
    super();
    this.app = app;
    this.el = el;

    this.handleClick = this.handleClick.bind(this);
    this.persistData = this.persistData.bind(this);

    this.userData = {
      name: '',
      address: '',
      mail: '',
      telefon: '',
      poruka: '',
    };

    this.updateMarkup();

    this.inputs = el.querySelectorAll('.writtable');
    this.loadUserInfo();

    this.inputs.forEach((input) => {
      input.addEventListener('blur', this.persistData);
    });

    el.addEventListener('click', this.handleClick);
  }

  loadUserInfo() {
    const userData = JSON.parse(localStorage.getItem('opa-user-data'));

    if (!userData) return;

    console.log(userData);

    this.inputs.forEach((input) => {
      input.value = userData[input.id];
    });
  }

  persistData(e) {
    this.userData[e.target.id] = e.target.value;

    localStorage.setItem('opa-user-data', JSON.stringify(this.userData));
  }

  closeSidebar() {
    this.el.classList.remove('cart-sidebar--open');
    document.body.classList.remove('noscroll');
  }

  isCouponValid(codeToCheck, coupons) {
    // Pronađi kupon sa traženim code, case insensitive poređenje
    const coupon = coupons.find((c) => c.code.toLowerCase() === codeToCheck.toLowerCase());

    if (!coupon) {
      throw new Error('Kupon ne postoji');
    }

    // Provera da li je kupon "publish" (aktiviran)
    if (coupon.status !== 'publish') {
      throw new Error('Kupon nije aktivan');
    }

    // Provera datuma isteka
    const now = new Date();
    const expiry = coupon.date_expires ? new Date(coupon.date_expires) : null;

    if (expiry && now > expiry) {
      throw new Error('Kupon je istekao');
    }

    // (Dodatne provere po potrebi: usage_limit, minimum_amount, itd)
    return { valid: true, coupon };
  }

  checkCoupon() {
    const couponInput = this.el.querySelector('#coupon');
    const statusDiv = this.el.querySelector('#coupon-status');
    const cartDiscount = this.el.querySelector('#cart-discount');
    const cartTotal = this.el.querySelector('#cart-total');
    const cartTotalWrapper = this.el.querySelector('.cart-sidebar__total-amount');
    const cartDiscountWrapper = this.el.querySelector('.cart-sidebar__discount-amount');

    console.log(cartDiscountWrapper);

    const couponCode = couponInput.value.trim();
    let validCoupon = null;

    statusDiv.textContent = 'Loading';

    if (!couponCode) {
      statusDiv.textContent = 'Molimo unesite kupon kod.';
      statusDiv.style.color = 'red';
      return;
    }

    fetch(`${LOCATION_URL}/wp-json/wc/v3/coupons/`, {
      headers: {
        Authorization: `Basic ${btoa(`${CLIENT_KEY}:${CLIENT_SECRET}`)}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Kupon nije pronađen ili nije važeći.');
        return res.json();
      })
      .then((data) => {
        validCoupon = couponCode;
        const couponRes = this.isCouponValid(couponCode, data);
        console.log(couponRes);

        if (couponRes) {
          statusDiv.textContent = `Kupon "${couponCode}" je prihvaćen: ${Math.round(
            +couponRes.coupon.amount
          )}${couponRes.coupon.discount_type === 'percent' ? '%' : ' RSD'} popusta.`;
          statusDiv.style.color = 'green';

          const total = +cartTotal.textContent;
          let discount = 0;

          if (couponRes.coupon.discount_type === 'percent') {
            discount = (total * +couponRes.coupon.amount) / 100;
          } else if (couponRes.coupon.discount_type === 'fixed_cart') {
            discount = +couponRes.coupon.amount;
          }

          cartTotalWrapper.classList.add('cart-sidebar__total-amount--discounted');
          cartDiscountWrapper.classList.remove('cart-sidebar__discount-amount--hidden');
          cartDiscount.textContent = (total - discount).toFixed(2);
        }
      })
      .catch((err) => {
        statusDiv.textContent = err.message;
        statusDiv.style.color = 'red';
        validCoupon = null;
        cartDiscountWrapper.classList.add('cart-sidebar__discount-amount--hidden');
        cartTotalWrapper.classList.remove('cart-sidebar__total-amount--discounted');
      });
  }

  handleClick(e) {
    const target = e.target;
    const product = e.target.closest('[data-product-id]');

    switch (true) {
      case target.classList.contains('cart-sidebar__suggestion-img') ||
        target.classList.contains('cart-sidebar__suggestion-desc') ||
        target.classList.contains('cart-sidebar__suggestion-button'):
        const suggestedProduct = e.target.closest('[data-suggestion-id]');

        this.updateCart(
          +suggestedProduct.dataset.suggestionId,
          'increase',
          suggestedProduct.dataset.suggestionName,
          +suggestedProduct.dataset.price,
          suggestedProduct.dataset.imgUrl
        );
        break;
      case target.classList.contains('order-form__submit-cart'):
        e.preventDefault();
        this.submitOrder();
        break;
      case target.id === 'check-coupon':
        e.preventDefault();
        this.checkCoupon();
        break;
      case target.classList.contains('remove-product'):
        this.updateCart(
          +product.dataset.productId,
          'decrease',
          product.dataset.productName,
          +product.dataset.price,
          product.dataset.imgUrl
        );
        break;
      case target.classList.contains('add-product'):
        this.updateCart(
          +product.dataset.productId,
          'increase',
          product.dataset.productName,
          +product.dataset.price,
          product.dataset.imgUrl
        );
        break;

      case target.classList.contains('cart-sidebar__close-button') ||
        target instanceof SVGElement ||
        target.classList.contains('cart-sidebar__overlay'):
        this.closeSidebar();
        break;

      case target.classList.contains('back-to-cart'):
        this.removeErrorMessage();
        break;

      default:
        break;
    }
  }
}
