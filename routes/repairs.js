const express = require("express");
const router = express.Router();

const {getRepair,createRepair,updateRepair,deleteRepair,getAllRepair} = require("../controllers/repairs");

router.route("/")
    .get(getAllRepair)
    .post(createRepair)
;
    
router.route("/:id")
    .get(getRepair)
    .patch(updateRepair)
    .delete(deleteRepair)
;

module.exports = router;