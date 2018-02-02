load("../cooperativeThreads.js");

var dividend = 1234;
var divisor = 34;
var quotient = 0;
var finished = false
//Exemple divisió de nombres positius sense / o %.
function make_thread_thunk (name, thread_sys) {
  function div() {
    if (finished) {
      thread_sys.quit();
    }
    else if (dividend >= divisor){
      var output = name + ': ' + dividend + ' - ' + divisor + ' = ';
      dividend -= divisor;
      print(output, dividend);
      quotient++;
      thread_sys.relinquish();
      div();
    }
    else {
        print(name, ': Result: quotient = ', quotient, ' remainder = ', dividend);
        finished = true;
        thread_sys.quit();
    }
  }
  return div;
}

var thread_sys = make_thread_system();
thread_sys.spawn(make_thread_thunk('a', thread_sys));
thread_sys.spawn(make_thread_thunk('b', thread_sys));
thread_sys.spawn(make_thread_thunk('c', thread_sys));
thread_sys.start_threads();