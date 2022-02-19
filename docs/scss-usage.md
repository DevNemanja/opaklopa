
## CSS/Sass

Version 3 of Sass is being used for styling, aka **SCSS (Sassy CSS)** with `*.scss` file extension.

All the styles are written with **mobile-first** approach in mind, responsive helpers were created to override breakpoints from smaller towards a larger ones.

**BEM (Block Element Modifier)** is used as a naming convention.


### How to Work with BEM

**BEM** is a popular CSS naming convention that helps us to build a scalable and modular CSS systems.

When using BEM in this project, prepend the block name with UI element type for easier debugging.
For example, a component should have `c-` as its prefix, page `p-`, etc.

In order to keep things scoped within a block, always use component name as the block.
All of its children are elements and design variations or states should be handled with modifiers.

```SCSS
.c-header {
  // ...

  &__logo {
    &--dark {
      // ...
    }

    &--light {
      // ...
    }
  }
}
```

Use **Sass nesting** only for BEM selectors (3 levels deep) and pseudo-selectors when it's needed.

Do not style one module from another, use BEM as a protection of a componet namespace.