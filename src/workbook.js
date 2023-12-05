export const workbook = {
  name: "FlatTires Customers & Repairs",
  sheets: [
    {
      name: "Customers",
      slug: "customers",
      fields: [
        {
          key: "customerId",
          type: "string",
          label: "Customer Id",
          constraints: [{ type: "required" }, { type: "unique" }],
        },
        {
          key: "firstName",
          type: "string",
          label: "First Name",
          constraints: [{ type: "required" }],
        },
        {
          key: "lastName",
          type: "string",
          label: "Last Name",
          constraints: [{ type: "required" }],
        },
        {
          key: "email",
          type: "string",
          label: "Email",
          constraints: [{ type: "required" }],
        },
        {
          key: "phone",
          type: "string",
          label: "Phone Number",
        },
        {
          key: "street",
          type: "string",
          label: "Street",
        },
        {
          key: "city",
          type: "string",
          label: "City",
        },
        {
          key: "state",
          type: "string",
          label: "State",
        },
        {
          key: "zip",
          type: "string",
          label: "Zip Code",
        },
        // {
        //   key: "totalCostOfRepairs",
        //   type: "reference",
        //   label: "Total Cost of Repairs",
        //   config: {
        //     ref: "repairs",
        //     key: "totalCostOfRepairs",
        //     relationship: "has-many",
        //   },
        // },
      ],
    },
    {
      name: "Repairs",
      slug: "repairs",
      fields: [
        {
          key: "repairId",
          type: "string",
          label: "Repair Id",
          constraints: [{ type: "required" }, { type: "unique" }],
        },
        {
          key: "customerId",
          type: "reference",
          constraints: [{ type: "required" }],
          config: {
            ref: "customers",
            key: "customerId",
            relationship: "has-one",
          },
        },
        {
          key: "vehicle",
          type: "string",
          label: "Vehicle",
          constraints: [{ type: "required" }],
        },
        {
          key: "licensePlate",
          type: "string",
          label: "License Plate",
          constraints: [{ type: "required" }],
        },
        {
          key: "dateOfRepair",
          type: "string",
          label: "Date Of Repair",
        },
        {
          key: "description",
          type: "string",
          label: "Description of Repair",
        },
        {
          key: "partsCost",
          type: "string",
          label: "Parts Cost",
        },
        {
          key: "laborCost",
          type: "string",
          label: "Labor Cost",
        },
        {
          key: "totalCostOfRepairs",
          type: "number",
          label: "Total Cost of Repairs",
        },
      ],
    },
  ],
  actions: [
    {
      operation: "submitActionFg",
      mode: "foreground",
      label: "Submit to FlatTires",
      description: "Submit data to webhook.site",
      primary: true,
      constraints: [
        {
          type: "hasAllValid",
        },
      ],
    },
  ],
  settings: {
    trackChanges: true,
  },
};
