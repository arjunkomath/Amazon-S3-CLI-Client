# Amazon-S3-CLI-Client
A command line tool for uploading files to S3

[![NPM](https://nodei.co/npm/cloud-push.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cloud-push/)

## Install
```
npm install cloud-push -g
```
## Configure

### Automatic
Run `cloud-push configure` and it will prompt to enter IAM key and secret. The config file will be automatically created.

### Manual
Create a credentials file at ~/.aws/credentials on Mac/Linux or C:\Users\USERNAME\.aws\credentials on Windows
```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```
## Upload a file to S3
```
Usage: cloud-push [options] [command] <file>

  Commands:

    configure|config   Configure Cloud Push

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -b, --bucket <bucket>  The bucket to upload to
```

### Example
```
cloud-push -b test-cli myFile.png
```

### Known Issues
- [Several new lines after progress bar](https://github.com/tj/node-progress/issues/123)

### Contribute
Feature Request, Bugs and Ideas can be added [here.](https://github.com/arjunkomath/Amazon-S3-CLI-Client/issues)

### About Author
* Built with <3 by [Arjun Komath](https://twitter.com/arjunz) / [arjunkomath@gmail.com](mailto:arjunkomath@gmail.com)
