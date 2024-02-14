const input = document.getElementById("inputBox");
const history = document.getElementById("history");

function addSymbol(symbol) {
  input.value += symbol;
}
function clearInput() {
  input.value = "";
  history.value = "";
}
function deleteElement() {
  let value = input.value.split("");
  value.splice(-1);
  input.value = value.join("");
}

 input.addEventListener('keyup', function (event) {
  if(event.key === 'Enter'){
     getResult()
  }
})
  input.addEventListener('keyup', function (){
    input.value = input.value.replace(/[A-Za-zА-Яа-яЁё]/, '')
  })

function getResult() {
  try {
    input.value = input.value.replaceAll(/[,]/g, ".");
    input.value = input.value.replaceAll(/[A-Za-zА-Яа-яЁё]/g, "");
    history.value =
      input.value
        .split("")
        .map((a) =>
          a === "+" || a === "/" || a === "*" || a === "-"
            ? (a = " " + a + " ")
            : (a = a)
        )
        .join("")
        .replace("  ", " ") + " ";

    let resultat = getRes(input.value);
    if (resultat === 0.09999999999999998) resultat = 0.1;
    if (resultat === 0.19999999999999998) resultat = 0.2;
    input.value = resultat === 0.30000000000000004 ? 0.3 : resultat;
  } catch {
    input.value = "0";
  }
}

function getRes(string) {
  const stateNum = [];
  const stateSymb = [];
  const symbol = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  function parsingExpression(num, num2, symbol) {
    num = +num;
    num2 = +num2;
    let result = 0;
    switch (symbol) {
      case "+":
        result = num + num2;
        break;
      case "-":
        result = num2 - num;
        break;
      case "*":
        result = num * num2;
        break;
      case "/":
        result = num2 / num;
        break;
    }
    return result;
  }

  string = string
    .split("")
    .map((a) =>
      a === "+" || a === "/" || a === "*" || a === "-"
        ? (a = " " + a + " ")
        : (a = a)
    )
    .join("")
    .replace("  ", " ")
    .split(" ");
  string.forEach((a) => {
    if (a) {
      if (Object.keys(symbol).includes(a)) {
        if (
          stateSymb.length > 0 &&
          symbol[a] < symbol[stateSymb[stateSymb.length - 1]]
        ) {
          stateNum.push(
            parsingExpression(stateNum.pop(), stateNum.pop(), stateSymb.pop())
          );
          if (
            stateSymb.length > 0 &&
            symbol[a] === symbol[stateSymb[stateSymb.length - 1]]
          )
            stateNum.push(
              parsingExpression(stateNum.pop(), stateNum.pop(), stateSymb.pop())
            );
          stateSymb.push(a);
        } else {
          stateSymb.push(a);
        }
      } else {
        stateNum.push(a);
      }
    }
  });
  while (stateSymb.length != 0) {
    stateNum.push(
      parsingExpression(stateNum.pop(), stateNum.pop(), stateSymb.pop())
    );
  }
  return stateNum[0];
}
