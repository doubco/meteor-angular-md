Package.describe({
  name: "doubco:meteor-angular-md",
  summary: "Compiles markdown files into angular templates",
  version: "0.0.1",
  git: "https://github.com/doubco/meteor-angular-md.git"
});

Package.registerBuildPlugin({
  name: "compileMarkdownAngular",
  sources: [
    'plugin.js'
  ],
  npmDependencies : {
    'html-minifier': '0.7.2',
    'marked': '0.3.5'
  }
});
