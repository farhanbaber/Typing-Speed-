let timer = document.getElementById("timer");
let timerMins = document.getElementById("timerMins");
let para = document.getElementById("para");
let input = document.getElementById("input");
let result = document.getElementById("result");

let totalTimes = 60;
let timeLeft = totalTimes;
let intervalId = null;
let originalText = para.textContent;
let typedChars = 0;
let correctChars = 0;

para.innerHTML = originalText
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");

let spanChars = para.querySelectorAll("span");
input.addEventListener("input", () => {
    if (intervalId === null) {
        intervalId = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                timeLeft = 0;
                timer.textContent = timeLeft + " sec ";
                clearInterval(intervalId);
                input.disabled = true;
                showResult();
                return;
            }
            timer.textContent = timeLeft + " sec ";
            timerMins.textContent = ": " + Math.floor((totalTimes - timeLeft) / 60) + " Mins";
        }, 1000);
    }

    // Typing check + highlighting
    let typedText = input.value;
    typedChars = typedText.length;
    correctChars = 0;

    spanChars.forEach((span, index) => {
        let char = typedText[index];
        if (char == null) {
            span.style.backgroundColor = "";
        } else if (char === originalText[index]) {
            span.style.backgroundColor = "lightgreen";
            correctChars++;
        } else {
            span.style.backgroundColor = "salmon";
        }
    });
});
function showResult() {
    let errors = typedChars - correctChars;
    let accuracy = typedChars > 0 ? ((correctChars / typedChars) * 100).toFixed(2) : 0;
    let wpm = ((typedChars / 5) / (totalTimes / 60)).toFixed(2);

    // Direct input me result dikhana
    result.value = `WPM: ${wpm} | Accuracy: ${accuracy}% | Errors: ${errors}`;
}
