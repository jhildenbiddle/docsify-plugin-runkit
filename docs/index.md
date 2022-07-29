<!-- omit in toc -->
# docsify-plugin-runkit

[![NPM](https://img.shields.io/npm/v/docsify-plugin-runkit.svg?style=flat-square)](https://www.npmjs.com/package/docsify-plugin-runkit)
[![GitHub Workflow Status (main)](https://img.shields.io/github/workflow/status/jhildenbiddle/docsify-plugin-runkit/Build/main?label=checks&style=flat-square)](https://github.com/jhildenbiddle/docsify-plugin-runkit/actions?query=branch%3Amain+)
[![Codacy grade](https://img.shields.io/codacy/grade/e9c2a9504211450ab39e0d72a1158a47.svg?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/docsify-plugin-runkit/dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/docsify-plugin-runkit/blob/main/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/docsify-plugin-runkit/badge)](https://www.jsdelivr.com/package/npm/docsify-plugin-runkit)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-runkit&hashtags=docsify,developers,frontend,plugin)
<a class="github-button" href="https://github.com/jhildenbiddle/docsify-plugin-runkit" data-icon="octicon-star" data-show-count="true" aria-label="Star jhildenbiddle/docsify-plugin-runkit on GitHub">Star</a>

A [docsify.js](https://docsify.js.org) plugin for rendering interactive JavaScript <abbr title="Read-Eval-Print Loop">REPL</abbr>s powered by [RunKit](https://runkit.com/).

<!-- omit in toc -->
## Demo

A data visualization rendered using [D3.js](https://d3js.org/)

<div data-runkit>

```javascript
var R = require("ramda");
var randrange = require("random-number-in-range");
var d3Graph = require("@runkit/runkit/d3-graph/1.0.0");

var count = 100;
var nodes = R.range(0, 100).map((_, x) => ({ "name": x, "group": Math.floor(x * 7 / count) }));

var links = R.range(0, Math.floor(count * 1.15)).map(function(_, x) {
    var source = x % count;
    var target = Math.floor(Math.log(1 + randrange(0, count)) / Math.log(1.3));
    var value = 10.0 / (1 + Math.abs(source - target));

    return { "source": source, "target": target, "value": value };
});

d3Graph(nodes, links);
```

</div>

**Tip:** Press <kbd>⇧ Shift</kbd> <kbd>⌤ Enter</kbd> to "run" the notebook.

?> Like this plugin? Check out [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable) for your site theme, [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/) for tabbed content, and [docsify-plugin-ethicalads](https://jhildenbiddle.github.io/docsify-plugin-ethicalads/) for EthicalAds integration!

<!-- omit in toc -->
## Features

- Render JavaScript code blocks as interactive [Node.js](https://nodejs.org/en/) <abbr title="Read-Eval-Print Loop">REPL</abbr>s
- Embed existing notebooks from [runkit.com](https://runkit.com/)
- Configure <abbr title="Read-Eval-Print Loop">REPL</abbr>s globally or individually using [options](#options) from RunKit's API
- Save changes as new notebooks on [runkit.com](https://runkit.com/)

<!-- omit in toc -->
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

<!-- omit in toc -->
## Usage

<!-- omit in toc -->
### Code Fences

To render an interactive JavaScript <abbr title="Read-Eval-Print Loop">REPL</abbr>, add a block-level HTML element with a `data-runkit` attribute to your markdown file.

```html
<div data-runkit></div>
```

Set the <abbr title="Read-Eval-Print Loop">REPL</abbr> source code using markdown
code fences within the `data-runkit` element and configure [options](#options) using `data-runkit-*` data attributes as needed. Note the blank lines before and after the code fences as these are required for proper rendering.

````markdown
<div
  data-runkit
  data-runkit-evaluate-on-load="true"
  data-runkit-gutter-style="none"
  data-runkit-node-version="18"
>

```javascript
console.log('Hello!');
```

</div>
````

**Result**

<div
  data-runkit
  data-runkit-evaluate-on-load="true"
  data-runkit-gutter-style="none"
  data-runkit-node-version="18"
>

```javascript
console.log('Hello, World!');
```

</div>

<!-- omit in toc -->
### Embedding

To render an existing RunKit notebook, add a block-level HTML element with a `data-runkit` attribute and the RunKit notebook URL as the value to your markdown file.

Unfortunately, RunKit's [API](https://runkit.com/docs/embed) does not allow configuring options for embedded notebooks at this time.

```html
<div data-runkit="https://runkit.com/runkit/welcome"></div>
```

**Result**

<div data-runkit="https://runkit.com/runkit/welcome"></div>

<!-- omit in toc -->
## Options

?> Note: For an up-to-date list of options, please see Runkit's [official embedding documentation](https://runkit.com/docs/embed).

- [environment](#environment)
- [evaluateOnLoad](#evaluateonload)
- [gutterStyle](#gutterstyle)
- [hidesActionButton](#hidesactionbutton)
- [hidesEndpointLogs](#hidesendpointlogs)
- [minHeight](#minheight)
- [mode](#mode)
- [nodeVersion](#nodeversion)
- [packageTimestamp](#packagetimestamp)
- [preamble](#preamble)
- [readOnly](#readonly)
- [tabSize](#tabsize)
- [title](#title)

Default options are set via the `runkit` property of the [`window.$docsify`](https://docsify.js.org/#/configuration) configuration object:

```html
<script>
  window.$docsify = {
    // ...
    runkit: {
      nodeVersion   : '18',
      gutterStyle   : 'none',
      evaluateOnLoad: true
    }
  };
</script>
```

Options can be set on individual <abbr title="Read-Eval-Print Loop">REPL</abbr>s using code fences using HTML data attributes. Note that while options set via JavaScript use "camelCase" names (e.g. `nodeVersion`), options set via data attributes use "kebab-case" (e.g. `node-version`).

```html
<div
    data-runkit
    data-runkit-node-version="18"
    data-runkit-gutter-style="none"
    data-runkit-evaluate-on-load="true"
>
</div>
```

Unfortunately, RunKit's [API](https://runkit.com/docs/embed) does not allow configuring options for [embedded](#embedding) notebooks at this time.

### environment

Environment variables for the execution environment. Available under `process.env`.

- Type: `Array<{name: string, value: string}>`
- Default: `[]`

```javascript
runkit: {
  environment: [
    { name: 'foo', value: 'bar' }
  ]
}
```

Data attribute values with be parsed using [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), therefore the value must be valid JSON. Note the use of single quotes (`'`) surrounding the attribute value and double-quotes (`"`) around property keys and values.

```html
<div
  data-runkit
  data-runkit-environment='[ { "name": "foo", "value": "bar" } ]'
>
```

### evaluateOnLoad

Evaluate the Embed when it finishes loading.

- Type: `boolean`
- Default: `false`

```javascript
runkit: {
  evaluateOnLoad: true
}
```

```html
<div
  data-runkit
  data-runkit-evaluate-on-load="true"
>
```

### gutterStyle

Where the line numbers should appear. Defaults to "outside"

- Type: `string` ("inside" | "none" | "outside")
- Default: `"inside"`

```javascript
runkit: {
  gutterStyle: 'none'
}
```

```html
<div
  data-runkit
  data-runkit-gutter-style="none"
>
```

### hidesActionButton

Hides the "▶ Run" button. In Endpoint mode, Hides the endpoint URL.

- Type: `boolean`
- Default: `false`

```javascript
runkit: {
  hidesActionButton: true
}
```

```html
<div
  data-runkit
  data-runkit-hides-action-button="true"
>
```

### hidesEndpointLogs

In Endpoint mode, Hides the logs that would appear when hitting the Endpoint. See <https://runkit.com/docs/endpoint>.

- Type: `boolean`

```javascript
runkit: {
  hidesEndpointLogs: false
}
```

```html
<div
  data-runkit
  data-runkit-hides-endpoint-logs="false"
>
```

### minHeight

Minimum height of the embed in pixels.

- Type: `string` (cssPxString, e.g. `"100px"`)
- Default: `"73px"`

```javascript
runkit: {
  minHeight: '200px'
}
```

```html
<div
  data-runkit
  data-runkit-min-height="200px"
>
```

### mode

When in default mode RunKit Embeds behave like a regular notebook and display outputs after each evaluation. When the Embed is in endpoint mode the outputs are replaced by endpoint logs and a URL is provided to run the Embed code. See <https://runkit.com/docs/endpoint>.

- Type: `string` ("endpoint" | "default")
- Default: `"default"`

```javascript
runkit: {
  mode: 'endpoint'
}
```

```html
<div
  data-runkit
  data-runkit-mode="endpoint"
>
```

### nodeVersion

A semver range that the node engine should satisfy.

- Type: `string` (semver range, e.g. `"4.0.x"` or `"> 6.9.2"`)
- Default: `"18"`

```javascript
runkit: {
  nodeVersion: '18'
}
```

```html
<div
  data-runkit
  data-runkit-node-version="18"
>
```

### packageTimestamp

The timestamp in UTC milliseconds to recreate the state of package availability. No packages published to npm after this time are available in this embed. Useful for reproducing bugs, or guaranteeing dependency versions. By default the timestamp is set to the time the embed is created.

- Type: `number` or `null`

```javascript
runkit: {
  packageTimestamp: 'null'
}
```

```html
<div
  data-runkit
  data-runkit-package-timestamp="null"
>
```

### preamble

Code in the preamble field will not be displayed in the embed, but will be executed before running the code in the embed. For example, libraries that use RunKit for documentation often require their package in the preamble to avoid clutter in the embed code.

- Type: `string`

```javascript
runkit: {
  preamble: 'var myLib = require("my-lib");'
}
```

```html
<div
  data-runkit
  data-runkit-preamble="var myLib = require('my-lib');"
>
```

### readOnly

Determines if the notebook is editable.

- Type: `boolean`
- Default: `false`

```javascript
runkit: {
  readOnly: true
}
```

```html
<div
  data-runkit
  data-runkit-read-only="true"
>
```

### tabSize

An Integer Minimum of 0 Defaults to 4

- Type: `number` (integer, minimum of `0`)
- Default: `4`

```javascript
runkit: {
  tabSize: 2
}
```

```html
<div
  data-runkit
  data-runkit-tab-size="2"
>
```

### title

The title of the RunKit Notebook when it is saved on RunKit.

- Type: `string`

```javascript
runkit: {
  title: 'My Notebook Title'
}
```

```html
<div
  data-runkit
  data-runkit-title="My Notebook Title"
>
```

<!-- omit in toc -->
## Contact & Support

- Create a [GitHub issue](https://github.com/jhildenbiddle/docsify-plugin-runkit/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/docsify-plugin-runkit) or 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fdocsify-plugin-runkit&hashtags=docsify,developers,frontend,javascript) to support the project!

<!-- omit in toc -->
## License

This project is licensed under the [MIT license](https://github.com/jhildenbiddle/docsify-plugin-runkit/blob/main/LICENSE).

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))

<!-- GitHub Buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
