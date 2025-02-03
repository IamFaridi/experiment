const express = require("express");
const app = express();
const PORT = 3000;
const { faker } = require("@faker-js/faker");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------
// 1. GET Filters for Overall Screen
// Endpoint: /creativeStrategy/filters?adaccount_id=...&tag_name=...&start_date=...&end_date=...
// ---------------------------------------------------------------------
app.get("/creativeStrategy/filters", (req, res) => {
  res.json({
    status: "success",
    data: {
      filters: [
        {
          title: "Select Asset Type",
          id: "asset_type",
          options: [
            { label: "Video", key: "VIDEO" },
            { label: "Image", key: "IMAGE" },
          ],
        },
        {
          title: "Select Scene",
          id: "scene",
          options: [
            { type: "radio", label: "All", value: "ALL" },
            { type: "radio", label: "Start", value: "START" },
            {
              type: "dropdown",
              label: "Mid",
              sub_options: [
                { type: "radio", label: "Mid 1", value: "MID_1" },
                { type: "radio", label: "Mid 2", value: "MID_2" },
                { type: "radio", label: "Mid 3", value: "MID_3" },
                { type: "radio", label: "Mid 4", value: "MID_4" },
                { type: "radio", label: "Mid 5", value: "MID_5" },
                { type: "radio", label: "Mid 6", value: "MID_6" },
                { type: "radio", label: "Mid 7", value: "MID_7" },
                { type: "radio", label: "Mid 8", value: "MID_8" },
                { type: "radio", label: "Mid 9", value: "MID_9" },
              ],
            },
            { type: "radio", label: "End", value: "END" },
          ],
        },
        {
          title: "Performance (IPM)",
          id: "rank",
          options: [
            { label: "All (942)", key: "ALL" },
            { label: "Top 15% (142)", key: "TOP_15" },
            { label: "Top 25% (236)", key: "TOP_25" },
            { label: "Bottom 25% (236)", key: "BOTTOM_25" },
          ],
        },
      ],
    },
  });
});

// ---------------------------------------------------------------------
// 2. POST /creativeStrategy/concepts
// Request payload example:
// {
//    "filters": {
//         "asset_type": "IMAGE",
//         "scene": ["MID_1"],
//         "performance": "ALL",
//         "concept": "firelight"
//    },
//    "adaccount_id": "",
//    "tag_name": "",
//    "start_date": "",
//    "end_date": ""
// }
// ---------------------------------------------------------------------
app.post("/creativeStrategy/concepts", (req, res) => {
  const { filters } = req.body;
  // For this endpoint we return exactly two concepts.
  const firstConcept = {
    concept_name: filters.concept || faker.lorem.word(),
    win_rate: `${faker.finance.amount(1, 10, 2)}%`,
    asset_count: faker.datatype.number({ min: 10, max: 50 }),
  };

  const secondConcept = {
    concept_name: filters.concept
      ? faker.helpers.arrayElement(
          // If the request concept is provided, ensure a different name.
          ["lights", faker.lorem.word()]
        )
      : faker.lorem.word(),
    win_rate: `${faker.finance.amount(1, 10, 2)}%`,
    asset_count: faker.datatype.number({ min: 10, max: 50 }),
  };

  res.json({
    data: [firstConcept, secondConcept],
  });
});

// ---------------------------------------------------------------------
// 3. POST /creativeStrategy/performanceTrends
// Request payload example (filters + start_date/end_date)
// ---------------------------------------------------------------------
app.post("/creativeStrategy/performanceTrends", (req, res) => {
  // We produce an array with seven trend objects.
  const trends = [
    {
      type: "THEME",
      background_image: faker.image.imageUrl(),
      assets: "75%",
      total_assets: "120",
      themes: { dark: "75%", light: "25%" },
      is_coming_soon: false,
    },
    {
      type: "OBJECTS",
      background_image: faker.image.imageUrl(),
      assets: "60%",
      total_assets: "100",
      is_coming_soon: false,
    },
    {
      type: "COLOR",
      background_image: faker.image.imageUrl(),
      is_coming_soon: true,
    },
    {
      type: "MESSAGE",
      background_image: faker.image.imageUrl(),
      is_coming_soon: true,
    },
    {
      type: "BACKGROUND",
      background_image: faker.image.imageUrl(),
      is_coming_soon: true,
    },
    {
      type: "LOGO",
      background_image: faker.image.imageUrl(),
      is_coming_soon: true,
    },
    {
      type: "CALL TO ACTION",
      background_image: faker.image.imageUrl(),
      is_coming_soon: true,
    },
  ];
  res.json({ data: trends });
});

