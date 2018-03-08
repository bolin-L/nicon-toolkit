<div align="center">
  <a href="icon.edu.netease.com" target="_blank">
    <img width="200" heigth="200" src="http://edu-image.nosdn.127.net/c76721ab-86ac-4c59-88c4-5a2468c578a5.png">
  </a>
  <br>
  <p align="left">
    neicon-tool is a util that fetches iconfont resource from neicon platform. Its main purpose is to reduce complication for usage when fetching iconfont resource from neicon platform
  <p>
</div>

## Install

```bash
npm install -g neicon-tool
```

## Getting Start

### Using a Configuration

Most projects will need a more complex setup, so neicon-tool supports a [configuration file](https://github.com/berlin-L/neicon-tool/blob/master/icon.config.example.js). This is more convenient and efficient that having to type in a lot of commands in the terminal.

**your project**

```
your-project
    | - bin
    | - src
    | - package.json
  + | - icon.config.js
    | - index.html
```

**icon.config.js**

```javascript
module.exports = [{
    "repoId": "37",
    "type": "cssUrl",
    "output": "./index.html",
    "tag": 'regex',
    "apiUrl": 'http://icon.bolin.site/api/repo/{repoId}/resource'
}]
```

### add a placeholder to your output file

```html
<link  name="cssUrl" href="replaceContent">
```

### Run command in terminal under your-project root path

```text
neicon-tool
```

### Finish
gst

```html
<link  name="cssUrl" href="//nos.netease.com/icon/dd7a8e7d8f00054c45e50c4e6c3778e8.css">
```

## Configuration

|Type|repoId|output|[tag]|[placeholder]|[apiUrl]|
|:--:|:----:|:----:|:--:|:---:|:--:|
|cssUrl|Number|file path|tag.cssUrl|palceholder.cssUrl| apiUrl.default |
|cssContent|Number|file path|tag.cssContent|palceholder.cssContent|apiUrl.default|
|cssFile|Number|file path|-|-|apiUrl.default|
|svg|Number|folder path|-|-|apiUrl.default|
|svgSpriteContent|Number|file path|tag.svgSpriteContent |palceholder. svgSpriteContent |apiUrl.default|

## default config
### apiUrl
default

```
http://icon.edu.netease.com/api/repo/{repoId}/resource
```

### tag
cssUrl

```
/<link(\s+rel="stylesheet")*\s+name="cssUrl"\s+href="(.*?)">/gm
```

cssContent

```
/<style(\s+type="text\/css")*\s+name="cssContent">((.|\t|\n)*?)<\/style>/gm
```
svgSpriteContent

```
/<div(\s+type="svgSprite")*\s+name="svgSpriteContent">((.|\t|\n)*?)<\/div>/gm
```

### placeholder
cssUrl

```
<link  name="cssUrl" href="replaceContent">
```

cssContent

```html
<style  name="cssContent">replaceContent</style>

```

svgSpriteContent

```html
<div name="svgSpriteContent">replaceContent</div>
```

## Nofice
if you want to use your `tag` property, You must follow the rules below

```
fileContent.replace(tag, function ($0, $1, $2) {
    return $0.replace($2, content);
});
```