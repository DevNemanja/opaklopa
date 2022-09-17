import Hamburger from './modules/hamburger';
import Header from './modules/header';

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
];
