const bannerModel = require("../../model/bannerModel");
const categoryModel = require("../../model/categoryModel");
const userModel = require("../../model/userModel");
const vendorModel = require("../../model/vendorModel");

exports.changeToVendor = async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId);
  user.role = "vendor";
  const changeVendorStatus = await vendorModel.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      status: "approved",
    }
  );

  await user.save();
  return res.json({ status: 200, message: "User is now a vendor" });
};

exports.rejectVendor = async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId);
  user.role = "user";
  const changeVendorStatus = await vendorModel.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      status: "rejected",
    }
  );

  await user.save();
  return res.json({ status: 200, message: "User is now a vendor" });
};

exports.getAllVendors = async (req, res) => {
  const vendors = await vendorModel.find();
  return res.json({ status: 200, vendors });
};

exports.getSingleVendor = async (req, res) => {
  const { id } = req.params;
  const vendor = await vendorModel.findOne({
    _id: id,
  });
  return res.json({ status: 200, vendor });
};

exports.deleteVendor = async (req, res) => {
  const { id } = req.params;
  const vendor = await vendorModel.findByIdAndDelete(id);
  if (vendor)
    return res.json({ status: 200, message: "Vendor deleted successfully" });
  else return res.json({ status: 400, message: "Vendor not deleted" });
};

// category section
exports.createCategory = async (req, res) => {
  const { category } = req.body;
  console.log(req.file);
  const categories = await categoryModel.create({
    category,
    image: process.env.BACKEND_URL + "/" + req.file.filename,
  });
  if (categories)
    return res.json({ status: 200, message: "Category created successfully" });
  else return res.json({ status: 400, message: "Category not created" });
};
exports.getAllCategories = async (req, res) => {
  const categories = await categoryModel.find();
  return res.json({ status: 200, categories });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (category)
    return res.json({ status: 200, message: "Category deleted successfully" });
  else return res.json({ status: 400, message: "Category not deleted" });
};
// banner section

exports.createBanner = async (req, res) => {
  const { title } = req.body;
  console.log(req.file);
  const banner = await bannerModel.create({
    title,
    image: process.env.BACKEND_URL + "/" + req.file.filename,
  });
  if (banner)
    return res.json({ status: 200, message: "Banner created successfully" });
  else return res.json({ status: 400, message: "Banner not created" });
};

exports.getAllBanners = async (req, res) => {
  const banners = await bannerModel.find();
  return res.json({ status: 200, banners });
};

exports.deleteBanner = async (req, res) => {
  const { id } = req.params;
  const banner = await bannerModel.findByIdAndDelete(id);
  if (banner)
    return res.json({ status: 200, message: "Banner deleted successfully" });
  else return res.json({ status: 400, message: "Banner not deleted" });
};
