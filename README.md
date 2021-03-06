# docsify-plugin-runkit

[![NPM](https://img.shields.io/npm/v/docsify-plugin-runkit.svg?style=flat-square)](https://www.npmjs.com/package/docsify-plugin-runkit)
[![GitHub Workflow Status (main)](https://img.shields.io/github/workflow/status/jhildenbiddle/docsify-plugin-runkit/Build/main?label=checks&style=flat-square)](https://github.com/jhildenbiddle/docsify-plugin-runkit/actions?query=branch%3Amain+)
[![Codacy grade](https://img.shields.io/codacy/grade/e9c2a9504211450ab39e0d72a1158a47.svg?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/docsify-plugin-runkit/dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/docsify-plugin-runkit/blob/main/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/docsify-plugin-runkit/badge)](https://www.jsdelivr.com/package/npm/docsify-plugin-runkit)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-runkit&hashtags=docsify,developers,frontend,plugin)

A [docsify.js](https://docsify.js.org) plugin for rendering interactive JavaScript <abbr title="Read-Eval-Print Loop">REPL</abbr>s powered by [RunKit](https://runkit.com/).

- [Documentation](https://jhildenbiddle.github.io/docsify-plugin-runkit)

**Screenshot**

<!-- Screenshots made with https://www.screely.com/ -->
<a href="https://jhildenbiddle.github.io/docsify-plugin-runkit">
  <picture>
    <source srcset="https://raw.githubusercontent.com/jhildenbiddle/docsify-plugin-runkit/main/docs/assets/img/screenshot-runkit.webp" type="image/webp">
    <img src="https://raw.githubusercontent.com/jhildenbiddle/docsify-plugin-runkit/main/docs/assets/img/screenshot-runkit.jpg" alt="screenshot">
  </picture>
</a>

## Features

- Render JavaScript code blocks as interactive [Node.js](https://nodejs.org/en/) <abbr title="Read-Eval-Print Loop">REPL</abbr>s
- Embed existing notebooks from [runkit.com](https://runkit.com/)
- Configure <abbr title="Read-Eval-Print Loop">REPL</abbr>s globally or individually using [options](https://jhildenbiddle.github.io/docsify-plugin-runkit#options) from RunKit's API
- Save changes as new notebooks on [runkit.com](https://runkit.com/)

## Installation

1. Add the plugin to your `index.html` after docsify.

   ```html
   <!-- docsify (latest v4.x.x)-->
   <script src="https://cdn.jsdelivr.net/npm/docsify@4"></script>

   <!-- docsify-plugin-runkit (latest v1.x.x) -->
   <script src="https://cdn.jsdelivr.net/npm/docsify-plugin-runkit@1"></script>
   ```

1. Review the [options](#options) section and configure as needed.

   ```javascript
   window.$docsify = {
     // ...
     runkit: {
       // Options...
     }
   };
   ```

## Usage & Options

See the [documentation site](https://jhildenbiddle.github.io/docsify-plugin-runkit) for details and demos.

## Contact & Support

- Create a [GitHub issue](https://github.com/jhildenbiddle/docsify-plugin-runkit/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ?????? [star on GitHub](https://github.com/jhildenbiddle/docsify-plugin-runkit) or ???? [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-runkit&hashtags=docsify,developers,frontend,javascript) to support the project!

## License

This project is licensed under the [MIT license](https://github.com/jhildenbiddle/docsify-plugin-runkit/blob/main/LICENSE).

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
