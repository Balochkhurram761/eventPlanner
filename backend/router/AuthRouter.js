import express from "express";
import {
  getAllUser,
  login,
  Register,
  updatestatus,
} from "../controller/AuthController.js";
import {
  deleteproduct,
  fetchdata,
  getdata,
  getone,
  ProductUpdate,
  UploadProduct,
} from "../controller/Vendor.js";
import { authorizeRoles, tokenverify } from "../middleware/AuthMiddleWares.js";
import { upload } from "../middleware/UploadMiddleWare.js";
import { createBooking } from "../controller/BookingController.js";
import { generateDeals } from "../controller/AiController.js";

const router = express.Router();

router.post("/registerform", Register);
router.post("/login", login);
// start admin
router.get(
  "/dashbaoard/admin/getdata",
  tokenverify,
  authorizeRoles("admin"),
  getAllUser
);
router.put(
  "/updateStatus/:userId",
  tokenverify,
  authorizeRoles("admin"),
  updatestatus
);
// end admin
// start vendor
router.post(
  "/vendor/uploadproduct",
  tokenverify,
  upload.array("images", 10),
  authorizeRoles("vendor"),
  UploadProduct
);

router.get(
  "/vendor/fetchproduct",
  tokenverify,
  authorizeRoles("vendor"),
  fetchdata
);
router.delete(
  "/vendor/deleteproduct/:id",
  tokenverify,
  authorizeRoles("vendor"),
  deleteproduct
);
router.put(
  "/vendor/updateproduct/:id",
  upload.array("images"),
  tokenverify,
  authorizeRoles("vendor", "admin"),
  ProductUpdate
);

// getdata all in fronted

router.get("/getdata", getdata);
router.get("/getsingle/:id", getone);

//booking api backend

// ai integrate
router.post("/deals", generateDeals);
router.post("/bookevent", createBooking);

export default router;
