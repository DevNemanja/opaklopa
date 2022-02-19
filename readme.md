# Starter pack for WordPress theme development based on Gulp.js

## Requirements
- Node.js
- Yarn (Optional)
- Running Local WordPress site

## Dependancy installation
Install node modules with `npm install` or `yarn`

## Live reload
Open root folder(of Main Module) in terminal and run `npm run dev` to start watching over changes in your project. This will start server with live reload and open it in you default browser. You will get a message in terminal:

    Local: http://localhost:3000
    External: http://192.168.0.12:3000
    -------------------------------------
    UI: http://localhost:3001
    UI External: http://localhost:3001 

which mean that you can test your project on other devices connected to the same network by using the external link(e.g. If your laptop is connected to same wifi as your mobile phone you can access to your project on mobile by going to http://192.168.0.12:3000).


-------------------------------------------

**IMPORTANT**
Inside of gulpfile.js you need to define URL which browserSync should mimic. (Line 1: const url = 'your-url';) [Read more](https://browsersync.io/docs/gulp)


-------------------------------------------


## Javascript Files
The app is stored inside of src/js/app.js. Every module needs to be registered within HTML with data-module attribute and within src/js/modules.js file. 

- [More on JavaScript usage](docs/javascript-usage.md)


## SCSS - CSS files
The src/scss/style.scss is the main stylesheet of the app. For modularity you can organize your files in partials and import them into style.scss. Basic structure is set to follow 7-1 architecture. To add styles into your theme you should target dist/css/style.css inside of functions.php.

- [More on 7-1 architecture](https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture)
- [More on SCSS usage](docs/scss-usage.md)

## Using npm packages
Importing packages is being done by webpack. After installing a package you can include its CSS or JS file inside of app.js. 

Examples: 
```import 'bootstrap/dist/css/bootstrap.css';```
```import 'bootstrap/scss/bootstrap.scss';```
```import 'bootstrap/dist/js/bootstrap';```

CSS and SCSS files must have extension added, while it's optional for JavaScript files.

To use jQuery you need to add this import to the top of the module that is using jQuery
```import $ from 'jquery'```


