const appliedJobModel = require("../../model/appliedJobModel");
const jobModel = require("../../model/jobModel");

exports.createJob = async (req, res) => {
  const { title, description, location, salary, deadline, categoryId } =
    req.body;

  if (!title || !description || !location || !salary || !deadline)
    return res.json({ status: 400, message: "Please fill all the fields" });

  const job = await jobModel.create({
    title,
    description,
    location,
    salary,
    deadline,
    postedBy: req.userId,
    category: categoryId,
  });
  console.log(categoryId);
  if (job) {
    return res.json({ status: 200, message: "Job created successfully" });
  } else {
    return res.json({ status: 400, message: "Job not created" });
  }
};

exports.individualVendorJobs = async (req, res) => {
  const jobs = await jobModel.find({ postedBy: req.userId });
  return res.json({ status: 200, jobs });
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await jobModel.findByIdAndDelete(id);
  if (job)
    return res.json({ status: 200, message: "Job deleted successfully" });
  else return res.json({ status: 400, message: "Job not deleted" });
};

exports.viewSingleJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findOne({
      _id: id,
    });
    return res.json({ status: 200, job });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

exports.myApplicants = async (req, res) => {
  const jobs = await jobModel.find({ postedBy: req.userId });

  //find all the applicants for the jobs posted by the vendor
  const applicants = await appliedJobModel
    .find({
      jobId: { $in: jobs.map((job) => job._id) },
    })
    .populate("userId");

  return res.json({ status: 200, applicants });
};

exports.acceptOrRejectApplicant = async (req, res) => {
  const { applicantId } = req.body;
  console.log(req.body);
  let applicant;
  if (req.body.status === "accepted") {
    applicant = await appliedJobModel.findByIdAndUpdate(
      applicantId,
      {
        status: "accepted",
      },
      {
        new: true,
      }
    );
  } else if (req.body.status === "rejected") {
    applicant = await appliedJobModel.findByIdAndUpdate(
      applicantId,
      {
        status: "rejected",
      },
      {
        new: true,
      }
    );
  } else {
    return res.json({ status: 400, message: "Invalid status" });
  }

  if (applicant) {
    return res.json({
      status: 200,
      message:
        "Applicant status changed to " + applicant.status + " successfully ",
    });
  } else {
    return res.json({ status: 400, message: "Applicant not accepted" });
  }
};
