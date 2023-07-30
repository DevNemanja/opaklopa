import AddToCart from './modules/cart/add-to-cart';
import CartSidebar from './modules/cart/cart-sidebar';
import Hamburger from './modules/hamburger';
import Header from './modules/header';
import Navigator from './modules/navigator';
import OrderConfirmationModal from './modules/order-confirmation-modal';
import Orders from './modules/orders';

// name of a module must be present in the DOM in order for it to be initialized
export const modules = [
  {
    name: 'HAMBURGER',
    constructor: Hamburger,
  },
  {
    name: 'HEADER',
    constructor: Header,
  },
  {
    name: 'NAVIGATOR',
    constructor: Navigator,
  },
  {
    name: 'ADD_TO_CART',
    constructor: AddToCart,
  },
  {
    name: 'CART_SIDEBAR',
    constructor: CartSidebar,
  },
  {
    name: 'ORDERS',
    constructor: Orders,
  },
  {
    name: 'ORDER_CONFIRMATION_MODAL',
    constructor: OrderConfirmationModal,
  },
];
