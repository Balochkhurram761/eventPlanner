import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserShadi",
      required: true,
    },

    serviceType: {
      type: String,
      enum: ["hall", "catering", "dj"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
    },

    // 🏢 Hall Specific Fields
    hallCapacity: {
      type: Number, // e.g. 500 persons
      min: 50,
      max: 2000,
      required: function () {
        return this.serviceType === "hall";
      },
    },
    hallPricePerHead: {
      type: Number, // e.g. 2000 PKR per head
      min: 500,
      max: 10000,
      required: function () {
        return this.serviceType === "hall";
      },
    },
    hallLocation: {
      type: String,
      required: function () {
        return this.serviceType === "hall";
      },
    },

    // 🍽 Catering Specific Fields
    cateringMenu: {
      type: [String], // e.g. ["Biryani", "Karahi", "BBQ"]
      required: function () {
        return this.serviceType === "catering";
      },
    },
    cateringPricePerHead: {
      type: Number, // e.g. 1200 PKR per head
      min: 200,
      max: 5000,
      required: function () {
        return this.serviceType === "catering";
      },
    },

    // 🎵 DJ Specific Fields
    djRate: {
      type: Number, // e.g. 30,000 PKR per event
      min: 5000,
      max: 200000,
      required: function () {
        return this.serviceType === "dj";
      },
    },
    djDuration: {
      type: String, // e.g. "4 hours"
      required: function () {
        return this.serviceType === "dj";
      },
    },

    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserShadi" },
        comment: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    city: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^03[0-9]{9}$/, "Please provide a valid Pakistani mobile number"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

export default Vendor;
