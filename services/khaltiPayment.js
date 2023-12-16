const { default: axios } = require("axios");
const appliedJobModel = require("../model/appliedJobModel");

exports.paymentVerify = async (req, res) => {
  const { token, amount } = req.body;

  const secretKey = "test_secret_key_a13b4e7346634bfa998adb934bb8d19b";

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      {
        token,
        amount,
      },
      {
        headers: {
          Authorization: `Key ${secretKey}`,
        },
      }
    );

    // find the job with req.userID

    const job = await appliedJobModel.findOne({ userId: req.userId });
    console.log(job)

    job.paymentStatus = "paid";

    await job.save();

    res.json({
      status: 200,
      message: "Payment was verified successfully!",
      response: response.data,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Payment was not verified!",
      error: error.message,
    });
  }
};
