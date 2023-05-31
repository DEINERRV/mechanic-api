const express = require("express");
const router = express.Router();

const {getRepair,createRepair,updateRepair,deleteRepair} = require("../controllers/repairs");

router.route("/")
    .post(createRepair)
;
    
router.route("/:id")
    .get(getRepair)
    .patch(updateRepair)
    .delete(deleteRepair)
;

module.exports = router;