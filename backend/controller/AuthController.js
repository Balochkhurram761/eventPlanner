import User from "../model/User12.js";
import { comparePassword, hashaedpassword } from "../helpers/AuthHelpers.js";
import { uservalidator } from "../validators/Validators.js";
import { genertetoken } from "../helpers/jwtHelper.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    await uservalidator.validate(req.body);

    const emailexit = await User.findOne({ email });
    if (emailexit) {
      return res.status(400).send({
        message: "Email already registered",
        success: false,
      });
    }

    const hashpassword = await hashaedpassword(password);

    let extraFields = {};

    if (role === "couple") {
      const { noOfGuests, coupleContactNo, weddingDate } = req.body;
      extraFields = { noOfGuests, coupleContactNo, weddingDate };
    }

    if (role === "vendor") {
      const { businessName, vendorContactNo, businessAddress } = req.body;
      extraFields = { businessName, vendorContactNo, businessAddress };
    }

    const user = new User({
      name,
      email,
      password: hashpassword,
      role: role,
      ...extraFields,
    });

    await user.save();

    res.status(201).send({
      message: "User registered successfully ✅",
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message || "Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email or password is missing",
        success: false,
      });
    }

    const existemail = await User.findOne({ email });
    if (!existemail) {
      return res.status(404).send({
        message: "Email does not exist. Please register first.",
        success: false,
      });
    }

    const matched = await comparePassword(password, existemail.password);
    if (!matched) {
      return res.status(401).send({
        message: "Invalid password",
        success: false,
      });
    }
    if (!existemail.isApproved && existemail.role !== "admin") {
      return res.status(403).json({ message: "Admin approval required" });
    }
    const token = genertetoken(existemail);

    res.status(200).send({
      message: "Login successful",
      success: true,
      user: {
        id: existemail._id,
        firstname: existemail.name,
        email: existemail.email,
        role: existemail.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = { role: { $in: ["vendor", "couple"] } };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter);

    res.status(200).send({
      success: true,
      message: "All vendor and couple users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Update user approval status
export const updatestatus = async (req, res) => {
  const { userId } = req.params;
  const { isApproved } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isApproved },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // get updated fields from request body
    if (updateData.password && updateData.password.trim() !== "") {
      updateData.password = await hashaedpassword(updateData.password);
    }
    if (req.file) {
      updateData.image = req.file.path; // multer path deta hai (uploads/xyz.jpg)
    }
    const data = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!data) {
      return res.status(404).send({
        message: "ID not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Data updated successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server Error",
      success: false,
    });
  }
};
