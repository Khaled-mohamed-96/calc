let total = document.querySelector(".total");
let spans = document.querySelectorAll(".row span");
let doted = document.querySelector(".doted");
let timer;
spans.forEach((e) => {
  e.addEventListener("mousedown", () => {
    e.classList.add("clicked");
  });
  e.addEventListener("mouseup", () => {
    e.classList.remove("clicked");
  });
  e.addEventListener("click", (el) => {
    total.textContent += el.currentTarget.textContent;
    if (el.currentTarget.dataset.type === "format") {
      total.textContent = "";
    }
    if (el.currentTarget.dataset.type === "delate") {
      total.textContent = total.textContent.slice(0, -2);
    }
    if (el.currentTarget.dataset.type === "=") {
      total.textContent = total.textContent.slice(0, -1);
      try {
        total.textContent = eval(total.textContent);
      } catch {
        total.textContent = "Error";
      }
    }
  });
});

document.body.addEventListener("mousedown", (e) => {});
document.addEventListener("mouseup", () => {
  clearInterval(timer);
});
document.addEventListener("keydown", (e) => {
  if (/[0-9]/.test(e.key)) {
    total.textContent += e.key;
  }
  if (/[-+*/]/.test(e.key)) {
    total.textContent += e.key;
  }
  if (e.key === "Backspace") {
    total.textContent = total.textContent.slice(0, -1);
  }
  if (e.key === "Enter" || e.key === "=") {
    try {
      total.textContent = calculateExpression(total.textContent);
    } catch {
      total.textContent = "Error";
    }
  }
  if (e.key === "Delete") {
    total.textContent = "";
  }
});

function calculateExpression(expression) {
  let numbers = [];
  let operators = [];
  let currentNum = "";

  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];

    if ("0123456789.".includes(char)) {
      currentNum += char;
    } else if ("+-*/".includes(char)) {
      numbers.push(parseFloat(currentNum));
      operators.push(char);
      currentNum = "";
    }
  }

  if (currentNum) {
    numbers.push(parseFloat(currentNum));
  }

  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let nextNum = numbers[i + 1];

    if (operator === "+") result += nextNum;
    if (operator === "-") result -= nextNum;
    if (operator === "*") result *= nextNum;
    if (operator === "/")
      result = nextNum === 0 ? "Cannot divide by 0" : result / nextNum;
  }

  return result;
}
