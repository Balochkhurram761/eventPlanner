import User from "../model/User12.js";
export const getAllUseradmin = async (req, res) => {
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

// Admin Approve/Reject Action
export const updateVendorStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { isApproved } = req.body; 

    const user = await User.findByIdAndUpdate(
      userId, 
      { 
        isApproved: isApproved,
        status: isApproved ? 'approved' : 'pending' 
      }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.json({ 
      success: true, 
      message: `User status updated to ${isApproved ? 'Approved' : 'Pending'} successfully!`,
      data: user 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};