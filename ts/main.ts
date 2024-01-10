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
const stats_månadskonstnad = document.querySelector(
  "#stats-månadskostnad"
) as HTMLElement;
const stats_ränta = document.querySelector("#stats-ränta") as HTMLElement;
const stats_lånebelopp = document.querySelector(
  "#stats-lånebelopp"
) as HTMLElement;
const table = document.querySelector("#details-table") as HTMLElement;
const generate_table_button = document.querySelector(
  "button"
) as HTMLButtonElement;

generate_table_button.addEventListener("click", () => generate_table());

const months: string[] = [
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
  if (event.key === "Enter") check_field(lånebelopp_field, lånebelopp);
});
lånebelopp_field.addEventListener("blur", () => {
  check_field(lånebelopp_field, lånebelopp);
});

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
    update_values();
  }
}

// Check if a string from input element contains a valid integer/float
function is_valid_number(value: string): boolean {
  return /^\d+(\.\d+)?$/.test(value);
}

// Calculates the monthly payments amount
function calculate_M(): number[] {
  const P: number = Number(lånebelopp_field.value);
  const r: number = Number(ränta_field.value) / 1200;
  const n: number = Number(amortering_field.value) * 12;

  const täljare: number = r * (1 + r) ** n;
  const nämnare: number = (1 + r) ** n - 1;
  const kvot: number = nämnare !== 0 ? P * (täljare / nämnare) : P / n;

  return [kvot, P, n];
}

// Updates all values on the GUI
function update_values(): void {
  const values: number[] = calculate_M();
  const M: string = Number(values[0].toFixed(0)).toLocaleString();

  if (ränta_field.value === "0") {
    stats_månadskonstnad.innerText = Number(
      (values[1] / values[2]).toFixed(0)
    ).toLocaleString();
  } else stats_månadskonstnad.innerText = M;

  stats_lånebelopp.innerText = Number(lånebelopp_field.value).toLocaleString();
  stats_ränta.innerText = "?";
}

function generate_table(): void {
  update_values();
  const date: Date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  table.innerHTML = `<tr>
                      <th>År, Mån</th>
                      <th>Betalning #</th>
                      <th>Skuld</th>
                      <th>Amortering</th>
                      <th>Ränta</th>
                      <th>Att betala</th>
                    </tr>`;

  const values: number[] = calculate_M();
  let skuld: number = Number(lånebelopp_field.value);
  let ränta: number = (skuld * Number(ränta_field.value)) / 1200;
  let amortering: number = values[0] - ränta;
  let iteration: number = 1;
  let total_ränta: number = 0;

  while (skuld > 0) {
    table.innerHTML += `<tr>
                    <td>${year}, ${months[month]}</td>
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
    month++;
    if (month === 12) {
      month = 0;
      year++;
    }
  }
  const pie = document.querySelector(".pie") as HTMLDivElement;
  const percentage: number =
    100 -
    Number(
      (
        (total_ränta / Number(total_ränta + Number(lånebelopp_field.value))) *
        100
      ).toFixed(0)
    );

  // const forceReflow = pie.offsetHeight;
  pie.style.backgroundImage = `conic-gradient(teal ${percentage}%, orangered ${percentage}%)`;

  stats_ränta.innerText = Number(total_ränta.toFixed()).toLocaleString();
  total_kostnad.innerText = Number(
    (total_ränta + Number(lånebelopp_field.value)).toFixed()
  ).toLocaleString();
}
