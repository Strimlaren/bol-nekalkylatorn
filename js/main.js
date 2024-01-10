"use strict";
// HTML Elements
const lånebelopp = document.querySelector("#lånebelopp");
const lånebelopp_field = document.querySelector("#lånebelopp-field");
const ränta = document.querySelector("#ränta");
const ränta_field = document.querySelector("#ränta-field");
const amortering = document.querySelector("#amorteringstid");
const amortering_field = document.querySelector("#amorteringstid-field");
const total_kostnad = document.querySelector(".total-lånekostnad");
const stats_månadskonstnad = document.querySelector("#stats-månadskostnad");
const stats_ränta = document.querySelector("#stats-ränta");
const stats_lånebelopp = document.querySelector("#stats-lånebelopp");
const table = document.querySelector("#details-table");
/* Update the current slider values. No type validation is required here
because we are using values from sliders which user cannot interfere with. */
lånebelopp.oninput = () => {
    lånebelopp_field.value = lånebelopp.value;
    calculate();
};
ränta.oninput = () => {
    ränta_field.value = ränta.value;
    calculate();
};
amortering.oninput = () => {
    amortering_field.value = amortering.value;
    calculate();
};
/* Eventlitseners for all three text input fields on enter and lose focus. */
lånebelopp_field.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        check_field(lånebelopp_field, lånebelopp);
});
lånebelopp_field.addEventListener("blur", () => {
    check_field(lånebelopp_field, lånebelopp);
});
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
/* Checks if individual field(s) contain valid numbers. Do calculation if
all other fields are also valid */
function check_field(field, slider) {
    if (is_valid_number(field.value)) {
        field.classList.remove("failed");
        if (Number(field.value) > Number(field.getAttribute("max")))
            field.value = String(field.getAttribute("max"));
        else if (Number(field.value) < Number(field.getAttribute("min")))
            field.value = String(field.getAttribute("min"));
        slider.value = field.value;
        validate();
    }
    else
        field.classList.add("failed");
}
// Checks if all fields contain valid numbers
function validate() {
    if (is_valid_number(lånebelopp_field.value) &&
        is_valid_number(ränta_field.value) &&
        is_valid_number(amortering_field.value)) {
        calculate();
    }
}
// Check if a string from input element contains a valid integer/float
function is_valid_number(value) {
    return /^\d+(\.\d+)?$/.test(value);
}
function calculate() {
    console.log("Calculations were conducted.");
    table.innerHTML += `<tr>
                <td>2013</td>
                <td>1</td>
                <td>600000</td>
                <td>8800</td>
                <td>2500</td>
                <td>11300</td>
              </tr>`;
    const P = Number(lånebelopp_field.value);
    const r = Number(ränta_field.value) / 1200;
    const n = Number(amortering_field.value) * 12;
    const täljare = r * (1 + r) ** n;
    const nämnare = (1 + r) ** n - 1;
    const M = Number((P * (täljare / nämnare)).toFixed(0)).toLocaleString();
    if (ränta_field.value === "0") {
        stats_månadskonstnad.innerText = Number((P / n).toFixed(0)).toLocaleString();
    }
    else
        stats_månadskonstnad.innerText = M;
    stats_lånebelopp.innerText = Number(lånebelopp_field.value).toLocaleString();
    /* Details-code */
}
