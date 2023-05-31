const express = require("express");
const router = express.Router();

const {getAllServices,getService,createService,updateService,deleteService} = require("../controllers/services");

router.route("/")
    .get(getAllServices)
    .post(createService)
;
    
router.route("/:id")
    .get(getService)
    .patch(updateService)
    .delete(deleteService)
;

module.exports = router;