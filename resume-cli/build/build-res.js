#!/usr/bin/env node

// debug
process.argv.forEach((val, index, array) => {
  console.log(`${index}: ${val}`);
});

// requires
var fs = require("fs");
var jade = require("../node_modules/jade");
var merge = require("../node_modules/merge");
var minimatch = require("../node_modules/minimatch");

// file paths
var dataDir = "src/data";
var templateDir = "src/templates";
var outputDir = "output"
var filename = process.argv[2] || "resume"; // TODO validate input!

// json data
var dataFiles = fs.readdirSync(dataDir);
var data = {
        theme: filename,
        fonts: ""
    };

//console.log(dataFiles);

// for all the json files, merge its data into massive data obj
for(var i = 0; i < dataFiles.length; i++) {
	var file = dataFiles[i];
	var isJson = minimatch(file, "*.json", {matchBase: true});
	
	//console.log(file + " " + isJson);
	
	if (isJson) {
		//console.log("merging: " + file);
		//console.log(fs.readFileSync(dataDir + "/" + file, "utf-8"));
		merge(data, JSON.parse(fs.readFileSync(dataDir + "/" + file, "utf-8")));
	}
}

//console.log(data);

// compile the template first
// this allows us to reuse the same compilation with different, possibly changing dataset
var templateFile = templateDir + "/"+ filename + "/" + filename + ".jade";
var compiled = jade.compileFile(templateFile, {
	filename: templateFile,
	pretty: true,
	debug: false
});

// write to file the generated html
fs.writeFileSync(outputDir + "/"+filename+".html", compiled(data));