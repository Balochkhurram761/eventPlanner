import User from "../model/User12.js";
import { comparePassword, hashaedpassword } from "../helpers/AuthHelpers.js";
import { uservalidator } from "../validators/Validators.js";
import { genertetoken } from "../helpers/jwtHelper.js";
import crypto from "crypto";
import transporter from "../helpers/NodeMailer.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role, reelPageLink } = req.body;

    await uservalidator.validate(req.body);
    const registrationLetterPath = req.file ? req.file.path : null;
    const emailexit = await User.findOne({ email });
    if (emailexit) {
      return res.status(400).send({
        message: "Email already registered",
        success: false,
      });
    }

    const hashpassword = await hashaedpassword(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    let extraFields = {};

    if (role === "couple") {
      const { noOfGuests, coupleContactNo, weddingDate } = req.body;
      extraFields = {
        noOfGuests,
        coupleContactNo,
        weddingDate,
        isEmailVerified: true,
      };
    }

    if (role === "vendor") {
      const { businessName, vendorContactNo, businessAddress } = req.body;
      extraFields = {
        businessName,
        vendorContactNo,
        businessAddress,
        isEmailVerified: false,
        registrationLetter: registrationLetterPath,
        reelPageLink: reelPageLink,
      };
    }

    const user = new User({
      name,
      email,
      password: hashpassword,
      role: role,
      verificationToken,
      ...extraFields,
    });

    await user.save();
    if (role === "vendor") {
      const verifyUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

      const mailOptions = {
        from: '"Shadi Planner" <noreply@shadi.com>',
        to: email,
        subject: "Verify Your Business Account",
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2>Shadi Planner Vendor Registration</h2>
            <p>Hi ${name}, please verify your email to activate your account.</p>
            <a href="${verifyUrl}" style="background: #e91e63; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>Admin will review your profile after verification.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }
    res.status(201).send({
      message:
        role === "vendor"
          ? "Registered! Please check your email for verification link."
          : "Registered successfully",
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
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // 1. Token se user dhoondo
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("<h1>Token invalid hai!</h1>");
    }

    // 2. Status update karein
    user.isEmailVerified = true;
    user.status = "pending"; // Email verify ho gayi, ab admin approval ka intezar hai
    user.verificationToken = undefined; // Token delete kar dein taake dobara use na ho

    await user.save();

    // 3. Vendor ko success message dikhayen
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <h1 style="color: green;">Email Verified Successfully! </h1>
        <p>Email verified successfully! Your account is now pending admin approval.</p>
        <br/>
        <a href="http://localhost:5173/login" style="background: #e91e63; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Login</a>
      </div>
    `);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
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

export const getOneVendorData = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error("getOneVendorData error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const putvendorOneupdate = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { name, businessName, vendorContactNo, businessAddress, reelPageLink } = req.body;

    const updateData = {
      name,
      businessName,
      vendorContactNo,
      businessAddress,
      reelPageLink,
    };
    if (req.file) {
      updateData.image = [req.file.path]; 
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } 
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("getOneVendorData error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
