import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useConatcts } from './UseContacts';
import { ContactsTable } from './ContactsTable/ContactsTable';
import { ToogleDataViewMode } from './ToogleDataViewMode/ToogleDataViewMode';
import { DATA_VIEW_MODES } from './constants';
import { useDataViewMode } from './useDataViewMode';

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
    const [dataViewMode, setDataViewMode] = useDataViewMode();

  
    return <>
    <Container className={classes.root}>
        <Grid container >
          <Grid item xs={12} className={classes.headContainer} >
            <Box sx={{ display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between' }}>
              <Typography variant="h3" component="h1">
                  Contacts:
              </Typography>
              <ToogleDataViewMode
                dataViewMode={dataViewMode}
                setDataViewMode={setDataViewMode}
                />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {(() => {
              if (contacts.isLoading) {
                return <CircularProgress data-testid='contacts-loader'/>
              }
              if (contacts.isError) {
                return <div data-testid='contacts-error'> ...Error!! </div>
              }
              if (dataViewMode === DATA_VIEW_MODES.GRID){
                return <div data-testid='contacts-grid-container'>'grid'</div>  
              }
              if (dataViewMode === DATA_VIEW_MODES.TABLE){
                return <ContactsTable data={contacts.data}/>
              }
              return null;
            })()}
          </Grid>
        </Grid>
    </Container>
    </>    
};


