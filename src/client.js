import { startFlatfile } from "@flatfile/javascript";
import { workbook } from "./workbook";
import { listener } from "./listener";

//create a new space in modal
window.openFlatfile = () => {
  const { publishableKey, environmentId } = process.env;
  if (!publishableKey && !environmentId) {
    throw new Error(
      "You must provide a publishable key and an environment ID - pass through in index.html",
    );
  }
  const flatfileOptions = {
    publishableKey,
    environmentId,
    workbook,
    listener,
    // sidebarConfig: {
    //   showSidebar: false,
    // },
    themeConfig: {
      primaryColor: "red",
      textColor: "white",
      logo: "https://images.ctfassets.net/hjneo4qi4goj/gL6Blz3kTPdZXWknuIDVx/7bb7c73d93b111ed542d2ed426b42fd5/flatfile.svg",
    },
    displayAsModal: false,
  };

  startFlatfile(flatfileOptions);
};
