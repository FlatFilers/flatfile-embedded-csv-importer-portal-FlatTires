import { startFlatfile } from "@flatfile/javascript";
import { workbook } from "./workbook";
import { listener } from "./listener";
//ashley

//create a new space in modal
window.openFlatfile = () => {
  const publishableKey = "pk_6e0577bd434b4f989c3add5ad4d9feaf";
  const environmentId = "us_env_1ejus9hB";
  if (!publishableKey && !environmentId) {
    throw new Error(
      "You must provide a publishable key and an environment ID - pass through in index.html",
    );
  }
  const flatfileOptions = {
    name: "FlatTires Flatfile Demo",
    // themeConfig: {
    //   primaryColor: "red",
    //   textColor: "white",
    //   logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
    // },
    // sidebarConfig: {
    //   showSidebar: false,
    // },
    publishableKey,
    environmentId,
    workbook,
    listener,
    displayAsModal: false,
    spaceBody: {
      metadata: {
        showSpaceInfo: false,
      },
    },
  };
  window.toasts.hideStepOneToasts();
  startFlatfile(flatfileOptions);
};
