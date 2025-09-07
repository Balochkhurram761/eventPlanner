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
      enum: [
        "hall",
        "catering",
        "dj",
        "photographers",
        "decorators",
        "carRental",
      ],
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
      trim: true,
    },

    images: {
      type: [String],
    },

    // 🏛️ Hall specific fields
    venue: {
      type: String,
      enum: ["BanquetHall", "OutdoorGarden", "Resort"],
      required: function () {
        return this.serviceType === "hall";
      },
    },
    hallCapacity: {
      type: Number,
      min: 50,
      max: 2000,
      required: function () {
        return this.serviceType === "hall";
      },
    },
    hallPricePerHead: {
      type: String,
      min: 200,
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

    // 🍽️ Catering specific
    cateringMenu: {
      type: [String],
      required: function () {
        return this.serviceType === "catering";
      },
    },
    cateringPricePerHead: {
      type: Number,
      min: 200,
      max: 5000,
      required: function () {
        return this.serviceType === "catering";
      },
    },

    // 🎵 DJ specific
    djRate: {
      type: Number,
      min: 5000,
      max: 200000,
      required: function () {
        return this.serviceType === "dj";
      },
    },
    djDuration: {
      type: String,
      required: function () {
        return this.serviceType === "dj";
      },
    },

    // 📸 Photographers specific
    photographerPackage: {
      type: String, // e.g. "Wedding + Reception Coverage"
      required: function () {
        return this.serviceType === "photographers";
      },
    },
    photographerPrice: {
      type: Number,
      min: 5000,
      max: 500000,
      required: function () {
        return this.serviceType === "photographers";
      },
    },

    decoratorTheme: {
      type: String, // e.g. "Floral Theme"
      required: function () {
        return this.serviceType === "decorators";
      },
    },
    decoratorPrice: {
      type: Number,
      min: 10000,
      max: 1000000,
      required: function () {
        return this.serviceType === "decorators";
      },
    },

    carType: {
      type: String, // e.g. "Luxury Car", "Limo", "SUV"
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    carRentalPrice: {
      type: Number, // e.g. 15000 PKR per day
      min: 1000,
      max: 200000,
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    carRentalDuration: {
      type: String, // e.g. "Per Hour", "Per Day"
      required: function () {
        return this.serviceType === "carRental";
      },
    },

    // ⭐ Reviews
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

    // 📍 General info
    city: {
      type: String,
      required: true,
      trim: true,
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
