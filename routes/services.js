const express = require("express");
const router = express.Router();

const {getService,createService,updateService,deleteService} = require("../controllers/services");

router.route("/")
    .post(createService)
;
    
router.route("/:id")
    .get(getService)
    .patch(updateService)
    .delete(deleteService)
;

module.exports = router;