const lånebelopp = document.querySelector("#lånebelopp") as HTMLInputElement;
const lånebelopp_field = document.querySelector(
  "#lånebelopp-field"
) as HTMLInputElement;
const ränta = document.querySelector("#ränta") as HTMLInputElement;
const ränta_field = document.querySelector("#ränta-field") as HTMLInputElement;
const amortering = document.querySelector(
  "#amorteringstid"
) as HTMLInputElement;
const amortering_field = document.querySelector(
  "#amorteringstid-field"
) as HTMLInputElement;

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
