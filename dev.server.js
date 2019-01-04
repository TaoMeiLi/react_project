const { resolve } = require('path');

exports.host = 'localhost'; //'127.0.0.1';
exports.public_host = 'localhost';//'10.0.130.222'; //a ip that can access by mobile device to debug
exports.port = 8080;
exports.mock_port = 8081;
exports.mock_path = resolve(__dirname, 'api');
exports.mock_prefix = '/managewxdc';