#!/usr/bin/env node

// requires
var stylus = require("../node_modules/stylus");
var fs = require("fs");

// file paths
var stylDir = "src/styles";
var outputDir = "output";
var filename = process.argv[2] || "resume"; //TODO: validate input!

var input = stylDir + "/" + filename + ".styl";
console.log(input);
stylus(fs.readFileSync(input, "utf-8").replace(/\r/g, '').trim())
	.set("filename", input)
	.render(function(err, css) {
		err && console.error(err);
		//console.log(css);
		fs.writeFileSync(outputDir + "/" + filename + ".css", css);
	});
	//.include(require("nib").path)
