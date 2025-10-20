import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full Name
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["vendor", "couple", "admin"],
      default: "couple",
    },
    image: {
      type: [String],
      default: ["uploads/profile.png"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },

    noOfGuests: {
      type: Number,
      required: function () {
        return this.role === "couple";
      },
    },
    coupleContactNo: {
      type: String,
      required: function () {
        return this.role === "couple";
      },
    },
    weddingDate: {
      type: Date,
      required: function () {
        return this.role === "couple";
      },
    },

    // ✅ Vendor-specific fields
    businessName: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    vendorContactNo: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    businessAddress: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("UserShadi", Userschema);
export default User;
