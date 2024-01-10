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
const generate_table_button = document.querySelector("button");
generate_table_button.addEventListener("click", () => generate_table());
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
];
/* Update the current slider values. No type validation is required here
because we are using values from sliders which user cannot interfere with. */
lånebelopp.oninput = () => {
    lånebelopp_field.value = lånebelopp.value;
    update_values();
};
ränta.oninput = () => {
    ränta_field.value = ränta.value;
    update_values();
};
amortering.oninput = () => {
    amortering_field.value = amortering.value;
    update_values();
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
        update_values();
    }
}
// Check if a string from input element contains a valid integer/float
function is_valid_number(value) {
    return /^\d+(\.\d+)?$/.test(value);
}
// Calculates the monthly payments amount
function calculate_M() {
    const P = Number(lånebelopp_field.value);
    const r = Number(ränta_field.value) / 1200;
    const n = Number(amortering_field.value) * 12;
    const täljare = r * (1 + r) ** n;
    const nämnare = (1 + r) ** n - 1;
    const kvot = P * (täljare / nämnare);
    return [kvot, P, n];
}
// Updates all values on the GUI
function update_values() {
    const values = calculate_M();
    const M = Number(values[0].toFixed(0)).toLocaleString();
    if (ränta_field.value === "0") {
        stats_månadskonstnad.innerText = Number((values[1] / values[2]).toFixed(0)).toLocaleString();
    }
    else
        stats_månadskonstnad.innerText = M;
    stats_lånebelopp.innerText = Number(lånebelopp_field.value).toLocaleString();
    stats_ränta.innerText = "?";
}
function generate_table() {
    update_values();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    console.log(month, year);
    table.innerHTML = `<tr>
                      <th>År, Mån</th>
                      <th>Betalning #</th>
                      <th>Skuld</th>
                      <th>Amortering</th>
                      <th>Ränta</th>
                      <th>Att betala</th>
                    </tr>`;
    const values = calculate_M();
    let skuld = Number(lånebelopp_field.value);
    let ränta = (skuld * Number(ränta_field.value)) / 1200;
    let amortering = values[0] - ränta;
    let iteration = 1;
    let total_ränta = 0;
    while (skuld > 0) {
        // const currentYear = date.getFullYear();
        // const currentMonth = date.getMonth() + 1; // Adding 1 to get the correct month
        const currentYear = 2024;
        const currentMonth = 0;
        // Do something with the current year and month
        // console.log("Year:", currentYear, "Month:", currentMonth);
        // Update the date to the next month
        date.setMonth(date.getMonth() + 1);
        table.innerHTML += `<tr>
                    <td>${currentYear}, ${currentMonth}</td>
                    <td>${iteration}</td>
                    <td>${Number(skuld.toFixed(0)).toLocaleString()}</td>
                    <td>${Number(amortering.toFixed(0)).toLocaleString()}</td>
                    <td>${Number(ränta.toFixed(0)).toLocaleString()}</td>
                    <td>${Number(values[0].toFixed(0)).toLocaleString()}</td>
                  </tr>`;
        skuld -= values[0];
        total_ränta += ränta;
        ränta = (skuld * Number(ränta_field.value)) / 1200;
        amortering = values[0] - ränta;
        iteration++;
    }
    stats_ränta.innerText = Number(total_ränta.toFixed()).toLocaleString();
    total_kostnad.innerText = Number((total_ränta + Number(lånebelopp_field.value)).toFixed()).toLocaleString();
}
