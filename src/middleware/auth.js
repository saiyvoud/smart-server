import { SendError500, SendError401 } from "../service/response.js";
import { VerifyToken } from "../service/promise.js";

export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return SendError401(res, "invalidToken");
    }
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      return SendError401(res, "invalidToken");
    }
    const decode = await VerifyToken(token);
    req.user = decode._id;
    next();
  } catch (error) {
    console.log(error);
    return SendError500(res, "ServerFaild", error);
  }
};
