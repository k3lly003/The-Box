import { Types  }  from "mongoose";

export interface Applicant {
    name: string;
    jobTitle: {
        type: string;
        required: true;
    };
    image: {
        type: string;
        required: true;
    };
    description: {
        type: string;
        required: true;
    };
    amount: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    };
    status: {
        type: String,
        enum: ['remote', 'onsite', 'Hybrid'],  
        default: 'Hybrid',
    }
    createdAt: string;
    updatedAt: string;
  }