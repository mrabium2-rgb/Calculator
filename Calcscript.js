let exp = document.getElementById("expression");
let result = document.getElementById("result");

const buttons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "/"];

// =============================
// UPDATE EXPRESSION SAFELY
// =============================
function updateExpression(value) {

    let currentExp = exp.value;
    let lastChar = currentExp.slice(-1);

    // Prevent starting with operator (except minus)
    if (currentExp === "" && operators.includes(value) && value !== "-") {
        return;
    }

    // Prevent double operators
    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    // Prevent double same operator
    if (operators.includes(lastChar) && value === lastChar) {
        return;
    }

    // Prevent multiple decimals in same number
    if (value === ".") {
        let parts = currentExp.split(/[\+\-\*\/\%]/);
        let lastNumber = parts[parts.length - 1];
        if (lastNumber.includes(".")) return;
    }

    exp.value += value;
}

// =============================
// CALCULATE
// =============================
function calculate() {
    try {
        let expression = exp.value;

        if (expression.trim() === "") {
            result.textContent = "Empty";
            return;
        }

        // ❌ prevent ending with real operators
        let lastChar = expression.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
            result.textContent = "Error";
            return;
        }

        // 🔥 convert percentage properly
        let safeExpression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

        let output = eval(safeExpression);

        if (!isFinite(output)) {
            result.textContent = "Error";
        } else {
            result.textContent = output;
        }

    } catch (error) {
        result.textContent = "Error";
    }
}

// =============================
// DELETE
// =============================
function deleteLast() {
    exp.value = exp.value.slice(0, -1);
}

// =============================
// CLEAR
// =============================
function clearExpression() {
    exp.value = "";
    result.textContent = "0";
}

// =============================
// EVENTS
// =============================

buttons.forEach(button => {
    button.addEventListener("click", () => {

        let value = button.getAttribute("data-value");

        // Safety check (VERY important)
        if (!value) return;

        if (value === "Clr") {
            clearExpression();
        }
        else if (value === "Del") {
            deleteLast();
        }
        else if (value === "=") {
            calculate();
        }
        else {
            updateExpression(value);
        }

    });
});