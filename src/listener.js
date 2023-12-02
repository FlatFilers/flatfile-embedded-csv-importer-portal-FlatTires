import { FlatfileListener } from "@flatfile/listener";
import { bulkRecordHook } from "@flatfile/plugin-record-hook";

export const listener = FlatfileListener.create((listener) => {
  listener.on("**", (event) => {
    // console.log(event)
    console.log(event.topic);
    if (event.topic === "job:ready") console.log(event);
  });

  listener.on("workbook:created", async (event) => {
    window.spaceOptions = event.context;
    console.log(window.spaceOptions);
  });

  listener.use(
    bulkRecordHook("customers", (records) => {
      console.log("bulkRecordHook");
      const recordHooks = records.map((record) => {
        const firstName = record.get("firstName");
        console.log({ firstName });
        record.set("lastName", "Rock");
        console.log(record.getLinks("customerId"));
        return record;
      });
      console.log("returning");
      return recordHooks;
    }),
  );
  listener.use(
    bulkRecordHook("repairs", (records) => {
      console.log("bulkRecordHook");
      const recordHooks = records.map((record) => {
        const partsCost = record.get("partsCost");
        const laborCost = record.get("laborCost");
        const totalCostValue =
          parseFloat(`${partsCost}`) + parseFloat(`${laborCost}`) || 0;
        console.log(totalCostValue);
        record.set("totalCostOfRepairs", totalCostValue);
        // const links = record.getLinks("customerId");

        record.setLinkedValue(
          "totalCostOfRepairs",
          "totalCostOfRepairs",
          totalCostValue,
        );
        return record;
      });

      console.log("returning");
      return recordHooks;
    }),
  );

  listener.on("workbook:updateCustomerCosts");
});
