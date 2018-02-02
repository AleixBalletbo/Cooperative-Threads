load("../cooperativeThreads.js");

var round = 0;
var completed = false;
var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

function tic_tac_toe(player, thread_system) {
  function finish() {
    completed = true;
    thread_system.quit();
  }

  function validate() {
    if (completed) thread_system.quit();
    if (4 < round < 9) {
      for (i = 0; i < 3; i++) {
        if (board[i * 3] !== " " && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2]) {
          print(board[i * 3], 'wins this match! Horizontal', i + 1);
          finish();
        }
        if (board[i] !== " " && board[i] === board[i + 3] && board[i] === board[i + 6]) {
          print(board[i], 'wins this match! Vertical', i + 1);
          finish();
        }
      }
      if (board[0] !== " " && board[0] === board[4] && board[0] === board[8]) {
        print(board[0], 'wins this match! Diagonal 1');
        finish();
      }
      if (board[2] !== " " && board[2] === board[4] && board[2] === board[6]) {
        print(board[2], 'wins this match! Diagonal 2');
        finish();
      }
    }
    if (round === 9) {
      print('Draw!');
      finish();
    }
  }

  function paint() {
    print(board[0] + '|' + board[1] + '|' + board[2]);
    print('-+-+-');
    print(board[3] + '|' + board[4] + '|' + board[5]);
    print('-+-+-');
    print(board[6] + '|' + board[7] + '|' + board[8]);
    print('\n');
  }

  function play() {
    if (!completed) paint();
    validate();

    print(player + '\'s turn:');
    var place = Math.floor(Math.random() * 9);
    while (board[place] !== " ") {
      place = Math.floor(Math.random() * 9);
    }
    board[place] = player;
    round++;
    thread_system.relinquish();
    play();
  }
  return play;
}

var thread_sys = make_thread_system();
thread_sys.spawn(tic_tac_toe('X', thread_sys));
thread_sys.spawn(tic_tac_toe('O', thread_sys));
thread_sys.start_threads();