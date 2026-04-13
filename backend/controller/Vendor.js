import { get } from "mongoose";
import Vendor from "../model/vendor.js";
import User from "../model/User12.js";
export const UploadProduct = async (req, res) => {
  try {
    const {
      serviceType,
      title,
      description,
      // hall
      hallCapacity,
      hallPricePerHead,
      hallparking,
      hallcatering,
      halldecor,
      Location,
      venue,
      // catering
      cateringMenu,
      cateringminPerHead,
      cateringmaxPerHead,

      // dj
      djRate,
      djDuration,
      // photographers
      photographerStartingRange,
      photographerexpectedRange,
      adddtionalinformation,
      photographerPackage,

      // decorators

      decoratorminPrice,
      decoratormaxPrice,
      decorationtype,
      // car rental
      carType,
      carRentalPrice,
      carRentalDuration,
      Seats,
      Door,
      detailsproduct,
      Transmission,
      // general
      cancellation,
      staff,
      city,
      ratings,
    } = req.body;

    const userId = req.user._id;
    const images =
      req.files
        ?.filter((file) => file.mimetype.startsWith("image"))
        ?.map((file) => file.path) || [];
    const videos =
      req.files
        ?.filter((file) => file.mimetype.startsWith("video"))
        ?.map((file) => file.path) || [];
    const newVendor = new Vendor({
      user: userId,
      serviceType,
      title,
      description,
      images: images,
      videos: videos,
      venue,
      hallCapacity,
      hallPricePerHead,
      hallparking,
      hallcatering,
      halldecor,
      Location,
      cateringMenu: cateringMenu ? JSON.parse(cateringMenu) : [],
      cateringminPerHead,
      cateringmaxPerHead,

      // dj fields
      djRate,
      djDuration,

      // photographer fields
      photographerStartingRange,
      photographerexpectedRange,
      adddtionalinformation,
      photographerPackage,

      // decorator fields
      decoratorminPrice,
      decoratormaxPrice,
      decorationtype,
      carType,
      carRentalPrice,
      carRentalDuration,
      Seats,
      Door,
      Transmission,
      cancellation,
      detailsproduct: detailsproduct ? JSON.parse(detailsproduct) : [],
      staff,
      ratings,
      city,
    });

    await newVendor.save();

    res.status(201).json({
      success: true,
      message: "Vendor service uploaded successfully",
      data: newVendor,
    });
  } catch (error) {
    console.error("UploadProduct Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to upload vendor service",
      error: error.message,
    });
  }
};

export const fetchdata = async (req, res) => {
  try {
    const userId = req.user._id;
    const { search } = req.query;

    let filter = { user: userId };

    if (search && search.trim() !== "") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { serviceType: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const getdata = await Vendor.find(filter);

    res.status(200).json({
      success: true,
      message: "Vendor services fetched successfully ",
      data: getdata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor services ",
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

export const ProductUpdate = async (req, res) => {
  const productId = req.params.id;

  try {
    // Parse JSON fields from FormData
    const detailsproduct = req.body.detailsproduct
      ? JSON.parse(req.body.detailsproduct)
      : [];
    const staff = req.body.staff
      ? Array.isArray(req.body.staff)
        ? JSON.stringify(req.body.staff)
        : req.body.staff
      : "[]";
    const cateringServices = req.body.cateringServices
      ? JSON.parse(req.body.cateringServices)
      : {};
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    // Combine new uploaded files with existing images
    const images = [
      ...existingImages,
      ...(req.files
        ? req.files.map((f) => `uploads/${f.filename}`) // <- relative path
        : []),
    ];
    const existingVideos = req.body.existingVideos
      ? JSON.parse(req.body.existingVideos)
      : [];

    // Combine new uploaded files with existing images
    const videos = [
      ...existingVideos,
      ...(req.files
        ? req.files.map((f) => `uploads/${f.filename}`) // <- relative path
        : []),
    ];

    // Build the update object
    const updateFields = {
      ...req.body,
      detailsproduct,
      staff,
      cateringServices,
      images,
      videos,
    };

    // Remove fields that were JSON strings (avoid double stringification)
    delete updateFields.existingImages;
    delete updateFields.existingVideos;
    // Update the product
    const updatedData = await Vendor.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true, runValidators: true }, //mongoose validator check
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("updateProduct Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// getdata in fronted

export const getdata = async (req, res) => {
  try {
    const { serviceType, venue, city, search, businessName, maxPrice } =
      req.query;

    let filter = {};

    if (serviceType) {
      filter.serviceType = serviceType;
    }
    if (venue) {
      filter.venue = venue;
    }
    if (city) {
      filter.city = city;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    //  Vendor name filter (populate se)
    let userFilter = {};
    if (businessName) {
      userFilter.name = { $regex: businessName, $options: "i" }; // username → name
    }

    //  Sab vendors fetch karo with user populated
    let userdata = await Vendor.find(filter).populate({
      path: "user",
      match: userFilter,
      select: "name email",
    });

    userdata = userdata.filter((v) => v.user !== null);

    //  Price filter (serviceType ke hisaab se field check karo)
    if (maxPrice) {
      userdata = userdata.filter((vendor) => {
        switch (vendor.serviceType) {
          case "hall":
            return vendor.hallPricePerHead <= maxPrice;
          case "catering":
            return vendor.cateringPricePerHead <= maxPrice;
          case "dj":
            return vendor.djRate <= maxPrice;
          case "photographers":
            return vendor.photographerPrice <= maxPrice;
          case "decorators":
            return vendor.decoratorPrice <= maxPrice;
          case "carRental":
            return vendor.carRentalPrice <= maxPrice;
          default:
            return true;
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Get all data successfully",
      data: userdata,
    });
  } catch (error) {
    console.error("getdata error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getone = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Vendor.findById(id).populate("user");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched data",
      data: user,
    });
  } catch (error) {
    console.error("getone error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
