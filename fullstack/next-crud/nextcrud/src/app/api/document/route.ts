import { connectToDB } from "../../../utils/database";
import docModel from "../../../model/doc";

export const POST = async (req: Request) => {
  try {
    const { name, file, shortNote } = await req.json();

    await connectToDB();

    const newDocument = await docModel.create({
        name, file, shortNote
    });

    return new Response(
      JSON.stringify({
        message: "Document saved successfully",
        course: newDocument,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: error.message || "Failed to save document" }),
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const courses = await docModel.find({});

    return new Response(JSON.stringify(courses, null, 2), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: error.message || "Failed to fetch documents" }),
      { status: 500 }
    );
  }
};
