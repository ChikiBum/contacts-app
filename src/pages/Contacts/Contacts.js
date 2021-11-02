
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useConatcts } from './UseContacts';
import { ContactsTable } from './ContactsTable/ContactsTable';
import { CircularProgress } from '@mui/material';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4)
    },
    headContainer: {
      marginBottom: theme.spacing(3)
    }
  })
);

export const Contacts = (props) => {
    const classes = useStyles();
    const contacts = useConatcts();

    if (contacts.isLoading) {
        return <CircularProgress/>
    }
    if (contacts.isError) {
        return <div > ...Error!! </div>
    }
    

    return <>
    <Container className={classes.root}>
        <Grid container >
          <Grid item xs={12} className={classes.headContainer}>
            <Typography variant="h3" component="h1">
                Contacts:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <div > Contacts: {contacts.data[0].name.first} </div> */}
            <ContactsTable data={contacts.data}/>
          </Grid>
        </Grid>
    </Container>
    
    </>    
};


