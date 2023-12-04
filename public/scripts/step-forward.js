const stepOneContainer = document.querySelector("#step-1");
const stepOneButton = document.querySelector("#goto-step-2");
const stepTwoContainer = document.querySelector("#step-2");
stepOneButton.addEventListener("click", () => {
  stepOneContainer.classList.remove("currentStep");
  stepTwoContainer.classList.add("currentStep");
});
