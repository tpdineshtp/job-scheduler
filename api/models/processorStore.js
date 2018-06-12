var ProcessorStore = function() {
    // private store object
    var store = {}

    // add / update an entry
    this.set = function(processor, occupied_time) {
        if (!processor || !occupied_time) {
            throw Error("ArgumentException")
        }

        store[processor] = {
          occupied_time: occupied_time
        }
    }

    // get the value for the input key
    this.get = function(processor) {
        if (!processor) {
            throw Error("ArgumentException")
        }

        if (processor in store) return store[processor].occupied_time;
        return 0;
    }

    this.getStore = function(){
      return store;
    }

}

module.exports = ProcessorStore;
