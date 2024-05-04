const images = document.querySelector("#img-stickers");
const round = document.querySelector("#round");
const score = document.querySelector("#score");
const completed = document.querySelector("#completed");
const timer = document.querySelector("#timer");
const questionBoard = document.querySelector("#question");
const playButton = document.querySelector("#play-button");
const gamePage = document.querySelector("#game-page");
const mainPage = document.querySelector("#main-page");
const bestScore = document.querySelector("#best-score");
const bestCompleted = document.querySelector("#best-completed");
const submitBtn = document.querySelector("#submit-btn");
const correctToaster = document.querySelector("#correct-toaster");
const wrongToaster = document.querySelector("#wrong-toaster");
const noAnswerToaster = document.querySelector("#no-answer-toaster");
const resultFailedPage = document.querySelector("#result-page-failed");
const resultSuccessPage = document.querySelector("#result-page-success");
const recordSide = document.querySelector("#answer-and-question-page");
const questionAndAns = [
  {
    question:
      "A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.",
    answer: "ALGORITHM",
  },
  {
    question: "A way to store multiple values in one variable",
    answer: "ARRAY",
  },
  {
    question: "A low-level programming language",
    answer: "ASSEMBLY",
  },
  {
    question: "Allows code reusability",
    answer: "FUNCTION",
  },
  {
    question: "Executes code line by line",
    answer: "INTERPRETER",
  },
  {
    question: "Translates code into machine language",
    answer: "COMPILER",
  },
  {
    question: "A hierarchical data structure",
    answer: "TREE",
  },
  {
    question: "Sorting technique with worst case O(n^2)",
    answer: "BUBBLESORT",
  },
  {
    question: "A technique to optimize code",
    answer: "MEMOIZATION",
  },
  {
    question:
      "Is the practice of bundling data with the methods that operate on that data, or limiting direct access to some of that data.",
    answer: "ENCAPSULATION",
  },
  {
    question: "Represents true or false",
    answer: "BOOLEAN",
  },
  {
    question:
      "Is a core concept of object-oriented programming (OOP) that allows programmers to reuse and extend existing classes without modifying them.",
    answer: "INHERITANCE",
  },
  {
    question: "Which data structure uses LIFO (Last In First Out) principle",
    answer: "STACK",
  },
  {
    question: "Which data structure uses FIFO (First In First Out) principle",
    answer: "QUEUE",
  },
  {
    question:
      "A sequence of characters, digits, or symbols that's used to represent text.",
    answer: "STRING",
  },
];
const imgs = [
  "./images/default.png",
  "./images/first-wrong.png",
  "./images/second-wrong.png",
  "./images/third-wrong.png",
  "./images/fourth-wrong.png",
  "./images/fifth-wrong.png",
];
const progress = {
  score: 0,
  round: 1,
  completed: 0,
  wrong: 0,
};

//To detect and ask the user if he/she want to refresh the page.
// function refreshPage(e) {
//   e.preventDefault();
// }
// window.addEventListener("beforeunload", refreshPage);

//Lets create a reusable function to shuffle the questions or answers when the user want to play a game

function shuffledFunc(args, isForAnswer) {
  //We are using a Fisher Yates Algorithm to shuffle the array like object
  for (let i = args.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [args[random], args[i]] = [args[i], args[random]];
  }
  if (isForAnswer) {
    return args.join("");
  }
  return;
}
//This function is to display the question

function questionAndAnswer(isNext) {
  const shuffledAnswerPage = document.querySelector("#shuffled-answer");
  const allLetters = document.querySelectorAll(".answer-block");
  let answer = questionAndAns[progress.round].answer;
  answer = shuffledFunc(answer.split(""), true);
  questionBoard.textContent = questionAndAns[progress.round].question;
  localStorage.setItem("progress", JSON.stringify(progress));
  if (isNext && progress.round >= 1) {
    allLetters.forEach((letter) => {
      shuffledAnswerPage.removeChild(letter);
    });
  }
  for (let i = 0; i < answer.length; i++) {
    const createDivsBlock = document.createElement("div");
    createDivsBlock.classList.add("answer-block");
    createDivsBlock.textContent = answer[i];
    shuffledAnswerPage.appendChild(createDivsBlock);
  }
}
// }
//This function is use when the user click the next button
function refreshTimer() {
  timer.textContent = 30;
  time = 30;
}
function showResult() {
  const getStorage = JSON.parse(localStorage.getItem("progress"));
  if (progress.wrong >= 5) {
    resultFailedPage.style.display = "flex";
    recordSide.style.display = "none";
  }
  if (progress.completed >= 15) {
    resultSuccessPage.style.display = "flex";
    recordSide.style.display = "none";
  }
  return;
}

function resetGame() {
  localStorage.setItem("progress", JSON.stringify(progress));
  progress.round = 0;
  progress.completed = 0;
  progress.score = 0;
  progress.wrong = 0;
}
function nextRound(e) {
  const inputAns = document.querySelector("input").value;
  if (inputAns.toUpperCase() === questionAndAns[progress.round].answer) {
    correctToaster.style.display = "flex";
    progress.score += 100;
    progress.completed++;
    score.textContent = progress.score;
    completed.textContent = `${progress.completed}/15`;
  } else if (!inputAns) {
    noAnswerToaster.style.display = "flex";
    progress.wrong++;
    images.src = imgs[progress.wrong];
  } else if (inputAns.toUpperCase() !== questionAndAns[progress.round].answer) {
    wrongToaster.style.display = "flex";
    progress.wrong++;
    images.src = imgs[progress.wrong];
  }
  setTimeout(() => {
    correctToaster.style.display = "none";
    wrongToaster.style.display = "none";
    noAnswerToaster.style.display = "none";
  }, 1000);
  progress.round++;
  questionAndAnswer(true);
  round.textContent = `${progress.round}/15`;
  refreshTimer();
  showResult();
}

let time = 30;
let interval;
function startPlay() {
  mainPage.style.display = "none";
  gamePage.style.display = "flex";
  shuffledFunc(questionAndAns, false);
  questionAndAnswer(false);

  interval = setInterval(() => {
    time--;
    timer.textContent = time;
    if (time < 0) {
      nextRound();
      refreshTimer();
    }
  }, 1000);
}
submitBtn.addEventListener("click", nextRound);
playButton.addEventListener("click", startPlay);
//Lets create a timer;
