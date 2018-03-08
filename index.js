let path = require('path');
let config = require('./config');
let fs = require('fs');
let axios = require('axios');
let rimraf = require('rimraf');
let mkdirp = require('mkdirp');
let program = require('./bin/cli');

let configFilePath = path.resolve(program.config || 'icon.config.js');
console.log('config file path ' + configFilePath);
let iconRepoConfig = [];
try {
    iconRepoConfig = require(configFilePath) || {};
} catch (e) {
    throw new Error('missing icon.config.js');
}

let handle = {
    sendRequest: function (item) {
        console.log('send request to ' + item.url);
        axios.get(item.url, {
            params: {
                type: item.type === "cssFile" ? "cssContent" : item.type
            }
        }).then(function (result) {
            if (result.status === 200 && result.data.code === 200) {
                let tag = item.tag || config.reg[item.type];
                handle[item.type] ?  handle[item.type](result.data.result, item.output)
                    : handle.replaceTagWithContent(result.data.result, tag, item.output);
            } else {
                throw new Error('request error' + JSON.stringify(result));
            }
        })
    },
    // replace specific file tag with cssUrl or cssContent
    replaceTagWithContent: function (content, tag, filePath) {
        console.log('replace file ' + filePath);
        let fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
        fileContent = fileContent.replace(tag, function ($0, $1, $2) {
            return $0.replace($2, content);
        });
        fs.writeFileSync(filePath, fileContent);
    },
    // generate all svg files into dirPath
    svg: function (icons, dirPath) {
        console.log('get icons tatal: ' + icons.length);
        // delete dirPath
        rimraf(dirPath, function () {
            mkdirp(dirPath, function (err) {
                if (err) {
                    throw new Error(err);
                } else {
                    for (let i = 0; i < icons.length; i++) {
                        let svgPath = path.join(dirPath, icons[i].iconName + '.svg');
                        fs.writeFileSync(svgPath, icons[i].iconContent, {flag: 'w+'});
                    }
                }
            });
        })
    },
    cssFile: function (content, filePath) {
        // delete dirPath
        fs.writeFileSync(filePath, content, {flag: 'w'});
    }
};

function startGetIcon() {
    console.log('start get icon');
    let reg0 = /\{(.*?)\}/gi;

    for (let i = 0; i < iconRepoConfig.length; i++) {
        iconRepoConfig[i].url = (iconRepoConfig[i].apiUrl || config.apiUrl).replace(reg0, function ($0, $1) {
            return iconRepoConfig[i][$1] ? iconRepoConfig[i][$1] : $0
        });
        handle.sendRequest(iconRepoConfig[i]);
    }
}

module.exports = startGetIcon;
