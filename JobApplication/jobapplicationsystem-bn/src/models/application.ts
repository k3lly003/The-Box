import mongoose, { Schema, model } from "mongoose";
import { Applicant } from "../types/jobPost";

const ApplicantSchema = new Schema<Applicant>(
  {
    name: {
      type: Schema.Types.String,
    },
    jobTitle: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  { timestamps: true }
)

export const Applicants = model<Applicant>("Applicant", ApplicantSchema);
