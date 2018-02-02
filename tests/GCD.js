load("../cooperativeThreads.js");

function gcd(name, a, b, thread_sys) {

  function euclides() {
    print(name, '=> gcd(', a, ',', b, ') needs another round?');
    if (b != 0) {
      print('     Yes, so we are going to relinquish! \n');
      thread_sys.relinquish();
      print(name, 'starts another round with gcd(', b, ',', a % b, ')');
      var c = b;
      b = a % b;
      a = c;
      euclides();
    } else {
      print('     No, so the gcd is', a, '\n');
      thread_sys.quit();
    }
  };
  return euclides;
}

var thread_sys = make_thread_system();
thread_sys.spawn(gcd('a', 2366, 273, thread_sys));
thread_sys.spawn(gcd('b', 310, 710, thread_sys));
thread_sys.spawn(gcd('c', 28, 14, thread_sys));
thread_sys.spawn(gcd('d', 999, 4, thread_sys));
print('We are using the Euclidean algorithm to find each gcd.\n');
thread_sys.start_threads();