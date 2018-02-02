load("../cooperativeThreads.js");

function make_thread_thunk(name, thread_system) {
    function loop() {
      for(let i=0; i < 5; i++) {
        print('in thread',name,'; i =',i);
        thread_system.relinquish();
	  }
      thread_system.quit();
    };
    return loop;
}
var thread_sys =  make_thread_system();
thread_sys.spawn(make_thread_thunk('a', thread_sys));
thread_sys.spawn(make_thread_thunk('b', thread_sys));
thread_sys.spawn(make_thread_thunk('c', thread_sys));
thread_sys.start_threads();