import { generateGuid } from './utils';
import { modules } from './modules';

// WINDOWS
// export const CLIENT_KEY = 'ck_47fc00cf4013b0019059255c037ec51d6f916797';
// export const CLIENT_SECRET = 'cs_95133a72259ada71c449a10bb254eab7bb30ce38';

// MAC
// export const CLIENT_KEY = 'ck_31a7018c89c49979f770d069307290261d208e6c';
// export const CLIENT_SECRET = 'cs_8425551d8bc5adea70e65466093cf8fc12943ffa';

// Staging
export const CLIENT_KEY = 'ck_506490f44eaf3fb0c6f9944e6aa8368bfa3d69cd';
export const CLIENT_SECRET = 'cs_baa8bc04d415ee27f40fa32c7613436f8e804a3e';

class App {
  constructor(modules) {
    this.module = {};

    this.initModules(modules);
  }

  initModules(modules) {
    let moduleElements = document.querySelectorAll('[data-module]') || [];

    if (!moduleElements.length) {
      console.warn(
        'MISSING MODULES: No modules were defined on the page, please check your HTML'
      );
      return this;
    }

    moduleElements.forEach((element) => {
      const elementModule = element.getAttribute('data-module');

      modules.forEach((module) => {
        if (module.name === elementModule) {
          this.module[`${module.name}-${generateGuid()}`] =
            new module.constructor(this, element);
        }
      });
    });
  }

  emitEvent({ name, payload }) {
    const event = new CustomEvent(name, {
      detail: payload,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  }
}

const app = new App(modules);
export default app;

// for debugging
window.APP = app || {};
