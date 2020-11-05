<h1 align="center">npm-outdated-html</h1>

<p align="center">
<a href="https://github.com/ctessier/npm-outdated-html/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ctessier/npm-outdated-html.svg" alt="GitHub license"></a>
<a href="https://www.npmjs.com/package/npm-outdated-html"><img src="https://img.shields.io/npm/v/npm-outdated-html.svg" alt="npm"></a>
<a href="https://travis-ci.com/ctessier/npm-outdated-html"><img src="https://travis-ci.com/ctessier/npm-outdated-html.svg?branch=master" alt="Build Status"></a>
<a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide"></a>
<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release"></a>

</p>
<p align="center"><b>Generate a HTML report for NPM Outdated</b></p>

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)
- [License & Copyright](#license_copyright)

## 🏁 Getting Started <a name = "getting_started"></a>

```
$ npm install -g npm-outdated-html
```

> This package uses async/await and requires Node.js 7.6 or above

## 🎈 Usage <a name="usage"></a>

To generate a report, run the following:

```
$ npm outdated --long --json | npm-outdated-html
```

By default the report will be saved to `npm-outdated.html`

If you want to specify the output file, add the `--output` option:

```bash
npm outdated --long --json | npm-outdated-html --output report.html
```

You can also fully customize the generated report by providing `--template` option followed by your own handlebars template:

```bash
npm outdated --long --json | npm-outdated-html --template ./my-awesome-template.hbs
```

## ✍️ Authors <a name = "authors"></a>

- [@ctessier](https://github.com/ctessier) - Maintainer
- [@nprail](https://github.com/nprail) - Author of [npm-audit-html](https://github.com/eventOneHQ/npm-audit-html) which inspired this package

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- This package is a fork from [npm-audit-html](https://github.com/eventOneHQ/npm-audit-html). Thanks [Noah Prail](https://github.com/nprail), and all the other contributors for your great work!

## License & Copyright <a name = "license_copyright"></a>

[MIT](LICENSE)

Copyright for portions of this project are held by eventOne, Inc, 2019 as part of project  [npm-audit-html](https://github.com/eventOneHQ/npm-audit-html). All other copyright for this project are held by Clément Tessier, 2020.
