const {
  createJob,
  individualVendorJobs,
  deleteJob,
  viewSingleJob,
  myApplicants,
  acceptOrRejectApplicant,
} = require("../controller/vendor/vendorController");

const { isAuthenticated, userRole } = require("../middleware/isAuthenticated");

const router = require("express").Router();

router
  .route("/jobs")
  .post(isAuthenticated, userRole("vendor"), createJob)
  .get(isAuthenticated, userRole("vendor"), individualVendorJobs);
router
  .route("/jobs/:id")
  .delete(isAuthenticated, userRole("vendor"), deleteJob)
  .get(isAuthenticated, userRole("vendor"), viewSingleJob);

//application
router
  .route("/applicants")
  .get(isAuthenticated, userRole("vendor"), myApplicants);
router
  .route("/applicants/action")
  .post(isAuthenticated, userRole("vendor"), acceptOrRejectApplicant);

module.exports = router;
