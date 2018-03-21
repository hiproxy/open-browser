# open-browser
Open browser window and set proxy

# Install

```bash
npm install op-browser --save
```

# Usage

```js
const openBrowser = require('op-browser');

// Automatic proxy selection
openBrowser.open('chrome', 'https://google.com', 'http://127.0.0.1:8800', '');
// Proxy auto-configuration (PAC)
openBrowser.open('chrome', 'https://google.com', '', 'http://127.0.0.1:8800/proxy.pac');
```

# API

<a name="op-browser"></a>

## op-browser : <code>object</code>
Browser

**Kind**: global namespace  

* [op-browser](#op-browser) : <code>object</code>
    * [.open(browser, url, proxyURL, pacFileURL)](#op-browser.open) ⇒ <code>Promise</code>
    * [.detect(name)](#op-browser.detect) ⇒ <code>Promise</code>

<a name="op-browser.open"></a>

### op-browser.open(browser, url, proxyURL, pacFileURL, bypassList) ⇒ <code>Promise</code>
open browser window, if the `pacFileURL` is not empty, will use `proxy auto-configuration`

**Kind**: static method of [<code>op-browser</code>](#op-browser)  

| Param | Type | Description |
| --- | --- | --- |
| browser | <code>String</code> | the browser's name |
| url | <code>String</code> | the url that to open |
| proxyURL | <code>String</code> | the proxy url, format: `http://<hostname>[:[port]]` |
| pacFileURL | <code>String</code> | the proxy url, format: `http://<hostname>[:[port]]/[pac-file-name]` |
| bypassList | <code>String</code> | the list of hosts for whom we bypass proxy settings and use direct connections, See: "[net/proxy/proxy_bypass_rules.h](https://cs.chromium.org/chromium/src/net/proxy_resolution/proxy_bypass_rules.h?sq=package:chromium&type=cs)" for the format of these rules |

<a name="op-browser.detect"></a>

### op-browser.detect(name) ⇒ <code>Promise</code>
detect browser, return the browser's path

**Kind**: static method of [<code>op-browser</code>](#op-browser)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the browser name |

