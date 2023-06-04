import AddToCart from './modules/add-to-cart';
import Hamburger from './modules/hamburger';
import Header from './modules/header';
import Navigator from './modules/navigator';

// name of a module must be present in the DOM in order for it to be initialized
export const modules = [
  {
    name: 'HAMBURGER',
    constructor: Hamburger
  },
  {
    name: 'HEADER',
    constructor: Header
  },
  {
    name: 'NAVIGATOR',
    constructor: Navigator
  },
  {
    name: 'ADD_TO_CART',
    constructor: AddToCart
  },
];
