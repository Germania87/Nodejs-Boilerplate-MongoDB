import "dotenv/config";
import express from "./config/express";

(async () => {
  await express();
})();
