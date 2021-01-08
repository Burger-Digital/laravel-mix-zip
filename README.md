# Laravel Mix Artisan Serve

[![Latest Version on NPM][ico-version]][link-npm]
[![Software License][ico-license]](LICENSE.md)
[![Total Downloads][ico-downloads]][link-downloads]

This extension allows you to automatically zip files after mix finishes running.  

Please make sure that you are using `laravel-mix` version 4.0 or higher.

## Usage

You can install the package with npm or yarn:

```bash
npm install laravel-mix-zip --save-dev
```

```bash
yarn add laravel-mix-zip --dev
```

Then require the extension in your Mix configuration:

```js
const mix = require('laravel-mix');

require('laravel-mix-zip');
...
```

Enable the extension by calling `.zip()` at the end of your Mix chain:

```js
mix.sass('resources/sass/app.scss', 'public/css').zip(['app'], ['composer.json'], 'deploy.zip');
```

> Zips the app folder and composer.json file to deploy.zip

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[ico-downloads]: https://img.shields.io/npm/dt/laravel-mix-zip.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-version]: https://img.shields.io/npm/v/laravel-mix-zip.svg?style=flat-square
[link-downloads]: https://npmjs.com/package/laravel-mix-zip
[link-npm]: https://npmjs.com/package/laravel-mix-zip
