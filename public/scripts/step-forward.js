const stepOneContainer = document.querySelector("#step-1");
const stepOneButton = document.querySelector("#goto-step-2");
const stepTwoContainer = document.querySelector("#step-2");
const stepThreeContainer = document.querySelector("#step-3");
const stepFourContainer = document.querySelector("#step-4");

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
};

window.counters.registerCustomerListener((val) => {
  if (val >= 3) {
    stepTwoContainer.classList.remove("currentStep");
    stepThreeContainer.classList.add("currentStep");
  }
});

const stepFiveButton = document.querySelector("#goto-step-5");
window.counters.registerRepairListener((val) => {
  stepFiveButton.removeAttribute("disabled");
});

stepOneButton.addEventListener("click", () => {
  stepOneContainer.classList.remove("currentStep");
  stepTwoContainer.classList.add("currentStep");
});

const flatfileContainer = document.querySelector("#flatfileContainer");

const openFlatfileButton = document.querySelector("#openFlatfile");
openFlatfileButton.addEventListener("click", () => {
  flatfileContainer.classList.add("currentStep");
  openFlatfileButton.setAttribute("disabled", true);
  openFlatfileButton.innerText = "Flatfile Opened";
  window.openFlatfile();
});

const stepFourButton = document.querySelector("#goto-step-4");
stepFourButton.addEventListener("click", () => {
  stepThreeContainer.classList.remove("currentStep");
  stepFourContainer.classList.add("currentStep");
});

const stepFiveContainer = document.querySelector("#step-5");

stepFiveButton.addEventListener("click", () => {
  stepFourContainer.classList.remove("currentStep");
  stepFiveContainer.classList.add("currentStep");
});
