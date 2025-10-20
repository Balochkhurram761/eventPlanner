import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // 👤 Registered user (optional)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserShadi", // Couple/Admin/Vendor user
    },

    // 👤 Guest details (agar register na ho)
    customerName: {
      type: String,
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    customerAddress: {
      type: String,
      trim: true,
    },

    // vendor reference
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
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

    eventDate: {
      type: Date,
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    advancePaid: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },

    venue: {
      type: String,
    },

    specialRequests: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
