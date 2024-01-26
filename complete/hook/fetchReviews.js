import { useState, useEffect } from "react";
import axios from "axios";

const fetchReviews = (id) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`https://travelappbackend-production.up.railway.app/api/reviews/${id}`);

            setReviews(response.data)
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


    return {reviews, isLoading, error, refetch}
}

export default fetchReviews