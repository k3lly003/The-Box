import { Types  }  from "mongoose";

export interface Applicant {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: string,
      unique: true,
    },
    phone: {
      type: string,
      required: true,
    },
    country: {
      type: string,
      required: true,
    },
    cv: {
      type: Buffer,
      required: true,
    },
    coverLetter: {
      type: Buffer,
      required: true,
    },
    createdAt: string,
    updatedAt: string,
  }