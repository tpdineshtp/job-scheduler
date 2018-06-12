var Utility = require('../helpers/utility');

var SchedulerController = {

  schedule: function(job_name,deadline,dependencies,Max_processors,
    Current_jobs, jobStore, processorStore, callback) {

    var processor;

    //first N jobs can be assigned to N processor initially since the processors are not occupied.
    if(Current_jobs < 5) {
      var completion_time = Utility.getCompletionTime(dependencies,Current_jobs, jobStore);

      //job cannot be scheduled if deadline is sooner than completion_time
      if( deadline < parseFloat(completion_time) ) {
        return callback(false);
      }

      processor = Current_jobs;
      processorStore.set("Pro"+processor, completion_time);
      jobStore.set(job_name, completion_time, deadline, "Pro"+processor, dependencies);
      return callback(true)
    }

    //if not the get the processor that nearly going to complete the existing job and assign the current job
    else {
      processor = Utility.getNextProcessor(processorStore);
      var completion_time = Utility.getCompletionTime(dependencies,Current_jobs, jobStore, processor);
      const ctime = parseFloat( processorStore.get(processor) ) + parseFloat(completion_time);

      // check completion time with deadline
      if(ctime > deadline) {
        return callback(false);
      }
      processorStore.set(processor, ctime);
      jobStore.set(job_name, ctime, deadline, processor, dependencies);
      return callback(true)
    }

  }

}

module.exports = SchedulerController;
