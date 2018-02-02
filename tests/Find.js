load("../cooperativeThreads.js");

var db = ['x','a','a','x','b','c','c','x'];
var pos = 0;

function make_thread_thunk(name, thread_system) {
  function search() {
    var last_pos_checked = -1;
    var result = [];
    while (pos < db.length) {
      var output = 'thread searching for '+ name +' ; ';

      if (last_pos_checked == pos) {
        print('Looking at the same position again, so this value is not being searched for');
        pos++;
        if (pos == db.length) {
          print('The value "',name,'" appears ', result.length, ' time(s), in the following position(s): ', result);
          thread_system.quit();
        }
      }

      last_pos_checked = pos;
      if (name == db[pos]) {
        output += 'Found in position = '+ pos;
        result.push(pos);
        pos++;
      }
      else {
        output += 'Not found in position = '+ pos;
      }

      print(output);
      thread_system.relinquish();
    }
    print('The value "',name,'" appears ',result.length,' time(s), in the following position(s): ', result);
    thread_system.quit();
  };
  return search;
}

var thread_sys = make_thread_system();
thread_sys.spawn(make_thread_thunk('a', thread_sys));
thread_sys.spawn(make_thread_thunk('b', thread_sys));
thread_sys.spawn(make_thread_thunk('c', thread_sys));
thread_sys.start_threads();