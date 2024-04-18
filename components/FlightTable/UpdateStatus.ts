"use server";

import FlightInfo from "@/models/flightInfo";
import { revalidatePath } from "next/cache";

export const UpdateStatus = async (value:string,item:any)=>{
    
 await FlightInfo.findOneAndUpdate(
  { _id: item._id },
  { $set: { status: value } },
  { new: true }
  
);
console.log("Flight data updated!");
    revalidatePath('/');

}