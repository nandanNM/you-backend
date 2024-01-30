import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannlProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updatAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avater",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured route

router.route("/logout").post(varifyJWT, logoutUser); // done
router.route("/refresh-token").post(refreshAccessToken); // done
router.route("/change-password").post(varifyJWT, changeCurrentPassword); // done
router.route("/current-user").get(varifyJWT, getCurrentUser); // done
router.route("/update-acount").patch(varifyJWT, updatAccountDetails); // done
router
  .route("/update-avater")
  .post(varifyJWT, upload.single("avater"), updateUserAvatar); // done
router
  .route("/update-coverImage")
  .post(varifyJWT, upload.single("coverImage"), updateUserCoverImage); // done
router.route("/channel/:userName").get(varifyJWT, getUserChannlProfile); //done
router.route("/weatchHistory").get(varifyJWT, getWatchHistory); //done

export default router;
