var events = require('events');
var util = require('util');

util.inherits(Watcher, events.EventEmitter);

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var fs = require('fs');
var watchDir = './watch';
var processedDir = './done';
Watcher.prototype.watch = function () {
    var watcher = this;
    fs.readdir(this.watchDir, function (err, files) {
        console.log("lendo")
        if (err) throw err;
        console.log("arquivos:" + files);
        for (var index in files) {
            console.log("Index:" + index)
            watcher.emit('process', files[index]);
        }
    })
}

Watcher.prototype.start = function () {
    console.log("iniciando!");
    var watcher = this;
    fs.watchFile(watchDir, function () {
        watcher.watch();
    });
}

var watcher = new Watcher(watchDir, processedDir);

watcher.start();

watcher.on('process', function process(file) {
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();
    fs.rename(watchFile, processedFile, function (err) {
        if (err) throw err;
    });
});