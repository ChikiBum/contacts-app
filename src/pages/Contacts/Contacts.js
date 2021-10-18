import {
    useEffect,
    useState
} from "react";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      color: 'red'
    },
  });

const useConatcts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoadind] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setLoadind(true);
        const getData = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/?results=200");
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
}

export const Contacts = (props) => {
    const classes = useStyles();
    const contacts = useConatcts();

    if (contacts.isLoading) {
        return <div > ...loading </div>
    }
    if (contacts.isError) {
        return <div > ...Error!! </div>
    }
    
    return <>
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <div className={classes.root}> Contacts: {contacts.data[0].name.first} </div>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div> Contacts: {contacts.data[1].name.first} </div>
            </Grid>
        </Grid>
    </Container>
    
    </>    
};

