load("../cooperativeThreads.js");

var counter = 10;

function make_thread_thunk(name, thread_system) {
  function loop() {
    if (counter < 0) {
      thread_system.quit();
    }
    print('in thread', name, '; counter =', counter);
    counter--;
    thread_system.relinquish();
    loop();
  };
  return loop;
}

var thread_sys = make_thread_system();
thread_sys.spawn(make_thread_thunk('a', thread_sys));
thread_sys.spawn(make_thread_thunk('b', thread_sys));
thread_sys.spawn(make_thread_thunk('c', thread_sys));
thread_sys.start_threads();