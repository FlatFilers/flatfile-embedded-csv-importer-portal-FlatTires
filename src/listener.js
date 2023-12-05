import { FlatfileListener } from "@flatfile/listener";
import api from "@flatfile/api";
import axios from "axios";
import { responseRejectionHandler } from "@flatfile/util-response-rejection";
import { bulkRecordHook } from "@flatfile/plugin-record-hook";

export const listener = FlatfileListener.create((listener) => {
  listener.on("workbook:created", async (event) => {
    window.spaceOptions = event.context;
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
      return recordHooks;
    }),
  );

  listener.on(
    "job:ready",
    { job: "workbook:submitActionFg" },
    async ({ context: { jobId, workbookId }, payload }) => {
      const { data: workbook } = await api.workbooks.get(workbookId);
      const { data: workbookSheets } = await api.sheets.list({ workbookId });

      const sheets = [];
      for (const [_, element] of workbookSheets.entries()) {
        const { data: records } = await api.records.get(element.id);
        sheets.push({
          ...element,
          ...records,
        });
      }

      try {
        await api.jobs.ack(jobId, {
          info: "Starting job to submit action to webhook.site",
          progress: 10,
        });

        console.log(JSON.stringify(sheets, null, 2));

        const webhookReceiver =
          process.env.WEBHOOK_SITE_URL ||
          "https://webhook.site/d61eade4-baa0-49f1-b995-ca138514b1e4"; //update this

        const response = await axios.post(
          webhookReceiver,
          {
            ...payload,
            method: "axios",
            workbook: {
              ...workbook,
              sheets,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          const rejections = response.data.rejections;
          if (rejections) {
            const totalRejectedRecords =
              await responseRejectionHandler(rejections);
            return await api.jobs.complete(jobId, {
              outcome: {
                next: {
                  type: "id",
                  id: rejections.id,
                  label: "See rejections...",
                },
                message: `Data was submission was partially successful. ${totalRejectedRecords} record(s) were rejected.`,
              },
            });
          }
          return await api.jobs.complete(jobId, {
            outcome: {
              message:
                "Data was successfully submitted to webhook.site. Go check it out at " +
                webhookReceiver +
                ".",
            },
          });
        } else {
          throw new Error("Failed to submit data to webhook.site");
        }
      } catch (error) {
        console.log(`webhook.site[error]: ${JSON.stringify(error, null, 2)}`);

        await api.jobs.fail(jobId, {
          outcome: {
            message:
              "This job failed probably because it couldn't find the webhook.site URL.",
          },
        });
      }
    },
  );
});
