import express from "express";
import {
  getOneVendorData,
  login,
  putvendorOneupdate,
  Register,
  verifyEmail,
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
import { getAllUseradmin, updateVendorStatus } from "../controller/Admin.js";

const router = express.Router();

router.post("/registerform", upload.single("registrationLetter"), Register);
router.post("/login", login);
// start admin
router.get(
  "/dashbaoard/admin/getdata",
  tokenverify,
  authorizeRoles("admin"),
  getAllUseradmin,
);
router.put(
  "/updateStatus/:userId",
  tokenverify,
  authorizeRoles("admin"),
  updateVendorStatus,
);
// end admin
// start vendor
router.post(
  "/vendor/uploadproduct",
  tokenverify,
  authorizeRoles("vendor"),
  upload.array("files", 10),
  UploadProduct,
);

router.get(
  "/vendor/fetchproduct",
  tokenverify,
  authorizeRoles("vendor"),
  fetchdata,
);
router.delete(
  "/vendor/deleteproduct/:id",
  tokenverify,
  authorizeRoles("vendor"),
  deleteproduct,
);
router.put(
  "/vendor/updateproduct/:id",
  tokenverify,
  authorizeRoles("vendor"),
  upload.array("files", 10),
  ProductUpdate,
);
router.get(
  "/vendor/getvendordata/:id",
  tokenverify,
  authorizeRoles("vendor", "admin"),

  getOneVendorData,
);
router.put(
  "/vendor/putvendordata/:id",
  upload.single('image'),
  tokenverify,
  authorizeRoles("vendor", "admin"),
  putvendorOneupdate,
);

// getdata all in fronted

router.get("/getdata", getdata);
router.get("/getsingle/:id", getone);

//booking api backend

// ai integrate
router.post("/deals", generateDeals);
// booking
router.post("/bookevent", createBooking);
// verify email
router.get("/verify-email/:token", verifyEmail);
export default router;
