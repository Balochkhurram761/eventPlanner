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
      enum: ["", "BanquetHall", "OutdoorGarden", "Resort"],
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
    Location: {
      type: String,
      required: true,
    },

    cateringminPerHead: {
      type: Number,
      required: function () {
        return this.serviceType === "catering";
      },
    },
    cateringmaxPerHead: {
      type: Number,
      required: function () {
        return this.serviceType === "catering";
      },
    },
    cateringServices: {
      sound: { type: Boolean, default: false },
      plates: { type: Boolean, default: false },
      seating: { type: Boolean, default: false },
      waiters: { type: Boolean, default: false },
      decoration: { type: Boolean, default: false },
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

    photographerPackage: {
      type: String, // e.g. "Wedding + Reception Coverage"
      required: function () {
        return this.serviceType === "photographers";
      },
    },
    photographerStartingRange: {
      type: Number,
      required: function () {
        return this.serviceType === "photographers";
      },
    },
    photographerexpectedRange: {
      type: Number,
      required: function () {
        return this.serviceType === "photographers";
      },
    },
    adddtionalinformation: {
      type: String,
      required: function () {
        return this.serviceType === "photographers";
      },
    },

    decorationtype: {
      type: String,
      required: function () {
        return this.serviceType === "decorators";
      },
    },
    decoratorminPrice: {
      type: Number,
      required: function () {
        return this.serviceType === "decorators";
      },
    },
    decoratormaxPrice: {
      type: Number,
      required: function () {
        return this.serviceType === "decorators";
      },
    },
    typeDecrators: {
      type: [String],
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
      max: 500000,
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    carRentalDuration: {
      type: String,
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    Seats: {
      type: Number,
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    Door: {
      type: Number,
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    Transmission: {
      type: String,
      required: function () {
        return this.serviceType === "carRental";
      },
    },
    detailsproduct: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },

        details: [
          {
            title: { type: String },
            description: [{ type: String }],
          },
        ],
      },
    ],
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
      set: (v) => Math.round(v * 10) / 10, // only 1 decimal
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
    staff: {
      type: String,
    },
    cancellation: {
      type: String,
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
