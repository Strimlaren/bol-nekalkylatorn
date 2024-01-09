"use strict";
const lånebelopp = document.querySelector("#lånebelopp");
const lånebelopp_field = document.querySelector("#lånebelopp-field");
const ränta = document.querySelector("#ränta");
const ränta_field = document.querySelector("#ränta-field");
const amortering = document.querySelector("#amorteringstid");
const amortering_field = document.querySelector("#amorteringstid-field");
// Update the current slider values
lånebelopp.oninput = () => {
    lånebelopp_field.value = lånebelopp.value;
};
ränta.oninput = () => {
    ränta_field.value = ränta.value;
};
amortering.oninput = () => {
    amortering_field.value = amortering.value;
};
lånebelopp_field.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        check_field(lånebelopp_field, lånebelopp);
});
lånebelopp_field.addEventListener("blur", () => check_field(lånebelopp_field, lånebelopp));
ränta_field.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        check_field(ränta_field, ränta);
});
ränta_field.addEventListener("blur", () => check_field(ränta_field, ränta));
amortering_field.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        check_field(amortering_field, amortering);
});
amortering_field.addEventListener("blur", () => check_field(amortering_field, amortering));
function check_field(node, slider) {
    if (is_valid_number(node.value)) {
        node.classList.remove("failed");
        slider.value = node.value;
        if (validate())
            calculate();
    }
    else
        node.classList.add("failed");
}
function validate() {
    if (is_valid_number(lånebelopp_field.value) &&
        is_valid_number(ränta_field.value) &&
        is_valid_number(amortering_field.value)) {
        calculate();
        return true;
    }
    else
        return false;
}
function is_valid_number(value) {
    return /^\d+(\.\d+)?$/.test(value);
}
function calculate() {
    console.log("Calculations were conducted.");
}
