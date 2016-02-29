var minify = Npm.require('html-minifier').minify;
var marked = Npm.require('marked');

Plugin.registerSourceHandler('ng.md', {
  isTemplate: true,
  archMatching: 'web'
}, function(compileStep) {

  var contents = compileStep.read().toString('utf8');

  marked.setOptions({
    gfm: true
  });

  contents = marked(contents)

  var newPath = compileStep.inputPath;
  newPath = newPath.replace(/\\/g, "/");
  newPath = newPath.replace(".ng.md", ".html");

  var results = 'angular.module(\'angular-meteor\').run([\'$templateCache\', function($templateCache) {' +
    '$templateCache.put(\'' + newPath + '\', \'' +
      minify(contents.replace(/'/g, "\\'"), {
        collapseWhitespace : true,
        conservativeCollapse : true,
        removeComments : true,
        minifyJS : true,
        minifyCSS: true,
        processScripts : ['text/ng-template']
      }) + '\');' +
    '}]);';

  compileStep.addJavaScript({
    path : newPath,
    data : results.replace(/\n/g, '\\n'),
    sourcePath : compileStep.inputPath
  });
});
