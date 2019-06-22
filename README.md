# TestLucca

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `npm run proxy` for a backend dev server at `http://localhost:4201/`. The config is in `proxy/`.

Run `npm run start:proxy` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Use proxy backend server for `/api` request. Locale fr with `--configuration=fr`, remove to build with default locale en

Run `npm run start` for a dev server same as `strat:proxy` but with lucca api for `/api` request

Run `npm run start:prod` for serving the project in production ready with lucca api for `/api` request

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `npm run buld:prod` to build the project in prod ready and `npm run build:prod-fr` with locale fr.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Configure the chrome version in `pree2e` see [issue](https://github.com/angular/angular-cli/issues/4640)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
