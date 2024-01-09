"use strict";
const lånebelopp = document.querySelector("#lånebelopp");
const lånebelopp_field = document.querySelector("#lånebelopp-field");
const ränta = document.querySelector("#ränta");
const ränta_field = document.querySelector("#ränta-field");
const amortering = document.querySelector("#amorteringstid");
const amortering_field = document.querySelector("#amorteringstid-field");
lånebelopp_field.value = lånebelopp.value;
ränta_field.value = ränta.value;
amortering_field.value = ränta.value;
// Update the current slider value (each time you drag the slider handle)
lånebelopp.oninput = () => {
    lånebelopp_field.value = lånebelopp.value;
};
ränta.oninput = () => {
    ränta_field.value = ränta.value;
};
amortering.oninput = () => {
    amortering_field.value = amortering.value;
};
