---
title: Vue Calculator
date: 2024-01-11
category: IDATT2105 - Fullstack development
---

Our second assignment for web development was to create a calculator using Vue. As I already had 
designed this very website as preparation for this class, this was a trivial task. To get the assignment
confirmed, I utilized the JavaScript `eval()` function to evaluate the string expression. This is unsafe
as `eval()` executes its input as JavaScript code, and should not be used in production.

    function unsafeCalculateExample() {
        output.value = eval(input.value);
    }  

To ensure safe user input, I have "hardcoded" the operators to only work with two numbers at a time.

    function safeCalculateExample() {
        switch (currentOperation.value) {
            case "+": output.value += parseFloat(input.value); break;
            case "-": output.value -= parseFloat(input.value); break;
            case "*": output.value *= parseFloat(input.value); break;
            case "/": output.value /= parseFloat(input.value); break;
        }
    }

