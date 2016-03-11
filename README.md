# Amazon-S3-CLI-Client
A command line tool for uploading files to S3

## Install
```
npm install cloud-push -g
```
## Configure
Create a credentials file at ~/.aws/credentials on Mac/Linux or C:\Users\USERNAME\.aws\credentials on Windows
```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```
## Upload a file to S3
```
$cloud-push [options] <file>

Options:

    -h, --help             output usage information
    -b, --bucket <bucket>  The bucket to upload to
```

### Example
```
cloud-push -b test-cli myFile.png
```

### About Author
* Built with <3 by [Arjun Komath](https://twitter.com/arjunz) / [arjunkomath@gmail.com](mailto:arjunkomath@gmail.com)
