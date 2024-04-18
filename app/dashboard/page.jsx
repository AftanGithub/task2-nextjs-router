"use client";
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation';
import FlightTable from '@/components/FlightTable/FlightTable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';


function DashboardPage() {
  const [flightData,setFlightData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const {data:session} = useSession();
 

  const getData = async ()=>{
    const response = await fetch("http://localhost:3000/api/flight",{method:"GET",next:{revalidate:30}});
    const result = await response.json()
    setFlightData(result?.data && result?.data?.length > 0  ? result?.data : []);
    // return result;
  }


setInterval(getData,60000);

  useEffect(()=>{
    let isMounted = true;
      const getData = async ()=>{
        const response = await fetch("http://localhost:3000/api/flight",{method:"GET",next:{revalidate:30}});
        const result = await response.json()
        setFlightData(result?.data && result?.data?.length > 0  ? result?.data : []);
        return result;
      }
      if(isMounted){
        getData();
      }
    
      return ()=>{
        isMounted = false;
      }
  },[])
 
 
 
  const generateRandomFlightData = () => {
    const origins = ["Nevada", "New York", "New Jersey","Hong Kong","Toronto","Paris"];
    const destinations = ["Tokyo", "New Delhi", "Beijing","California","New Delhi"];
    const statuses = ["Delayed", "Cancelled", "In-Flight","Scheduled"];
  
    const randomFlightNumber = Math.floor(Math.random() * 1000) + 1; // Generate a random flight number
    const randomOrigin = origins[Math.floor(Math.random() * origins.length)]; // Select a random origin
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)]; // Select a random destination
    const randomDeparture = new Date(Date.now() + Math.random() * 10000000000); // Generate a random departure date within the next ~115 days
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]; // Select a random status
    
    return {
      flightNumber: randomFlightNumber,
      origin: randomOrigin,
      destination: randomDestination,
      departure: randomDeparture,
      status: randomStatus
    };
  };



// Call the function to generate and save random flight data initially

const intervalId = setInterval(generateAndSaveRandomFlightData,30000);

let timeoutId;
  // Async function to generate and save random flight data
async function generateAndSaveRandomFlightData() {
 
 
  try {
    
    if(flightData.length < 40){
      // console.log("falling");
      // Generate random flight data
    const randomFlightData = generateRandomFlightData();
       // Create a new FlightInfo document with the generated data
    await fetch("http://localhost:3000/api/flight",
    {method:"POST",body:JSON.stringify(randomFlightData),headers:{
      'Content-Type': 'application/json'
    }})
   
   console.log('Random flight data saved successfully:', randomFlightData);
   updateStatusRandomly();
  
  
   clearTimeout(timeoutId);

   timeoutId = setTimeout(generateAndSaveRandomFlightData, 30000);
     
    }else{
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    }
   
     
   
  } catch (error) {
    console.error('Error saving random flight data:', error);
  }
}




// // // Function to generate a random status
const generateRandomStatus = () => {
  const statuses = ["Delayed", "Cancelled"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Async function to update the status randomly
async function updateStatusRandomly() {
 
  try {
    // Find a random document from the FlightInfo collection
    if(flightData.length===0){
      //console.log("falling");
      return;
    }
    // Generating a random status
    const newStatus = generateRandomStatus();
    const randomFlightItem = flightData[Math.floor(Math.random()*flightData.length)];
    if(randomFlightItem && randomFlightItem._id){
          // Updating the status of the random flight
          const response =  await fetch("http://localhost:3000/api/flight",{method:"PUT",
          body:JSON.stringify({status:newStatus,id:randomFlightItem._id}),
          headers:{
            'Content-Type': 'application/json'
          }})
          //console.log(response);
          console.log('Status updated successfully:', newStatus);
          const result = await response.json();
          
    }
   
    
  } catch (error) {
    console.error('Error updating status:', error);
  }
}






if(!session){
  redirect("/auth/signin");
}


const handleSearch = (e)=>{
  const query = e.target.value;
  const data = flightData.filter(item=>item.flightNumber===parseInt(query) 
  || item.origin.toLowerCase().match(query.toLowerCase()) 
  || item.destination.toLowerCase().match(query.toLowerCase()));
  setFilteredData(data);
  
}


const handleStatusFilter = (value)=>{
  if(value==="All"){
    setFilteredData([]);
    return;
  }
  const data = flightData.filter(item=>item.status===value);
  setFilteredData(data);
}

  if (session) {
    return (
      <div className='h-screen'>
        <div className={"flex py-5 px-5 items-center justify-between my-2"}>
           <div>
           <h3 className='text-2xl'>Flight Info</h3>
            <small>Total Records: {flightData.length}</small>
           </div>
           <Input className='w-75' onChange={handleSearch} placeholder='Search By Flight Number, Origin,Destination...' />
           <div>
           <Select onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter By Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="In-Flight">In-Flight</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                       
                        </SelectGroup>
                    </SelectContent>
                    </Select>
           </div>
        </div>
        
       <FlightTable data={JSON.parse(JSON.stringify(filteredData.length > 0 ? filteredData: flightData))} />
      </div>
    )
  }
 
}

export default DashboardPage