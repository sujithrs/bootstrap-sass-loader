var partials = [
  "mixins",

  "normalize",
  "print",

  "scaffolding",
  "type",
  "code",
  "grid",
  "tables",
  "forms",
  "buttons",

  "component-animations",
  "glyphicons",
  "dropdowns",
  "button-groups",
  "input-groups",
  "navs",
  "navbar",
  "breadcrumbs",
  "pagination",
  "pager",
  "labels",
  "badges",
  "jumbotron",
  "thumbnails",
  "alerts",
  "progress-bars",
  "media",
  "list-group",
  "panels",
  "wells",
  "close",

  "modals",
  "tooltip",
  "popovers",
  "carousel",

  "utilities",
  "responsive-utilities"
];
var path = require("path");
var pathToBootstrapSass = require.resolve("bootstrap-sass");
var fs = require('fs');
var path = require('path');

module.exports = function (content) {
  this.cacheable(true);
  var config = this.exec(content, this.resourcePath);
  var bootstrapCustomizations = config.bootstrapCustomizations;
  var start =
    "@import          \""+ path.join(pathToBootstrapSass, "stylesheets/bootstrap/variables") + "\";\n" +
    "$icon-font-path: \""+ path.join(pathToBootstrapSass, "fonts/bootstrap") + "\";\n";
  if (bootstrapCustomizations && fs.existsSync(bootstrapCustomizations)) {
    this.addDependency(bootstrapCustomizations);
    start += "@import          \"" + bootstrapCustomizations + "\";\n";
  }
  source = start + partials.filter(function (partial) {
    return config.styles[partial];
  }).map(function (partial) {
    return "@import \""+ path.join(pathToBootstrapSass, "stylesheets/bootstrap", partial) + "\";";
  }).join("\n");
  var mainSass = config.mainSass;
  if (mainSass && fs.existsSync(mainSass)) {
    this.addDependency(mainSass);
    source += "\n@import          \"" + mainSass + "\";\n";
  }

  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
  console.log("source is:\n" + source);
  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
  return source;
};
