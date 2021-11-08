import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { CopyToclipboardtext } from '../../../components/CopyToclipboardtext/CopyToclipboardtext';
import { NATIONALITIE_HUMAN_NAME } from '../../../constants/nationalities'

export const ContactsTable = ({data}) => {
    // return <div > Contacts: {data[0].name.first} </div>
  return (
      <TableContainer component={Paper} data-testid='contacts-table-container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Nationality</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((contact) => (
              <TableRow
                key={contact.login.uuid}
              >
                <TableCell component="th" scope="row">
                  {contact.picture.medium ? 
                  <Avatar alt={contact.name.first} src={contact.picture.thumbnail} /> :
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>{contact.name.first}</Avatar>}
                </TableCell>
                <TableCell align="center">
                    {contact.name.title} 
                    {contact.name.first} 
                    {contact.name.last}
                  </TableCell>
                <TableCell align="center">
                  <Typography>
                    {format(new Date(contact.dob.date), "yyyy-MM-dd")},  
                    {contact.dob.age} years
                  </Typography>
                </TableCell>
                <TableCell align="center"><CopyToclipboardtext text={contact.email}/></TableCell>
                <TableCell align="center"><CopyToclipboardtext text={contact.phone}/></TableCell>

                <TableCell align="center">
                  { `/${contact.location.country}/
                    ${contact.location.postcode} ${contact.location.state}, ${contact.location.city},
                    ${contact.location.street.name}, ${contact.location.street.number}`}
                </TableCell>
                <TableCell align="center">{NATIONALITIE_HUMAN_NAME[contact.nat]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}