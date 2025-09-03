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
  updateProduct,
  UploadProduct,
} from "../controller/Vendor.js";
import { authorizeRoles, tokenverify } from "../middleware/AuthMiddleWares.js";
import { upload } from "../middleware/UploadMiddleWare.js";

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
  "/vendor/updatproduct/:id",
  tokenverify,
  authorizeRoles("vendor", "admin"),
  upload.none(),
  updateProduct
);

export default router;
