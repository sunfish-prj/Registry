'use strict';

// output service configuration
var config = require('config');
var out_service_name = config.get('out-service.name');

var db_utils = require('../utils/dbUtils.js');



/**
 * Storing a key-value pair 
 *
 * putSpec Put-request-body Body in JSON
 * returns response
 **/
exports.putPOST = function (putSpec) {
	var message = {};
	return new Promise(function (resolve, reject) {
		
		if (out_service_name == 'mongo') {
			db_utils.db_put(putSpec, function (res) {
				if (Object.keys(res).length > 0) {
					message = JSON.stringify({ "message": res });
					console.log(message);
					resolve(message);
				} else {
					reject(message);
				}
			});
		}

		if (out_service_name == 'fabric') {
			hl_utils.hl_put(putSpec, function (res) {
				if (Object.keys(res).length > 0) {
					message = JSON.stringify({ "message": res });
					console.log(message);
					resolve(message);
				} else {
					reject(message);
				}
			});
		}

	});
}
