module.exports = {
    apiUrl: 'http://icon.bolin.site/api/repo/{repoId}/resource',
    reg: {
        cssUrl: /<link(\s+rel="stylesheet")*\s+name="cssUrl"\s+href="(.*?)">/gm,
        cssContent: /<style(\s+type="text\/css")*\s+name="cssContent">((.|\t|\n)*?)<\/style>/gm,
        svgSpriteContent: /<div(\s+type="svgSprite")*\s+name="svgSpriteContent">((.|\t|\n)*?)<\/div>/gm,
    }
}