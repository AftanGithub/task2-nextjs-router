import { connectMongoDB } from "@/lib/mongodb";
import FlightInfo from "@/models/flightInfo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { flightNumber,origin,status,departure,destination } = await req.json();
    const data = new FlightInfo({ flightNumber,origin,status,departure,destination });
    const result = await data.save();
    console.log("new: ", result);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}


export async function GET(req) {
    try {
      await connectMongoDB();
      const data = await FlightInfo.find();
      
      return NextResponse.json({ data });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error });
      
    }
  }

export async function PUT(req){
  try {
     
    await connectMongoDB();
    const {status,id} = await req.json();
   
    await FlightInfo.findOneAndUpdate(
      { _id: id },
      { $set: { status: status } },
      { new: true }
    );

    return NextResponse.json({ message:"success" });
  
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message:"Something went wrong!" });
  }
}  





