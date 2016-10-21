// Dependencias
var request = require('request'),
  fs = require('fs'),
  colors = require('colors'),
  fastsync = require('fastsync'),
  opts = require('nomnom').parse();

if (!opts.files || !opts.interval || !opts.limit) {
  console.log("Faltan parametros".yellow.bold);
  return;
}

// Variables de prueba
var files = opts.files.split(','),
  interval = opts.interval,
  limit = opts.limit,
  out = opts.out;

// Archivo de salida
fs.writeFile(out, 'Time,' + opts.files);

// Inicio de intervalo
var total = 0;
setInterval(function() {
  // Revisar si se alcanzó el límite
  total++;
  if (total > limit) {
    console.log("Benchmark completo!".green.bold);
    process.exit();
    return;
  }
  var output = fs.readFileSync(out, 'utf-8') + '\n' + new Date();

  // Iteramos por los archivos uno a la vez
  fastsync.seriesMap(files, function(file, fn) {
    var start = process.hrtime();
    request({
      url: file,
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    }, function() {
      var diff = process.hrtime(start);
      var seconds = (diff[0] * 1e9 + diff[1]) / 1e9;
      output += ',' + seconds;

      fn(null);
    });
  }, function() {
    fs.writeFile(out, output);
  });
}, interval * 1000);

// Create a method to get high resolution time.
var now = function() {
  var hrtime = process.hrtime();
  return hrtime[0] * 1000000 + hrtime[1] / 1000;
};

console.log(("Benchmark iniciado: " + limit + " " + interval + " intervalo en segundos.").cyan);