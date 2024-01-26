import { useState, useEffect } from "react";
import axios from "axios";

const fetchDestinations = (id) => {
    const [places, setPlace] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`https://travelappbackend-production.up.railway.app/api/places/byCountry/${id}`);

            setPlace(response.data.places)
            setIsLoading(false)
        } catch (error) {
           setError(error) 
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch =() => {
        setIsLoading(true)
        fetchData();
    }


    return {places, isLoading, error, refetch}
}

export default fetchDestinations