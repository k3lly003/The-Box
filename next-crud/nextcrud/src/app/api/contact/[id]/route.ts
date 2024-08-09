import { connectToDB } from "../../../../utils/database";
import contactModel from "../../../../model/contact";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDB();
  const course = await contactModel.findOne({ _id: id });
  return NextResponse.json({ course }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const body = await request.json();
  const {
    name
  } = body;

  const index = contactModel.findIndex(
    (course) => course.id === parseInt(params.id)
  );

  contactModel[index].name = name;

  return NextResponse.json(contactModel[index], { status: 200 });
}