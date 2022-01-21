function trackScore(clicked_id) {
  let curWord = document.getElementById("word").textContent;

  if (clicked_id == "good") {
    words.push({ word: curWord, good: true });
    good++;
  }
  if (clicked_id == "bad") {
    words.push({ word: curWord, good: false });
    bad++;
  }

  let time = parseInt(document.getElementById("timer").textContent);
  if (time === 0) {
    showScore();
  } else {
    loadWord();
  }

  function showScore() {
    btnEnable(false);
    // let score = good + " - " + bad + " = " + (good - bad);
    // document.getElementById("word").textContent = score;

    document.getElementById("word").textContent = "Surinkti taškai: " + good;

    good = 0;
    bad = 0;
    words = [];

    resetGame();
  }
}

function loadWord() {
  var locked = false;

  if (!locked) {
    locked = true;

    btnEnable(false);

    getNewCard();
    setTimeout(unlock, 2000);
  }

  function unlock() {
    locked = false;
    btnEnable(true);
  }

  function getNewCard() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      document.getElementById("word").textContent = JSON.parse(
        this.responseText
      );
    };
    xhttp.open("GET", "/_new_card", true);
    xhttp.send();
  }
}

var good = 0;
var bad = 0;
var words = [];

function btnEnable(bool) {
  let good = document.getElementById("good");
  let bad = document.getElementById("bad");
  if (bool === true) {
    good.classList.remove("btn-disabled");
    bad.classList.remove("btn-disabled");
    good.disabled = false;
    bad.disabled = false;
  } else if (bool === false) {
    good.classList.add("btn-disabled", "fade-in");
    bad.classList.add("btn-disabled", "fade-in");
    good.disabled = true;
    bad.disabled = true;
  }
}

function startGame() {
  var sec = 60;

  let good = document.getElementById("good");
  let bad = document.getElementById("bad");
  let timer = document.getElementById("timer");
  let start = document.getElementById("start");

  timer.textContent = sec;

  good.style.display = "";
  bad.style.display = "";
  timer.style.display = "";
  start.style.display = "none";

  good.disabled = true;
  bad.disabled = true;

  startTimer(sec);
}

function resetGame() {
  let good = document.getElementById("good");
  let bad = document.getElementById("bad");
  let timer = document.getElementById("timer");
  let start = document.getElementById("start");
  start.textContent = "Iš naujo";

  function waitForSec() {
    start.classList.add("btn-disabled");
    start.disabled = true;

    setTimeout(unlock, 2000);

    function unlock() {
      start.disabled = false;
      start.classList.remove("btn-disabled");
    }
  }

  good.style.display = "none";
  bad.style.display = "none";
  timer.style.display = "none";
  start.style.display = "";

  waitForSec();

  document.getElementById("timer").classList.remove("last-word");
  document.getElementById("word").classList.remove("last-word");
}

function startTimer(sec) {
  var rdy = 1;

  loadWord();

  function startRdyTimer() {
    document.getElementById("word").classList.add("fade-in");

    function updateRdyTimer() {
      rdy--;
      if (rdy === 0) {
        stopRdyTimer();
        startRealTimer();
      }
    }
    function stopRdyTimer() {
      clearInterval(rdyInterval);
    }

    var rdyInterval = setInterval(updateRdyTimer, 1000);
  }

  function startRealTimer() {
    function updateRealTimer() {
      sec--;
      document.getElementById("timer").textContent = sec;
      if (sec === 0) {
        stopRealTimer();
      } else if (sec === 3) {
        document.getElementById("word").classList.remove("fade-in");
        document.getElementById("timer").classList.add("last-word");
        document.getElementById("word").classList.add("last-word");
      }
    }
    function stopRealTimer() {
      clearInterval(timerInterval);
    }
    var timerInterval = setInterval(updateRealTimer, 1000);
  }

  startRdyTimer();
}
