var Utility = {

    // method to get current timestamp
    getCompletionTime: function(dependencies, current_jobs, jobStore, processor = null) {
      if(current_jobs<5){
        max = 0.1;
        dependencies.forEach((key)=>{
          if(jobStore.get(key)){
            if(parseFloat(jobStore.get(key).ct) > parseFloat(max))
              max = jobStore.get(key).ct;
          }
        })
      }
      else {
        dependencies.forEach((key)=>{
          if(jobStore.get(key)){
            if(jobStore.get(key).processor == processor){
              if(parseFloat(jobStore.get(key).ct) + parseFloat(this.getRandomFloat(1,5)) > parseFloat(max)){
                max = jobStore.get(key).ct;
              }
            }
            else if(parseFloat(jobStore.get(key).ct) > parseFloat(max)){
              max = jobStore.get(key).ct;
            }
          }
        })
      }
      return Math.max(parseFloat(this.getRandomFloat(1,5)), parseFloat(max));
    },

    getNextProcessor: function(processorStore) {
      var proStore = processorStore.getStore();
      var result=[],
          min = 10.0,min_processor;
      Object.keys(proStore).every((key)=> result.push(key));
      for(var i =0;i<result.length;i++){
        if(parseFloat(min) > parseFloat(proStore[result[i]].occupied_time)){
          min_processor = result[i];
          min = proStore[result[i]].occupied_time;
        }
      }
      return min_processor
    },

    getRandomFloat: function(min, max) {
      return (Math.random() * (max - min) + min).toFixed(2);
    }
}

module.exports = Utility;
