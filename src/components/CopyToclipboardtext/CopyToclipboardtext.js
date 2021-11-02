import { useCopyToClipboard } from 'react-use';
import PropTypes from 'prop-types'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useState } from 'react';
import { ClickAwayListener } from '@mui/material';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: { 
        cursor: "pointer"
    },
    icon: {
        marginRight: theme.spacing(),
        fontSize: 'small'
    }
  })
);

const STATUS_COPY = {
    COPY: 'copy',
    COPIED: 'copied'
};

const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: 'copy',
    [STATUS_COPY.COPIED]: 'copied',
}

export const CopyToclipboardtext = ({ text }) => {
    const classes = useStyles();
    const [, copyToClipboard] = useCopyToClipboard();
    const [copiedValue, setCopiedValue] = useState(STATUS_COPY.COPY);


    const onClickCopy = useCallback(() => {
        copyToClipboard(text);
        setCopiedValue('copied');
    },[copyToClipboard, text]);


    const onClickAway = useCallback(() => {
        setCopiedValue('copy');
    },[setCopiedValue]);

    return (
    <ClickAwayListener onClickAway={onClickAway}>
        <Tooltip title={TITLE_BY_STATUS[copiedValue]}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
                className={classes.root}
                onClick={onClickCopy}
                // onMouseLeave={onMouseLeave}
                >
                <ContentCopyIcon className={classes.icon} fontSize="small"/>
                {text}
            </Box>
        </Tooltip>
    </ClickAwayListener>)
}

CopyToclipboardtext.propTypes = {
    text: PropTypes.string.isRequired,
}