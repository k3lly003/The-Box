import { Applicants } from "../models/application";
import express, { Request, Response, NextFunction } from "express";
import { uploadFiles, dataUri } from "../services/services";
import { error } from "console";


declare global {
    namespace Express {
      interface Request {
        files?: [];
      }
    }
}

export const createApplication = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try{
        const application = await Applicants.create({
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            description: req.body.description,
          });
          if ("image" in req.files!) {
            const uploadedUserImage = req.files.image[0];
            const base64image = dataUri(uploadedUserImage);
            const cloudImg = await uploadFiles(
              base64image.content,
              { folder: "userImage" },
              function (err, result) {
                if (err) {
                  console.log("this is Cloudinary error", err);
                  return res.json({ msg: "DEBUGIIIII", err });
                }
                console.log("this is Cloudinary result", result);
                return result;
              }
            );
            application.image = cloudImg.url;
          } else {
            return res.status(400).json({ msg: "You must have an image" });
          }
    }catch(error){
      console.log("this is error from create an application", error);
      res.status(404);
      res.send({ error: "Applicantion does not exist!" });
    }
}