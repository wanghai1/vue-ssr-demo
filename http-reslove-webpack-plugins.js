var path = require("path");
var fs = require("fs-extra");
var assign = require("object-assign");
var basename = require("enhanced-resolve/lib/getPaths").basename; // webpack 内置模块
var http = require("http");
var server_dist = "server_dist";

module.exports = function (options) {
  // TODO basePath  结尾追加 '/'
  return {
    apply: doApply.bind(this, options),
  };
};

var fetch_write_File = (options, resolver, target, request, resolveContext, callback) => {
  var fileName = request.request.replace("@http", "");
  var fil_path = path.resolve(__dirname, `./${server_dist}${fileName}`);
  if (!fs.pathExistsSync(fil_path)) {
    fs.ensureFileSync(fil_path); // 确保目录存在
    var writerStream = fs.createWriteStream(fil_path);
    http
      .get(options.basePath + fileName, function (req, res) {
        req.pipe(writerStream);
        writerStream.on("finish", function () {
          var obj = assign({}, request, {
            request: fil_path,
          });
          console.log("ddd", path.resolve(__dirname, "./output.vue"));
          return resolver.doResolve(target, obj, null, resolveContext, callback);
        });
      })
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
      });
  }else{
    var obj = assign({}, request, {
      request: fil_path,
    });
    console.log("resole_local", path.resolve(__dirname, "./output.vue"));
    return resolver.doResolve(target, obj, null, resolveContext, callback);
  }
};

function doApply(options, resolver) {
  var target = resolver.ensureHook("resolve");

  resolver
    .getHook("resolve")
    .tapAsync(
      "HttpResolverWebpackPlugin",
      function (request, resolveContext, callback) {
        // TODO 匹配规则 需从options中取
        if (/^@http/.test(request.request)) {
          fetch_write_File(options,resolver, target, request, resolveContext, callback);
        }else{
          callback();
        }
      }
    );
}
