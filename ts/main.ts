// HTML Elements
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
const total_kostnad = document.querySelector(
  ".total-lånekostnad"
) as HTMLElement;

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
  if (event.key === "Enter") check_field(lånebelopp_field, lånebelopp);
});
lånebelopp_field.addEventListener("blur", () =>
  check_field(lånebelopp_field, lånebelopp)
);

ränta_field.addEventListener("keydown", (event) => {
  if (event.key === "Enter") check_field(ränta_field, ränta);
});
ränta_field.addEventListener("blur", () => check_field(ränta_field, ränta));

amortering_field.addEventListener("keydown", (event) => {
  if (event.key === "Enter") check_field(amortering_field, amortering);
});
amortering_field.addEventListener("blur", () =>
  check_field(amortering_field, amortering)
);

/* Checks if individual field(s) contain valid numbers. Do calculation if 
all other fields are also valid */
function check_field(field: HTMLInputElement, slider: HTMLInputElement): void {
  if (is_valid_number(field.value)) {
    field.classList.remove("failed");

    if (Number(field.value) > Number(field.getAttribute("max")))
      field.value = String(field.getAttribute("max"));
    else if (Number(field.value) < Number(field.getAttribute("min")))
      field.value = String(field.getAttribute("min"));
    slider.value = field.value;
    validate();
  } else field.classList.add("failed");
}

// Checks if all fields contain valid numbers
function validate(): void {
  if (
    is_valid_number(lånebelopp_field.value) &&
    is_valid_number(ränta_field.value) &&
    is_valid_number(amortering_field.value)
  ) {
    calculate();
  }
}

// Check if a string from input element contains a valid integer/float
function is_valid_number(value: string): boolean {
  return /^\d+(\.\d+)?$/.test(value);
}

function calculate(): void {
  console.log("Calculations were conducted.");

  const P: number = Number(lånebelopp_field.value);
  const r: number = Number(ränta_field.value) / 1200;
  const n: number = Number(amortering_field.value) * 12;

  const täljare: number = r * (1 + r) ** n;
  const nämnare: number = (1 + r) ** n - 1;

  const M: string = Number(
    (P * (täljare / nämnare)).toFixed(0)
  ).toLocaleString();

  if (ränta_field.value === "0")
    total_kostnad.innerText = Number((P / n).toFixed(0)).toLocaleString();
  else total_kostnad.innerText = M;
}
