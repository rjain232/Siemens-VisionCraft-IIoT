const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  getCTOEEConfig,
  insertCTOEEConfig,
  updateCTOEEConfig,
} = require("../controller/ctOeeConfigController");

router.get("/", authenticate, getCTOEEConfig);
router.post("/", authenticate, insertCTOEEConfig);
router.put("/:id", authenticate, updateCTOEEConfig);

module.exports = router;