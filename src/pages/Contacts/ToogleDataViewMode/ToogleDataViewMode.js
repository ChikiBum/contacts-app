import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DATA_VIEW_MODES } from '../constants'


export const ToogleDataViewMode = ({dataViewMode , setDataViewMode}) => {
     const handleChangeDataViewMode = useCallback((_, nextView) => {
        setDataViewMode(nextView);
      }, [setDataViewMode]);

return ( 
    <ToggleButtonGroup
        orientation="horizontal"
        value={dataViewMode}
        exclusive
        onChange={handleChangeDataViewMode}
    >
        <ToggleButton 
            value={DATA_VIEW_MODES.GRID} 
            aria-label={DATA_VIEW_MODES.GRID}
            data-testid='toogle-dataviewmode-grid' 
        >
            <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton 
            value={DATA_VIEW_MODES.TABLE}  
            aria-label={DATA_VIEW_MODES.TABLE}
            data-testid='toogle-dataviewmode-table'  
        >
            <ViewListIcon />
        </ToggleButton>
    </ToggleButtonGroup>)
};

ToogleDataViewMode.propTypes  = {
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.GRID, DATA_VIEW_MODES.TABLE])
    .isRequired,
    setDataViewMode: PropTypes.func.isRequired
}