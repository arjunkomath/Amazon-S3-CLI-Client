#!/usr/bin/env node
var path = require('path')
var program = require('commander');
var ProgressBar = require('progress');
var chalk = require('chalk');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var fs = require('fs');
var mime = require('mime-types');
var homedir = require('homedir'); 
var co = require('co');
var prompt = require('co-prompt');

program
.version('0.0.4')
.arguments('<file>')
.option('-b, --bucket <bucket>', 'The bucket to upload to')
.action(function(file) {


	try {
		fs.accessSync(homedir()+'/.aws/credentials', fs.F_OK);
		try {
			var fileSize = fs.statSync(file).size;
			var fileStream = fs.createReadStream(file);
		} catch(e) {
			console.log(chalk.bold.red('Oops! No such file or directory'));
			return false;
		}

		var file_name = file.split('/').pop();
		var ext = path.extname(file_name);

		console.log(chalk.cyan('Uploading %s to bucket %s'), file_name, program.bucket);

		var barOpts = {
			width: 50,
			total: fileSize
		};
		var bar = new ProgressBar(' Uploading [:bar] :percent :etas', barOpts);

		var params = {
			params: {
				Bucket: program.bucket, 
				ACL: 'public-read', 
				Key: file_name.trim()
			}
		};

		if(mime.lookup(file_name)) 
			params.params.ContentType = mime.lookup(file_name);

		var s3obj = new AWS.S3(params);
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
	} catch (e) {
		console.log(chalk.bold.red('Oops! AWS config file is missing, Please check https://github.com/arjunkomath/Amazon-S3-CLI-Client#configure'));
	}


});

program
.command('configure')
.alias('config')
.description('Configure Cloud Push')
.action(function() {
	co(function *() {
		var key = yield prompt('IAM Key: ');
		var secret = yield prompt.password('IAM Secret: ');

		if(!key.trim() || secret.trim()) {
			console.log(chalk.bold.red('IAM Key and Secret are both mandatory!'));
			return false;
		}

		var body = "[default]\n";
		body += "aws_access_key_id = "+key+"\n";
		body += "aws_secret_access_key = "+secret;
		fs.writeFile(homedir()+'/.aws/credentials', body, function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("Config file saved");
		}); 
	});
});

program.parse(process.argv);