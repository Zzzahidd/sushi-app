const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Food Delivery API",
      version: "1.0.0",
      description: "Food Delivery Backend Documentation",
    },

    servers: [
      {
        url: "https://sushi-app-pxoh.onrender.com",
        description: "Production Server (Render)",
      },
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};