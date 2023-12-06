// Containers
const mainContainer = document.querySelector("#demo-container");
// const stepOneContainer = mainContainer.querySelector("#step-1");
// const stepTwoContainer = mainContainer.querySelector("#step-2");
// const stepThreeContainer = mainContainer.querySelector("#step-3");
// const stepFourContainer = mainContainer.querySelector("#step-4");
// const stepFiveContainer = mainContainer.querySelector("#step-5");
// const stepSixContainer = mainContainer.querySelector("#step-6");

// Buttons
// const stepOneButton = mainContainer.querySelector("#goto-step-2");
// const stepFourButton = mainContainer.querySelector("#goto-step-4");
// const stepFiveButton = mainContainer.querySelector("#goto-step-5");

// Flatfile
const openFlatfileButton = mainContainer.querySelector("#openFlatfile");
const flatfileContainer = mainContainer.querySelector("#flatfileContainer");

// const cardContainer = mainContainer.querySelector("#demo-cards-container");

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
  if (val === 1) {
    window.toasts.showStepThreeToasts();
  }
  if (val >= 3) {
    // stepTwoContainer.classList.remove("currentStep");
    // stepThreeContainer.classList.add("currentStep");
    window.toasts.hideStepTwoToasts();
    window.toasts.hideStepThreeToasts();
    window.toasts.showStepFourToasts();
    setTimeout(window.toasts.hideStepFourToasts, 3000);
    setTimeout(window.toasts.showStepFiveToasts, 3000);
  }
});

window.counters.registerRepairListener((val) => {
  // stepFiveButton.removeAttribute("disabled");
  window.toasts.hideStepFiveToasts();
  window.toasts.showStepSixToasts();
});

window.counters.registersubmissionListener((val) => {
  // stepFiveContainer.classList.remove("currentStep");
  if (!window.flatfileResponseData) return;
  window.toasts.hideAllToasts();
  window.toasts.showStepSevenToasts();
  const { flatfileResponseData } = window;
  const cards = [];
  const length = Math.min(6, flatfileResponseData[0].records.length);
  if (length <= 0) throw { message: "no customers found" };
  for (let i = 0; i < length; i++) {
    const customer = flatfileResponseData[0].records[i];
    const customerId = customer.values.customerId.value;
    const repairs = flatfileResponseData[1].records.filter((r) => {
      return r?.values?.customerId?.value === customerId;
    });
    let total = 0;
    if (repairs.length >= 0) {
      repairs.forEach((r) => {
        total += parseFloat(r.values.totalCostOfRepairs.value);
      });
    }
    const name =
      customer.values.firstName.value + " " + customer.values.lastName.value;
    const email = customer.values.email.value;
    const phone = customer.values.phone?.value || "N/A";
    const address = `${
      customer.values.street?.value ? customer.values.street?.value + "," : ""
    } ${customer.values.city?.value ? customer.values.city?.value + "," : ""} ${
      customer.values.state?.value ? customer.values.state?.value + "," : ""
    } ${customer.values.zip?.value ? customer.values.zip?.value : ""}`;

    let card = `<div class="demo-card">`;
    const cardHeader = `
      <div class="demo-card-header">
        ${name}
      </div>
    `;
    const cardBody = `
      <div class="demo-card-body">
        <p>Email Address: ${email}</p>
        <p>Phone Number: ${phone}</p>
        <p>Address: ${address.trim() === "" ? "N/A" : address}</p>
        <p>Total Repairs: $${total}</p>
      </div>
    `;

    card += cardHeader;
    card += cardBody;
    card += "</div>";
    cards.push(card);
  }
  const cardsContainer = mainContainer.querySelector("#demo-cards-container");
  cardsContainer.innerHTML = `${cards.join("")}`;
  document
    .querySelectorAll(".currentStep")
    .forEach((el) => el.classList.remove("currentStep"));
  cardsContainer.classList.add("currentStep");
});

window.toasts.showStepOneToasts();

// Events
// stepOneButton.addEventListener("click", () => {
//   console.log("test");
//   stepOneContainer.classList.remove("currentStep");
//   stepTwoContainer.classList.add("currentStep");
// });
openFlatfileButton.addEventListener("click", () => {
  flatfileContainer.classList.add("currentStep");
  openFlatfileButton.setAttribute("disabled", true);
  openFlatfileButton.innerText = "Flatfile Opened";
  window.toasts.hideStepOneToasts();
  window.toasts.showStepTwoToasts();
  window.openFlatfile();
});

// stepFourButton.addEventListener("click", () => {
//   stepThreeContainer.classList.remove("currentStep");
//   stepFourContainer.classList.add("currentStep");
// });

// stepFiveButton.addEventListener("click", () => {
//   stepFourContainer.classList.remove("currentStep");
//   stepFiveContainer.classList.add("currentStep");
// });
