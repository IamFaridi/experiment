const express = require("express");
const app = express();
const PORT = 3000;
const { faker } = require("@faker-js/faker");

app.use(express.json());

// Static response for filters
app.get("/creativeStrategy/filters", (req, res) => {
  res.json({
    data: {
      filters: [
        {
          label: "Type",
          type: "SINGLE_SELECT_RADIO_DROPDOWN_FILTER",
          key: "asset_type",
          properties: {
            options: {
              values: [
                { label: "Video", key: "video" },
                { label: "Image", key: "image" },
              ],
            },
          },
        },
        {
          label: "Scene",
          type: "SINGLE_SELECT_RADIO_DROPDOWN_FILTER",
          key: "scenes",
          properties: {
            options: {
              values: [
                { label: "All", key: "all" },
                { label: "Start", key: "start" },
                {
                  label: "Mid",
                  key: "mid",
                  sub_options: [
                    { label: "Mid 1", key: "mid_1" },
                    { label: "Mid 2", key: "mid_2" },
                    { label: "Mid 3", key: "mid_3" },
                  ],
                },
                { label: "End", key: "end" },
              ],
            },
          },
        },
        {
          label: "Performance (IPM)",
          type: "SINGLE_SELECT_RADIO_DROPDOWN_FILTER",
          key: "performance",
          properties: {
            options: {
              values: [
                { label: "All($total_count)", key: "ALL" },
                { label: "Top 15($top_15_count)", key: "TOP_15" },
                { label: "Top 25($top_25_count)", key: "TOP_25" },
                { label: "Bottom 25($bottom_25_count)", key: "BOTTOM_25" },
              ],
            },
          },
        },
      ],
    },
  });
});

// Generate fake data for concepts based on request payload
app.post("/creativeStrategy/concepts", (req, res) => {
  const { filters } = req.body;
  let response = { data: [] };
  for (let i = 0; i < 15; i++) {
    response.data.push({
      concept_name: filters.concept || faker.lorem.word(),
      win_rate: `${faker.finance.amount(1, 10, 2)}%`,
      asset_count: faker.datatype.number({ min: 10, max: 50 }),
    });
  }
  res.json(response);
});

// Generate fake performance trends based on request payload
app.post("/creativeStrategy/performanceTrends", (req, res) => {
  const { filters } = req.body;
  let response = { data: [] };
  let types = [
    "THEME",
    "OBJECTS",
    "COLOR",
    "MESSAGE",
    "BACKGROUND",
    "LOGO",
    "CALL TO ACTION",
  ];
  types.forEach((type) => {
    response.data.push({
      type,
      background_image: faker.image.imageUrl(),
      assets: `${faker.datatype.number({ min: 50, max: 90 })}%`,
      total_assets: faker.datatype.number({ min: 50, max: 200 }),
      is_coming_soon: faker.datatype.boolean(),
    });
  });
  res.json(response);
});

// Generate fake performance trends breakdowns based on request payload
app.post("/creativeStrategy/performanceTrends/breakdowns", (req, res) => {
  const { filters } = req.body;
  let response = { data: { trends: [] } };
  let labels = [
    "Object Type",
    "Placement",
    "Screen Space Utilization",
    "Visual Style",
    "Time On Screen",
    "Animation Action",
  ];
  labels.forEach((label) => {
    response.data.trends.push({
      label,
      is_coming_soon: faker.datatype.boolean(),
      data: {
        type: faker.lorem.word().toUpperCase(),
        label: faker.lorem.words(2),
        assets: `${faker.datatype.number({ min: 20, max: 90 })}%`,
        total_assets: faker.datatype.number({ min: 20, max: 200 }),
      },
    });
  });
  res.json(response);
});

// Generate fake top recurring elements based on request payload
app.post("/creativeStrategy/performanceTrends/topElements", (req, res) => {
  const { filters } = req.body;
  let response = {
    data: { label: "Top recurring objects", top_recurring_elements: [] },
  };
  for (let i = 0; i < 15; i++) {
    response.data.top_recurring_elements.push({
      name: faker.commerce.productName(),
      assets: `${faker.datatype.number({ min: 10, max: 90 })}%`,
      total_assets: faker.datatype.number({ min: 10, max: 100 }),
    });
  }
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Mock API Server is running on http://localhost:${PORT}`);
});
