var JobStore = function() {
    // private store object
    var store = {}

    // add / update an entry
    this.set = function(job_name, ct, deadline, processor, dependencies = []) {
        if (!job_name || !deadline || !ct || !processor) {
            throw Error("ArgumentException")
        }

        store[job_name] = {
            ct: ct,
            deadline: deadline,
            dependencies: dependencies,
            processor: processor
        }
    }

    // get the value for the input key
    this.get = function(job_name) {
        if (!job_name) {
            throw Error("ArgumentException")
        }

        if (job_name in store) return store[job_name];
        return null;
    }

    this.getStore = function() {
      return store;
    }

}

module.exports = JobStore;
