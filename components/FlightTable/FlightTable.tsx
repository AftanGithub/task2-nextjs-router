"use client";
import { PackageOpen } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import dayjs from "dayjs";
import { UpdateStatus } from "./UpdateStatus";

type flightData = {
    flightNumber: number,
    origin: string,
    destination: string,
    departure: string
    status:string
} 

type propType = {
    data:flightData[]
}

const FlightTable = (props:propType) => {
    const {data} = props;

    const onStatusChange = async (value:string,item:any)=>{
        UpdateStatus(value,item);
    }


    const getFormattedDate = (departure:string)=>{
        const timestamp = departure;
        const date = new Date(timestamp);

        const formattedDate = dayjs(date).format('ddd, MMMM D, YYYY [at] hh:mm A');
        return formattedDate;
    }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-sm sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black  xl:pl-11">
                Flight Number
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                Origin
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                Destination
              </th>
              <th className="py-4 px-4 font-medium text-black ">
                Departure
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9">
                  <h5 className="font-medium text-black">
                    {item.flightNumber}
                  </h5>
                 
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <p className="text-black">
                    {item.origin}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <p className="text-black">
                    {item.destination}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <p className="text-black">
                    {getFormattedDate(item.departure)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status === "In-Flight"
                        ? "text-green-500 bg-green-200"
                        : item.status === "Cancelled"
                        ? "text-red-500 bg-red-200"
                        : item.status === "Scheduled" ? "text-blue-500 text-blue-200" : "text-yellow-500 bg-yellow-400"
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <div className="flex items-center space-x-3.5">
                  <Select onValueChange={(value:string)=>onStatusChange(value,item)} value={item.status}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                       
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="In-Flight">In-Flight</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                       
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
            )):
            <tr>
                <td colSpan={6}>
                <div className="flex items-center flex-col justify-center">
                    <PackageOpen color="lightgray"  size={"150"} className="m-5 mb-2" />
                    <small className="text-gray-400 ">No Flight Data</small>
                </div>
                </td>
            </tr>
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightTable;
