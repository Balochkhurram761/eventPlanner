import Booking from "../model/Booking.js";
import Vendor from "../model/vendor.js";
import User from "../model/User12.js";
// ✅ Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      user,
      vendor,
      serviceType,
      eventDate,
      numberOfGuests,
      totalPrice,
      advancePaid,
      venue,
      specialRequests,
    } = req.body;

    // ✅ check required fields
    if (
      !user ||
      !vendor ||
      !serviceType ||
      !eventDate ||
      !numberOfGuests ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ check user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ check vendor exists
    const existingVendor = await Vendor.findById(vendor);
    if (!existingVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // ✅ create booking
    const newBooking = new Booking({
      user,
      vendor,
      serviceType,
      eventDate,
      numberOfGuests,
      totalPrice,
      advancePaid,
      venue,
      specialRequests,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
