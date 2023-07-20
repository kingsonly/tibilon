import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import DetailedPropertyCard from "../../components/DetailedPropertyCard";

export default function ClientProperties() {

    const [propertyData, setPropertyData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    useEffect(() => {
        bootstrap();
      }, []);
    
      /**
       * bootstrap is called tofetch all projects .
       */
      const bootstrap = async () => {
        setLoading(true)
        let token = localStorage.getItem("clienttoken");
        
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/clientadmin/allproperties`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLoading(false)
    
          setPropertyData(response.data.data);
        } catch (error) {
          setLoading(false)
          // Handle the error
          
        }
      };

  return (
    <div>
      <div className="flex flex-wrap mt-20 justify-between align-between">
          {loading && (
            <div className="flex items-center justify-center w-[100%] mb-[20px]">
              <CircularProgress />
            </div>
          )}

          {propertyData?.map((property) => (
            <div className="w-1/2">
              <DetailedPropertyCard
                project={property}
                
                //setproperty={setproperty}
              />
            </div>
          ))}
        </div>
    </div>
  );
}
