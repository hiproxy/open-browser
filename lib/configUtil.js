/**
 * @file
 * @author zdying
 */
'use strict';

var fs = require('fs');
var path = require('path');
var urlParser = require('url');
var childProcess = require('child_process');

module.exports = {
  chrome: function (dataDir, url, chromePath, proxyURL, pacFileURL, bypassList) {
    // List of Chromium Command Line Switches
    // https://peter.sh/experiments/chromium-command-line-switches/
    var proxyOption = pacFileURL
      ? '--proxy-pac-url=' + pacFileURL
      : '--proxy-server=' + proxyURL;

    bypassList = bypassList === undefined ? '<local>' : bypassList;

    dataDir = path.resolve(path.join(dataDir, 'chrome-cache'));

    return [
      // '--proxy-pac-url="' + proxy + '"',
      // '--proxy-server="' + proxy + '"',
      proxyOption,
      '--proxy-bypass-list=' + bypassList,
      '--user-data-dir=' + dataDir,
      '--lang=local',
      url
    ];
  },

  opera: function (dataDir, url, operaPath, proxyURL, pacFileURL, bypassList) {
    var proxyOption = pacFileURL
      ? '--proxy-pac-url=' + pacFileURL
      : '--proxy-server=' + proxyURL + '';

    bypassList = bypassList === undefined ? '<local>' : bypassList;

    dataDir = path.resolve(path.join(dataDir, 'opera-cache'));

    return [
      proxyOption,
      '--proxy-bypass-list=' + bypassList,
      '--user-data-dir=' + dataDir,
      '--lang=local',
      url
    ];
  },

  safari: function (dataDir, url, safariPath, proxy) {
    return '';
  },

  firefox: function (dataDir, url, firefoxPath, proxyURL, pacFileURL, bypassList) {
    // Firefox pac set
    // http://www.indexdata.com/connector-platform/enginedoc/proxy-auto.html
    // http://kb.mozillazine.org/Network.proxy.autoconfig_url
    // user_pref("network.proxy.autoconfig_url", "http://us2.indexdata.com:9005/id/cf.pac");
    // user_pref("network.proxy.type", 2);

    var dir = path.join(dataDir, 'firefox-cache');
    var prefsPath = path.join(dir, 'prefs.js');
    var prefs = [];

    bypassList = bypassList === undefined ? 'localhost, 127.0.0.1, ::1' : bypassList;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (!fs.existsSync(prefsPath)) {
      if (pacFileURL) {
        // 自动代理
        prefs = [
          'user_pref("network.proxy.autoconfig_url", "' + pacFileURL + '");',
          'user_pref("network.proxy.type", 2);'
        ];
      } else {
        // 直接代理
        var urlObj = urlParser.parse(proxyURL);
        prefs = [
          'user_pref("network.proxy.http", "' + urlObj.hostname + '");',
          'user_pref("network.proxy.http_port", ' + urlObj.port + ');',
          'user_pref("network.proxy.type", 1);',
          'user_pref("network.proxy.no_proxies_on", "' + bypassList + '")'
        ];
      }

      // https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options
      childProcess.execFileSync(path.resolve(firefoxPath), [
        '-CreateProfile',
        '"firefox_op_browser_pref ' + path.resolve(dir) + '"'
      ]);
      fs.writeFileSync(prefsPath, prefs.join('\n'));
    }

    return [
      '-P',
      'firefox_op_browser_pref',
      '-no-remote',
      '--new-instance',
      url
    ];
  }
};
