const express = require("express");
const router = express.Router();

const {getAllVehicle,getVehicle,createVehicle,updateVehicle,deleteVehicle} = require("../controllers/vehicles");

router.route("/")
    .get(getAllVehicle)
    .post(createVehicle)
;
    
router.route("/:id")
    .get(getVehicle)
    .patch(updateVehicle)
    .delete(deleteVehicle)
;

module.exports = router;