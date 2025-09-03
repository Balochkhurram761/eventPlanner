import { get } from "mongoose";
import Vendor from "../model/vendor.js";

export const UploadProduct = async (req, res) => {
  try {
    const {
      serviceType,
      title,
      description,
      images,
      hallCapacity,
      hallPricePerHead,
      hallLocation,
      cateringMenu,
      cateringPricePerHead,
      djRate,
      djDuration,
      city,
      contactNumber,
    } = req.body;

    const userId = req.user._id;
    console.log("token id ", userId);
    const newVendor = new Vendor({
      user: userId,
      serviceType,
      title,
      description,
      images: req.files?.map((file) => file.path) || [],
      hallCapacity,
      hallPricePerHead,
      hallLocation,
      cateringMenu,
      cateringPricePerHead,
      djRate,
      djDuration,
      city,
      contactNumber,
    });

    // save to DB
    await newVendor.save();

    res.status(201).json({
      success: true,
      message: "Vendor service uploaded successfully ",
      data: newVendor,
    });
  } catch (error) {
    console.error("UploadProduct Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to upload vendor service ",
      error: error.message,
    });
  }
};

export const fetchdata = async (req, res) => {
  try {
    const userId = req.user._id;

    const getdata = await Vendor.find({ user: userId });

    res.status(200).json({
      success: true,
      message: "Vendor services fetched successfully ",
      data: getdata,
    });
  } catch (error) {
    console.error("fetchdata Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor services ❌",
      error: error.message,
    });
  }
};

export const deleteproduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedData = await Vendor.findByIdAndDelete(productId);

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Product not found ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully ",
      data: deletedData,
    });
  } catch (error) {
    console.error("deleteproduct Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete product ",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateFields = req.body;

    const updatedData = await Vendor.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Product not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully ✅",
      data: updatedData,
    });
  } catch (error) {
    console.error("updateProduct Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update product ❌",
      error: error.message,
    });
  }
};

