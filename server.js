/**
 * Module dependencies.
 */
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    Routes = require('./routes/routes'),
    JobStore = require('./api/models/jobStore'),
    ProcessorStore = require('./api/models/processorStore');

/**
 *  Server Configuration
 */
var Server = function() {

    app = express();
    var port = process.env.PORT || 8000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(morgan('dev'));


    function initializeRoutes() {
      Routes(app,  new JobStore(), new ProcessorStore());
    }

    this.bind = function(callback) {
        app.listen(port, function () {
            console.log('Job scheduler server started on: ' + port);
            if (callback) callback();
        });
    };

    // Initialize the process - bind to the port
    this.bind(function() {
        initializeRoutes();
    });
}

module.exports = Server;
