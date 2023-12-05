// Containers
const mainContainer = document.querySelector("#demo-container");
const stepOneContainer = mainContainer.querySelector("#step-1");
const stepTwoContainer = mainContainer.querySelector("#step-2");
const stepThreeContainer = mainContainer.querySelector("#step-3");
const stepFourContainer = mainContainer.querySelector("#step-4");
const stepFiveContainer = mainContainer.querySelector("#step-5");
const stepSixContainer = mainContainer.querySelector("#step-6");

// Buttons
const stepOneButton = mainContainer.querySelector("#goto-step-2");
const stepFourButton = mainContainer.querySelector("#goto-step-4");
const stepFiveButton = mainContainer.querySelector("#goto-step-5");

// Flatfile
const openFlatfileButton = mainContainer.querySelector("#openFlatfile");
const flatfileContainer = mainContainer.querySelector("#flatfileContainer");

const cardContainer = mainContainer.querySelector("#demo-cards-container");

// Counters & Listeners
window.counters = {
  customerCommitsInternal: 0,
  customerListener: function (val) {},
  set customerCommits(val) {
    this.customerCommitsInternal = val;
    this.customerListener(val);
  },
  get customerCommits() {
    return this.customerCommitsInternal;
  },
  registerCustomerListener: function (listener) {
    this.customerListener = listener;
  },

  repairCommitsInternal: 0,
  repairListener: function (val) {},
  set repairCommits(val) {
    this.repairCommitsInternal = val;
    this.repairListener(val);
  },
  get repairCommits() {
    return this.repairCommitsInternal;
  },
  registerRepairListener: function (listener) {
    this.repairListener = listener;
  },

  submissionsInternal: 0,
  submissionListener: function (val) {},
  set submissions(val) {
    this.submissionsInternal = val;
    this.submissionListener(val);
  },
  get submissions() {
    return this.submissionsInternal;
  },
  registersubmissionListener: function (listener) {
    this.submissionListener = listener;
  },
};

window.counters.registerCustomerListener((val) => {
  if (val >= 3) {
    stepTwoContainer.classList.remove("currentStep");
    stepThreeContainer.classList.add("currentStep");
  }
});

window.counters.registerRepairListener((val) => {
  stepFiveButton.removeAttribute("disabled");
});

window.counters.registersubmissionListener((val) => {
  stepFiveContainer.classList.remove("currentStep");
  if (!window.flatfileResponseData) return;
  const { flatfileResponseData } = window;
  const cards = [];

  for (let i = 0; i <= 5; i++) {
    const customer = flatfileResponseData[0].records[i];
    const customerId = customer.values.customerId.value;
    const repairs = flatfileResponseData[1].records.filter((r) => {
      return r?.values?.customerId?.value === customerId;
    });
    let total = 0;
    repairs.forEach((r) => {
      total += parseFloat(r.values.totalCostOfRepairs.value);
    });
    let card = `<div class="demo-card">`;
    const cardHeader = `
      <div class="demo-card-header">
        ${customer.values.firstName.value} ${customer.values.lastName.value}
      </div>
    `;
    const cardBody = `
      <div class="demo-card-body">
        <p>Email Address: ${customer.values.email.value}</p>
        <p>Phone Number: ${customer.values.phone.value}</p>
        <p>Address: ${customer.values.street.value}, ${customer.values.city.value}, ${customer.values.state.value}, ${customer.values.zip.value}</p>
        <p>Total Repairs: $${total}</p>
      </div>
    `;

    card += cardHeader;
    card += cardBody;
    card += "</div>";
    cards.push(card);
  }
  const cardsContainer = stepSixContainer.querySelector(
    "#demo-cards-container",
  );
  cardsContainer.innerHTML = `${cards.join("")}`;
  stepSixContainer.classList.add("currentStep");
  flatfileContainer.classList.remove("currentStep");
});

// Events
stepOneButton.addEventListener("click", () => {
  stepOneContainer.classList.remove("currentStep");
  stepTwoContainer.classList.add("currentStep");
});

openFlatfileButton.addEventListener("click", () => {
  flatfileContainer.classList.add("currentStep");
  openFlatfileButton.setAttribute("disabled", true);
  openFlatfileButton.innerText = "Flatfile Opened";
  window.openFlatfile();
});

stepFourButton.addEventListener("click", () => {
  stepThreeContainer.classList.remove("currentStep");
  stepFourContainer.classList.add("currentStep");
});

stepFiveButton.addEventListener("click", () => {
  stepFourContainer.classList.remove("currentStep");
  stepFiveContainer.classList.add("currentStep");
});
