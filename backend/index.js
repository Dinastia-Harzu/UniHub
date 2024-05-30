"use strict";

var path = require("path");
var http = require("http");
const fs = require("fs");
const { app } = require("./utils/helper");

var oas3Tools = require("oas3-tools");
const multer = require("multer");
var serverPort = 8192;

app.use("/nube", require("express").static(path.join(__dirname, "nube")));

function guardarFicheroNube(subdir) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, fichero, cb) => {
        console.log(fichero);
        let campo = fichero.fieldname.split("[")[0];
        if (campo != "multimedia") {
          campo += "s";
        }
        const carpeta = `nube/${subdir}/${subdir == "trabajos" ? campo : ""}`;
        if (!fs.existsSync(carpeta)) {
          fs.mkdirSync(carpeta, { recursive: true });
        }
        cb(null, carpeta);
      },
      filename: (req, fichero, cb) => cb(null, fichero.originalname),
    }),
  });
}

["trabajos", "pfp"].forEach((subdir) =>
  app.post(
    `/fichero/${subdir}`,
    guardarFicheroNube(subdir).any(),
    (req, res, next) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Conseguido\n");
    }
  )
);

// swaggerRouter configuration
var options = {
  routing: {
    controllers: path.join(__dirname, "./controllers"),
  },
};

var expressAppConfig = oas3Tools.expressAppConfig(
  path.join(__dirname, "api/openapi.yaml"),
  options
);

app.use(expressAppConfig.getApp());

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
  console.log(
    "Your server is listening on port %d (http://localhost:%d)",
    serverPort,
    serverPort
  );
  console.log(
    "Swagger-ui is available on http://localhost:%d/docs",
    serverPort
  );
});
