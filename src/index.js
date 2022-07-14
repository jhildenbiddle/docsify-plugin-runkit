/* global $docsify, RunKit */

import './style.css';

const defaults = {
    nodeVersion: '18',
    gutterStyle: 'inside'
};

function addEvents() {
    // Resize <iframe>
    window.addEventListener('message', e => {
        if (e.origin !== 'https://runkit.com') {
            return;
        }

        let data;

        try {
            data = JSON.parse(e.data);
        }
        catch (e) {
            return false;
        }

        if (data.context !== 'iframe.resize') {
            return false;
        }

        const iframe = document.querySelector('iframe[src="' + data.src + '"]');

        if (!iframe) {
            return false;
        }

        if (data.height) {
            iframe.height = data.height;
        }
    });
}

function init() {
    const runkitElms = [].slice.call(document.querySelectorAll('[data-runkit]'));

    runkitElms.forEach(runkitElm => {
        const notebookURL = runkitElm.getAttribute('data-runkit');

        // Remote notebook
        if (notebookURL) {
            const baseURL = 'https://embed.runkit.com/oembed?url=';
            const embedURL = baseURL + notebookURL;
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);

                            runkitElm.insertAdjacentHTML('afterbegin', data.html);
                        }
                        catch(e) {
                            runkitElm.setAttribute('data-runkit-error', `Unable to parse response from ${embedURL}`);
                        }
                    }
                    else {
                        runkitElm.setAttribute('data-runkit-error', `${xhr.status} ${xhr.responseText}: ${embedURL}`);
                    }
                }
            };

            xhr.open('GET', embedURL, true);
            xhr.send();
        }
        // Local source
        else {
            const attrNames = runkitElm.getAttributeNames();
            const codeElm = runkitElm.querySelector('pre[data-lang] code');
            const sourceCode = codeElm ? codeElm.textContent : '';
            const notebookConfig = Object.assign({}, defaults, $docsify.runkit || {}, {
                element: runkitElm,
                source: sourceCode
            });

            attrNames.forEach(attr => {
                let val = (runkitElm.getAttribute(attr) || '').trim();

                if (val) {
                    let prop = (attr.match(/data-runkit-(\S*)/) || [])[1];

                    // Dash case to camelCase
                    prop = prop.replace(/-([a-z])/g, m => m[1].toUpperCase());

                    // Allow numbers for semver string (e.g., 12.2 => '12.2')
                    if (prop === 'nodeVersion') {
                        val = typeof val === 'number' ? String(val) : val;
                    }
                    // Boolean
                    else if (val === 'true' || val === 'false') {
                        val = val === 'true';
                    }
                    // Array / Object
                    else if (/^[{[].*[}\]]$/s.test(val)) {
                        val = JSON.parse(val);
                    }
                    // Number
                    else if (!isNaN(val)) {
                        val = Number(val);
                    }

                    notebookConfig[prop] = val;
                }
            });

            RunKit.createNotebook(notebookConfig);
        }
    });
}

function waitFor(options) {
    const defaults = {
        testFn: false,
        successFn: Function.prototype,
        failFn: Function.prototype,
        interval: 500,
        timeout: 2500
    };
    const settings = Object.assign({}, defaults, options);

    let elapsed = 0;

    const waitInterval = setInterval(function() {
        if (elapsed >= settings.timeout) {
            clearInterval(waitInterval);
            settings.failFn();
        }

        if (settings.testFn()) {
            clearInterval(waitInterval);
            settings.successFn();
        }
        else {
            elapsed += settings.interval;
        }
    }, settings.interval);
}

(function() {
    const docsifyRunKit = function(hook, vm) {
        hook.init(function() {
            addEvents();
        });

        hook.ready(function() {
            waitFor({
                testFn() {
                    return window.RunKit;
                },
                failFn() {
                    // eslint-disable-next-line no-console
                    console.warn('docsify-plugin-runkit: RunKit not available');
                },
                successFn: init
            });
        });
    };

    // Append RunKit embed script
    const scriptElm = document.createElement('script');

    scriptElm.src = 'https://embed.runkit.com';
    document.body.appendChild(scriptElm);

    // Add plugin to docsify's plugin array
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [].concat(docsifyRunKit, window.$docsify.plugins || []);
})();
