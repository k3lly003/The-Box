import { connectToDB } from "../../../utils/database";
import contactModel from "../../../model/contact";

export const POST = async (req: Request) => {
  try {
    const {
        name,
        email,
        image,
        number
    } = await req.json();

    await connectToDB();

    const newCourse = await contactModel.create({
        name,
        email,
        image,
        number
    });

    return new Response(
      JSON.stringify({
        message: "Contact saved successfully",
        course: newCourse,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: error.message || "Failed to save contact" }),
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const courses = await contactModel.find({});

    return new Response(JSON.stringify(courses, null, 2), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: error.message || "Failed to fetch contacts" }),
      { status: 500 }
    );
  }
};
