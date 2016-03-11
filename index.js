#!/usr/bin/env node
var program = require('commander');
var ProgressBar = require('progress');
var chalk = require('chalk');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var fs = require('fs');

program
.arguments('<file>')
.option('-b, --bucket <bucket>', 'The bucket to upload to')
.action(function(file) {

	try {
		var fileSize = fs.statSync(file).size;
		var fileStream = fs.createReadStream(file);
	} catch(e) {
		console.log(chalk.bold.red('Oops! No such file or directory'));
		return false;
	}

	var file_name = file.split('/').pop();
	console.log(chalk.cyan('Uploading %s to bucket %s'), file_name, program.bucket);

	var barOpts = {
		width: 50,
		total: fileSize
	};

	var bar = new ProgressBar(' Uploading [:bar] :percent :etas', barOpts);

	var s3obj = new AWS.S3({params: {Bucket: program.bucket, ACL: 'public-read', Key: file_name.trim() }});
	s3obj.upload({Body: fileStream}).
	on('httpUploadProgress', function(evt) { 
		bar.tick(evt.loaded);
	}).send(function(err, data) {
		if(err) {
			console.log(err);
		} else {
			console.log(chalk.bold.green('Upload Completed!, '+ data.Location)); 
		}
	});
})
.parse(process.argv);