// ---------------------------------------------------------------------
// 4. POST /creativeStrategy/performanceTrends/breakdowns
// Request payload example includes filters and performance_trends info.
// ---------------------------------------------------------------------
app.post("/creativeStrategy/performanceTrends/breakdowns", (req, res) => {
  res.json({
    data: {
      trends: [
        {
          label: "Object Type",
          is_coming_soon: false,
          data: {
            type: "HUMAN",
            label: "Human",
            assets: "45%",
            total_assets: 90,
          },
          breakdown: {
            type: "LIST",
            values: [
              {
                type: "OBJECT",
                label: "Object",
                assets: "25%",
                total_assets: 50,
                is_top_trend: false,
              },
              {
                type: "HUMAN",
                label: "Human",
                assets: "45%",
                total_assets: 90,
                is_top_trend: true,
              },
              {
                type: "INTERACTION",
                label: "Interaction",
                assets: "30%",
                total_assets: 60,
                is_top_trend: false,
              },
            ],
          },
        },
        {
          label: "Placement",
          is_coming_soon: false,
          data: {
            type: "MIDDLE_CENTER",
            label: "Middle Center",
            assets: "55%",
            total_assets: 110,
          },
          breakdown: {
            type: "CHIPS",
            values: [
              {
                type: "TOP_LEFT",
                label: "Top Left",
                assets: "8%",
                total_assets: 16,
                is_top_trend: false,
              },
              {
                type: "TOP_CENTER",
                label: "Top Center",
                assets: "4%",
                total_assets: 8,
                is_top_trend: false,
              },
              {
                type: "TOP_RIGHT",
                label: "Top RIght",
                assets: "6%",
                total_assets: 12,
                is_top_trend: false,
              },
              {
                type: "MIDDLE_LEFT",
                label: "Middle Left",
                assets: "12%",
                total_assets: 24,
                is_top_trend: false,
              },
              {
                type: "MIDDLE_CENTER",
                label: "Middle Center",
                assets: "55%",
                total_assets: 110,
                is_top_trend: true,
              },
              {
                type: "MIDDLE_RIGHT",
                label: "Middle RIght",
                assets: "0%",
                total_assets: 0,
                is_top_trend: false,
              },
              {
                type: "BOTTOM_LEFT",
                label: "Bottom Left",
                assets: "0%",
                total_assets: 0,
                is_top_trend: false,
              },
              {
                type: "BOTTOM_CENTER",
                label: "Bottom Center",
                assets: "5%",
                total_assets: 10,
                is_top_trend: false,
              },
              {
                type: "BOTTOM_RIGHT",
                label: "Bottom RIght",
                assets: "0%",
                total_assets: 0,
                is_top_trend: false,
              },
            ],
          },
        },
        {
          label: "Screen Space Utilization",
          is_coming_soon: false,
          data: {
            type: "26_50_PERCENT",
            label: "26-50%",
            assets: "40%",
            total_assets: 80,
          },
          breakdown: {
            type: "DATA_RANGE",
            values: [
              {
                type: "0_25_PERCENT",
                label: "0-25%",
                assets: "19%",
                total_assets: 38,
                is_top_trend: false,
              },
              {
                type: "26_50_PERCENT",
                label: "26-50%",
                assets: "40%",
                total_assets: 80,
                is_top_trend: true,
              },
              {
                type: "51_75_PERCENT",
                label: "51-75%",
                assets: "8%",
                total_assets: 16,
                is_top_trend: false,
              },
              {
                type: "76_100_PERCENT",
                label: "76-100%",
                assets: "1%",
                total_assets: 2,
                is_top_trend: false,
              },
            ],
          },
        },
        {
          label: "Visual Style",
          is_coming_soon: false,
          data: {
            type: "ANIMATED",
            label: "Animated",
            assets: "55%",
            total_assets: 110,
          },
          breakdown: {
            type: "LIST",
            values: [
              {
                type: "REALISTIC",
                label: "Realistic",
                assets: "20%",
                total_assets: 40,
                is_top_trend: false,
              },
              {
                type: "ANIMATED",
                label: "Animated",
                assets: "55%",
                total_assets: 110,
                is_top_trend: true,
              },
              {
                type: "ILLUSTRATED_GRAPHICS",
                label: "Illustrated Graphics",
                assets: "25%",
                total_assets: 50,
                is_top_trend: false,
              },
            ],
          },
        },
        {
          label: "Time On Screen",
          is_coming_soon: false,
          data: {
            type: "3_TO_6_SECONDS",
            label: "3 to 6s",
            assets: "42%",
            total_assets: 84,
          },
          breakdown: {
            type: "DATA_RANGE",
            values: [
              {
                type: "0_SECONDS",
                label: "0s",
                assets: "20%",
                total_assets: 40,
                is_top_trend: false,
              },
              {
                type: "3_SECONDS",
                label: "3s",
                assets: "42%",
                total_assets: 84,
                is_top_trend: true,
              },
              {
                type: "6_SECONDS",
                label: "6s",
                assets: "6%",
                total_assets: 12,
                is_top_trend: false,
              },
              {
                type: "9_PLUS_SECONDS",
                label: "9s+",
                assets: "32%",
                total_assets: 64,
                is_top_trend: false,
              },
            ],
          },
        },
        {
          label: "Animation Action",
          is_coming_soon: true,
          data: {
            type: "100_PERCENT_OF_SCREEN",
            label: "100% of screen",
          },
        },
      ],
    },
  });
});

