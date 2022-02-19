import Projects from './modules/projects';
import SingleProject from './modules/single-project';

// name of a module must be present in the DOM in order for it to be initialized
export const modules = [
  {
    name: 'PROJECTS',
    constructor: Projects
  },
  {
    name: 'SINGLE_PROJECT',
    constructor: SingleProject
  }
];
