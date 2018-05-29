var PATH = require("path");
var FS = require("q-io/fs");
var exec = require("./exec");

module.exports = Minit;
function Minit(path) {
    this._path = path;
}

Minit.prototype.createApp = function(path, name) {
    console.log(path + "$ create:digit -n " + name);
    return exec(this._path, ["create:digit", "-n", name], path);
};

Minit.prototype.createComponent = function(path, name, destination) {
    var args = ["create:component", "-n", name];
    if (destination) {
        args.push("-d");
        args.push(destination);
    }
    console.log(path + "$ " + args);
    return exec(this._path, args, path);
};

Minit.prototype.createModule = function(path, name, extendsModuleId, extendsName, destination) {
    var args = ["create:module", "-n", name];
    if (extendsModuleId && extendsName) {
        args.push("--extends-module-id", extendsModuleId);
        args.push("--extends-name", extendsName);
    }
    if (destination) {
        args.push("-d");
        args.push(destination);
    }
    console.log(path + "$ " + args);
    return exec(this._path, args, path);
};