// ---------------------------------------------------------------------
// 5. POST /creativeStrategy/performanceTrends/themes
// ---------------------------------------------------------------------
app.post("/creativeStrategy/performanceTrends/themes", (req, res) => {
  res.json({
    data: {
      trends: {
        theme: {
          label: "Theme breakdown",
          breakdown: [
            {
              type: "DARK",
              label: "Dark Theme",
              assets: "75%",
              total_assets: 150,
            },
            {
              type: "LIGHT",
              label: "Light Theme",
              assets: "25%",
              total_assets: 50,
            },
          ],
        },
      },
    },
  });
});

// ---------------------------------------------------------------------
// 6. POST /creativeStrategy/performanceTrends/topElements
// Request payload example includes filters and performance_trends info.
// ---------------------------------------------------------------------
app.post("/creativeStrategy/performanceTrends/topElements", (req, res) => {
  res.json({
    data: {
      label: "Top recurring objects",
      top_recurring_elements: [
        { name: "Spinning wheel", assets: "45%", total_assets: 90 },
        { name: "Car", assets: "25%", total_assets: 50 },
        { name: "Slot machine", assets: "30%", total_assets: 60 },
      ],
    },
  });
});

// ---------------------------------------------------------------------
// 7. POST /creativeStrategy/assetBreakdown
// Request payload includes filters (including asset_breakdown_filters)
// ---------------------------------------------------------------------
app.post("/creativeStrategy/assetBreakdown", (req, res) => {
  // Generate two sample asset breakdown objects.
  const asset1 = {
    asset_name: "asset name 1",
    asset_id: faker.datatype.uuid(),
    asset_type: "VIDEO",
    thumbnail_link: faker.image.imageUrl(),
    creative_link: faker.internet.url(),
    image_url: faker.image.imageUrl(),
    object: {
      object_type: "Human",
      placement: "Top left",
      screen_space_utilization: "2% of Screen Utilised",
      visual_style: "Animated",
      animation_action: null,
      time_on_screen: "0 to 3s",
    },
    performance_metrics: {
      spend: "$50.01",
      ipm: "1.56",
      cpa: "2.36",
    },
  };

  const asset2 = {
    asset_name: "asset name 2",
    asset_id: faker.datatype.uuid(),
    asset_type: "VIDEO",
    thumbnail_link: faker.image.imageUrl(),
    creative_link: faker.internet.url(),
    image_url: faker.image.imageUrl(),
    object: {
      object_type: "Human",
      placement: "Top right",
      screen_space_utilization: "3% of Screen Utilised",
      visual_style: "Animated",
      animation_action: null,
      time_on_screen: "4 to 6s",
    },
    performance_metrics: {
      spend: "$24.01",
      ipm: "13.6",
      cpa: "3.17",
    },
  };

  res.json({ data: [asset1, asset2] });
});

