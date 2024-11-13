import { ApiResponse } from "../../helpers/response/apiresponse.js";
import { asyncHandler } from "../../helpers/response/asynchandler.js";
import { getStatusMessage } from "../../helpers/response/statuscode.js";
import { comparePassword } from "../../helpers/schema/passwordhash.js";
import { User } from "../../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { validRoles } from "../../constant.js";

export const loginUser = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { role, rollnumber, password, email } = req.body;
    if (!role || !password) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            getStatusMessage(400) + ": Please provide all the required fields"
          )
        );
    }

    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Invalid role. Please provide a valid role: admin, mess, or students"
          )
        );
    }

    let exist;
    if (role === "admin" || role === "mess") {
      if (!email) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              {},
              getStatusMessage(400) +
                ": email is required for the admin and mess in the body to logIN"
            )
          );
      }
      exist = await User.findOne({
        email: email,
        role: role,
      }).session(session);
    } else {
      if (!rollnumber) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              {},
              getStatusMessage(400) +
                ": rollNumber is required for the students in the body to logIN"
            )
          );
      }
      exist = await User.findOne({
        rollNumber: rollnumber,
      }).session(session);
    }

    if (!exist) {
      await session.abortTransaction();
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            {},
            getStatusMessage(401) +
              ": User is not registred. Please register first"
          )
        );
    }

    if (!(await comparePassword(password, exist.password))) {
      return res
        .status(403)
        .json(
          new ApiResponse(
            403,
            {},
            getStatusMessage(403) + ": Password is wrong"
          )
        );
    }

    const userDetails = {
      _id: exist._id,
      role: exist.role,
      email: exist.email,
    };

    const authToken = jwt.sign(
      { userDetails },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.SECRET_EXPIR_TIME }
    );

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { authToken },
          getStatusMessage(200) + ": User logged in successfully"
        )
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          getStatusMessage(500) + ": Internal server error"
        )
      );
  }
});
