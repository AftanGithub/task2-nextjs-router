import mongoose, { Schema, models } from "mongoose";

const flightSchema = new Schema(
  {
    flightNumber: {
      type: Number,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departure: {
        type: Date,
        required: true,
      },
    status: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const FlightInfo = models.FlightInfo || mongoose.model("FlightInfo", flightSchema);
export default FlightInfo;
