var Utility = require('../helpers/utility');

var SchedulerController = {

  schedule: function(job_name,deadline,dependencies,Max_processors, Current_jobs, jobStore, processorStore, callback) {


    var processor;

    if(Current_jobs < 5){
      var completion_time = Utility.getCompletionTime(dependencies,Current_jobs, jobStore);

      if(deadline<parseFloat(completion_time)) return callback(false);

      processor = Current_jobs;
      processorStore.set("Pro"+processor, completion_time);
      jobStore.set(job_name, completion_time, deadline, "Pro"+processor, dependencies);
      return callback(true)
    }
    else {
      processor = Utility.getNextProcessor(processorStore);
      var completion_time = Utility.getCompletionTime(dependencies,Current_jobs, jobStore, processor);
      const ctime = parseFloat(processorStore.get(processor)) + parseFloat(completion_time);
      if(ctime > deadline) return callback(false);

      processorStore.set(processor, ctime);
      jobStore.set(job_name, ctime, deadline, processor, dependencies);
      return callback(true)
    }

  }

}

module.exports = SchedulerController;
