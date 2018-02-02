function current_continuation() {
  return new Continuation();
}

function make_thread_system() {
  var threads_queue = [];
  var current_thread = null;

  var halt;

  return {
  	spawn : function (thunk) {
  	  var cc = current_continuation();
  	  if (cc instanceof Continuation) {
  	  	threads_queue.push(cc);
  	  }
  	  else {
  	  	thunk();
  	    quit();
  	  }
  	},
  	quit : function () {
  	  if (threads_queue.length > 0) {
	    current_thread = threads_queue.shift();
	    current_thread();
      }
      else {
        halt();
      }
  	},
  	relinquish : function () {
	  var cc = current_continuation();
	  if ((cc instanceof Continuation) && threads_queue.length > 0) {
	    current_thread = threads_queue.shift();
	    threads_queue.push(cc);
	    current_thread();
	  }
  	},
  	start_threads : function () {
  	  var cc = current_continuation();
  	  if (cc instanceof Continuation) {
  	  	halt = function () {
  	  	  cc();
  	  	}
  	  	if (threads_queue.length > 0) {
  	  	  current_thread = threads_queue.shift();
	        current_thread();
  	  	}
  	  }
  	}
  };
};