import { SECRETE_KEY } from "../config/config.js";
import crypto from "crypto-js";
import Models from "../model/index.js";
import  jwt  from "jsonwebtoken";
export const VerifyToken = (token) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(token, SECRETE_KEY, async (err, decode) => {
        if (err) reject(`err${err}`);
       
        const decriptToken = await DeCryptData(decode.id);

        if (!decriptToken) {
          reject("Error Decript");
        }
        let decript = decriptToken.replace(/"/g, "");
        const user = await Models.User.findById({ _id: decript });
        resovle(user);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const EnCryptData = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = crypto.AES.encrypt(data, SECRETE_KEY).toString();
      resovle(encrypt);
    } catch (error) {
      reject(error);
    }
  });
};
export const DeCryptData = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = crypto.AES.decrypt(data, SECRETE_KEY);
      let decriptPass = encrypt.toString(crypto.enc.Utf8);
      resovle(decriptPass);
    } catch (error) {
      reject(error);
    }
  });
};
export const jwts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const payload = {
        id: data.id,
        type: data.type,
      };
      var encryptRefresh = await EnCryptData(payload.id);
      const payload_refress = {
        id: encryptRefresh,
        type: data.type,
      };

      const jwtData = {
        expiresIn: 10000,
      };
      const jwtDataRefresh = {
        expiresIn: 100000,
      };
      //Generated JWT token with Payload and secret.
      const token = jwt.sign(payload, SECRETE_KEY, jwtData);
      const refreshToken = jwt.sign(
        payload_refress,
        SECRETE_KEY,
        jwtDataRefresh
      );

      resovle({ token, refreshToken });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
