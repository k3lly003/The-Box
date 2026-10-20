// import { connectToDB } from "../../../../utils/database";
// import courseApplyModel from "../../../../models/courseApply";
// import { NextResponse } from "next/server";

// export const GET = async (_request, { params }) => {
//     const { id } = params;
//     await connectToDB();
//         const courseApplication = await courseApplyModel.findOne({ _id: id });
//         return NextResponse.json({ courseApplication }, { status: 200 });
// }

// export const PUT = async (req, res) => {
//     const courseApplicationId = req.params.id;
//     try {
//         await connectToDB();
//         const updatedCourseApplication = await courseApplyModel.findByIdAndUpdate({ courseApplicationId }, req.body);
//         res.status(200).json({ job: updatedCourseApplication });
//     } catch (error) { 
//         return res.status(500).json({ error: "Failed to update course application: "+error.message });
//     }
// }