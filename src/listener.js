import { FlatfileListener } from "@flatfile/listener";
import api from "@flatfile/api";
import { bulkRecordHook } from "@flatfile/plugin-record-hook";

export const listener = FlatfileListener.create((listener) => {
  listener.on("**", (event) => {
    // console.log(event)
    //console.log(event.topic);
    if (event.topic === "commit:created") console.log(event);
  });

  listener.on("workbook:created", async (event) => {
    window.spaceOptions = event.context;
    console.log(window.spaceOptions);
  });

  listener.on("commit:created", (event) => {
    const customerCommits = window.counters.customerCommits;
    const repairCommits = window.counters.repairCommits;

    if (event.context.slugs.sheet === "customers") {
      window.counters.customerCommits = customerCommits + 1;
    }
    if (event.context.slugs.sheet === "repairs") {
      window.counters.repairCommits = repairCommits + 1;
    }
  });

  listener.use(
    bulkRecordHook("customers", (records) => {
      const recordHooks = records.map((record) => {
        const firstName = record.get("firstName");
        record.set("lastName", "Rock");
        return record;
      });
      return recordHooks;
    }),
  );

  listener.use(
    bulkRecordHook("repairs", (records) => {
      const recordHooks = records.map((record) => {
        const partsCost = record.get("partsCost");
        const laborCost = record.get("laborCost");
        const totalCostValue = (
          Math.round(
            (parseFloat(`${partsCost}`) + parseFloat(`${laborCost}`) || 0) *
              100,
          ) / 100
        ).toFixed(2);

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
});
