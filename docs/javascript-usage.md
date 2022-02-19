
## JavaScript

Use **ES2015 classes** when creating modules.

Every class should be exported as a **default module export**.

When creating a module, preserve its DOM reference inside the contructor. Also, bind event listeners inside the constructor, set private members and call relevant methods.

```javascript
  class ModuleExample {
    constructor(app, element) {
      // preserve the application root
      this.root = app;

      // preserve DOM reference
      this.element = element;

      // bind event handlers
      this.handleClick = this.handleClick.bind(this);
      this.element.addEventListener('click', this.handleClick, false);

      // private members
      this.isVisible = false;
      this.data = [];
    }

    handleClick(event) {
      console.log('clicked: ', event.target);
    }
  }
```

Traditionally, the revealing module pattern allowed us to selectively choose what is exposed and what stays private. We can achieve a similar thing using ES2015 modules--because we are exporting only the class, any other member defined in the same module won't be exposed:

```javascript
  const _privateMethod = () => {
    return 'Hi from private!';
  };

  export default class ModuleExample {
    constructor(app, element) {
      this.root = app;
      this.element = element;
    }

    publicMethod() {
      return _privateMethod();
    }
  }

  /**
   *  Usage example
   *
   * const el = document.querySelector('.some-component');
   * const moduleInstance = new ModuleExample(el);
   * moduleInstance.publicMethod();
  */
```