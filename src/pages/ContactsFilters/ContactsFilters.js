import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Clear from '@mui/icons-material/Clear';
import {NATIONALITIE_HUMAN_NAME} from '../../constants/nationalities';
import { memo, useCallback } from 'react';

const FieldFullName = memo(({value, onChange}) => {

    return(
        <TextField 
        name="FullName"
        label="FullName"  
        variant="outlined" 
        value={value}
        onChange={onChange}
        />
    )
})

const useFieldGenderStyles = makeStyles(() =>
  createStyles({
    fieldGender: {
      width: 120
    }
  })
);

const FieldGender = memo(({value, onChange}) => {
    const classes = useFieldGenderStyles();

    return(
    <FormControl className={classes.fieldGender}>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
            name="gender"
            labelId="gender"
            value={value}
            label="Gender"
            onChange={onChange}
        >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
        </Select>
    </FormControl>
    )
})

const useFieldNationalityStyles = makeStyles(() =>
  createStyles({
    fieldNationality: {
      width: 120
    }
  })
);

const FieldNationality = memo(({value, onChange}) => {
    const classes = useFieldNationalityStyles();

    return(
    <FormControl className={classes.fieldNationality}>
        <InputLabel id="nationality">Nationality</InputLabel>
        <Select
            name="nationality"
            labelId="nationality"
            value={value}
            label="nationality"
            onChange={onChange}
        >
            <MenuItem value="all">All</MenuItem>
            {Object.entries(NATIONALITIE_HUMAN_NAME).map(([key, name]) => (
                <MenuItem value={key} key={key}>
                    {name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    )
})

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldsContainer:{
    "& > *:not(:last-child)":{
        marginRight: theme.spacing(2)
        }  
    },
  })
);

export const ContactsFilters = memo(
     ({filters, updateFilter, clearFilters}) => {
    const classes = useStyles();

    const handleChangeFilter = useCallback((event) => {
        updateFilter(event.target.name, event.target.value)
      }, [updateFilter]);

    return (
    <Box  display = 'flex' justifyContent = 'space-between' >
        <Box  display = 'flex' className={classes.fieldsContainer}>
            <FieldFullName value={filters.FullName} onChange={handleChangeFilter} />
            <FieldGender value={filters.gender} onChange={handleChangeFilter} />
            <FieldNationality value={filters.nationality} onChange={handleChangeFilter} />
            
        </Box>
        <Button 
            size="small" 
            startIcon={<Clear />}
            onClick={clearFilters}
        >
            Clear
        </Button>
    </Box>)
});

ContactsFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired
}