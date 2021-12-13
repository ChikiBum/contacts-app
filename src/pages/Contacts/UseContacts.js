import {
    useEffect,
    useState
} from "react";

export const useConatcts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoadind] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setLoadind(true);
        const getData = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/?results=20");
                const { results, error } = await response.json();
                if (error){
                    throw new Error(error);
                }
                setData(results);
                setError(false);
            } catch (err){
                console.log('errerrerrerrerr: ', err);
                setError(true)
            } finally {
                setLoadind(false)
            }
        }
        getData();
    }, []);

    return{
        data,
        isLoading,
        isError
    }
};