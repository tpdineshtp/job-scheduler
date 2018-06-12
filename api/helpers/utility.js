
var Utility = {

    // returns completion time for given job
    getCompletionTime: function(dependencies, current_jobs, jobStore, processor = null) {

      //for first N jobs, job's execution time is the completion time since the processors are un occupied
      if(current_jobs < 5) {
        max = 0.1;
        dependencies.forEach( (key) => {
          if(jobStore.get(key)) {
            if(parseFloat(jobStore.get(key).ct) > parseFloat(max))
              max = jobStore.get(key).ct;
          }
        });
      }

      //if not completion time is existing job's completion time + current job's execution time
      else {
        dependencies.forEach((key) => {
          if(jobStore.get(key)) {

            //if dependency job is running on another processors then parallely jobs can be done.
            //if not the current job should wait till exising dependency job to be completed.
            if(jobStore.get(key).processor == processor) {
              if(parseFloat(jobStore.get(key).ct) + parseFloat(this.getRandomFloat(1,5)) > parseFloat(max)) {
                max = jobStore.get(key).ct;
              }
            }
            else if(parseFloat(jobStore.get(key).ct) > parseFloat(max)) {
              max = jobStore.get(key).ct;
            }
          }
        })
      }
      return Math.max(parseFloat(this.getRandomFloat(1,5)), parseFloat(max));
    },

    // returns the processor that is going to complete the job soon.
    getNextProcessor: function(processorStore) {
      var proStore = processorStore.getStore(),
          result = [],
          min = 10.0,
          min_processor;

      Object.keys(proStore).every( (key) => result.push(key) );
      for(var i =0; i<result.length; i++) {
        if(parseFloat(min) > parseFloat(proStore[result[i]].occupied_time)) {
          min_processor = result[i];
          min = proStore[result[i]].occupied_time;
        }
      }
      return min_processor;
    },

    //returns random job execution time between 1 to 5;
    getRandomFloat: function(min, max) {
      return (Math.random() * (max - min) + min).toFixed(2);
    }
}

module.exports = Utility;