// ---------------------------------------------------------------------
// 8. GET /creativeStrategy/assetBreakdown/filters
// ---------------------------------------------------------------------
app.get("/creativeStrategy/assetBreakdown/filters", (req, res) => {
  res.json({
    data: {
      filters: [
        {
          label: "Object Type",
          type: "MULTI_SELECT_FILTER",
          key: "object_type",
          properties: {
            options: [
              { key: "object", label: "Object" },
              { key: "human", label: "Human" },
              { key: "interaction", label: "Interaction" },
            ],
          },
        },
        {
          label: "Placement",
          type: "MULTI_SELECT_ICON_FILTER",
          key: "placement",
          properties: {
            options: [
              { icon_url: "icon_url", key: "top_left", label: "Top Left" },
              { icon_url: "icon_url", key: "top_center", label: "Top Center" },
              { icon_url: "icon_url", key: "top_right", label: "Top Right" },
              {
                icon_url: "icon_url",
                key: "middle_left",
                label: "Middle Left",
              },
              {
                icon_url: "icon_url",
                key: "middle_center",
                label: "Middle Center",
              },
              {
                icon_url: "icon_url",
                key: "middle_right",
                label: "Middle Right",
              },
              {
                icon_url: "icon_url",
                key: "bottom_left",
                label: "Bottom Left",
              },
              {
                icon_url: "icon_url",
                key: "bottom_center",
                label: "Bottom Center",
              },
              {
                icon_url: "icon_url",
                key: "bottom_right",
                label: "Bottom Right",
              },
            ],
          },
        },
        {
          label: "Space Utilization",
          type: "MULTI_SELECT_FILTER",
          key: "space_utilization",
          properties: {
            options: [
              { key: "0_TO_25_PERCENT", label: "0-25% of screen" },
              { key: "25_TO_50_PERCENT", label: "25-50% of screen" },
              { key: "50_TO_75_PERCENT", label: "50-75% of screen" },
              { key: "75_TO_100_PERCENT", label: "75-100% of screen" },
            ],
          },
        },
        {
          label: "Visual Style",
          type: "MULTI_SELECT_FILTER",
          key: "visual_style",
          properties: {
            options: [
              { key: "REALISTIC", label: "Realistic" },
              { key: "ANIMATED", label: "Animated" },
              { key: "ILLUSTRATED_GRAPHICS", label: "Illustrated graphics" },
            ],
          },
        },
        {
          label: "Time On Screen",
          type: "MULTI_SELECT_FILTER",
          key: "time_on_screen",
          properties: {
            options: [
              { key: "0_TO_3_SECONDS", label: "0s - 3s" },
              { key: "3_TO_6_SECONDS", label: "3s - 6s" },
              { key: "6_TO_9_SECONDS", label: "6s - 9s" },
              { key: "9_PLUS_SECONDS", label: "9s+" },
            ],
          },
        },
        {
          label: "Animation Action",
          type: "COMING_SOON",
          key: "animation_action",
        },
      ],
    },
  });
});

// ---------------------------------------------------------------------
// Start the server
// ---------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(
    `Creative Strategy Mock API Server is running on http://localhost:${PORT}`
  );
});
