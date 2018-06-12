var SchedulerController = require('../api/controllers/schedulerController');

var Routes = function(app, jobStore, processorStore){

  this.app = app;
  this.max_processors = 5;
  this.current_jobs = 0;

  this.app.route('/health-check').get(function(req, res) {
    res.status(200);
    res.send('Hello World');
  });


  this.app.post('/job/schedule', function(req, res) {
    var job_name = req.body.job_name,
        deadline = req.body.deadline,
        dependencies = req.body.dependencies ? req.body.dependencies : null;

    SchedulerController.schedule(job_name,deadline,dependencies, this.max_processors, this.current_jobs, jobStore, processorStore, function(value) {
    if (!value) {
        return res.status(400).end('Job cannot be scheduleded');
    } else if(value) {
        this.max_processors--;
        this.current_jobs++;
        return res.status(200).end('Job scheduleded successfully');
    }
});
  });
}

module.exports = Routes;
