const toastContainer = document.querySelector("#toast-container");
const toastOne = toastContainer.querySelector("#toast-1");
const toastTwo = toastContainer.querySelector("#toast-2");
const toastThree = toastContainer.querySelector("#toast-3");
const toastFour = toastContainer.querySelector("#toast-4");
const toastFive = toastContainer.querySelector("#toast-5");
const toastSix = toastContainer.querySelector("#toast-6");
const toastSeven = toastContainer.querySelector("#toast-7");
const toastEight = toastContainer.querySelector("#toast-8");
const toastNine = toastContainer.querySelector("#toast-9");
const toastTen = toastContainer.querySelector("#toast-10");
const toastEleven = toastContainer.querySelector("#toast-11");

function showToast(toast, time) {
  return setTimeout(() => {
    toast.classList.add("show");
  }, time);
}

function hideToast(toast) {
  toast.classList.remove("show");
}
window.toasts = {};

window.toasts.showStepOneToasts = () => {
  showToast(toastOne, 1000);
  showToast(toastTwo, 3000);
};
window.toasts.hideStepOneToasts = () => {
  hideToast(toastOne);
  hideToast(toastTwo);
};

window.toasts.showStepTwoToasts = () => {
  showToast(toastThree, 1000);
};
window.toasts.hideStepTwoToasts = () => {
  hideToast(toastThree);
};

window.toasts.showStepThreeToasts = () => {
  showToast(toastFour, 1000);
};
window.toasts.hideStepThreeToasts = () => {
  hideToast(toastFour);
};

window.toasts.showStepFourToasts = () => {
  showToast(toastFive, 1000);
};
window.toasts.hideStepFourToasts = () => {
  hideToast(toastFive);
};

window.toasts.showStepFiveToasts = () => {
  showToast(toastSix, 2000);
  showToast(toastSeven, 3000);
};
window.toasts.hideStepFiveToasts = () => {
  hideToast(toastSix);
  hideToast(toastSeven);
};

window.toasts.showStepSixToasts = () => {
  showToast(toastEight, 2000);
  showToast(toastNine, 2000);
};
window.toasts.hideStepSixToasts = () => {
  hideToast(toastEight);
  hideToast(toastNine);
};

window.toasts.showStepSevenToasts = () => {
  showToast(toastTen, 1000);
  showToast(toastEleven, 2000);
};
window.toasts.hideStepSevenToasts = () => {
  hideToast(toastTen);
  hideToast(toastEleven);
};

window.toasts.hideAllToasts = () => {
  toastContainer
    .querySelectorAll('[id^="toast-"]')
    .forEach((el) => el.classList.remove("show"));
};
