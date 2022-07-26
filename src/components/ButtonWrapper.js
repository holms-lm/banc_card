import Button from '@mui/material/Button';

export default function ButtonWrapper({  type, disabled, text, onClick }) {
    return (
        <Button
            variant="contained"
            color="primary"
            type={ type }
            disabled={ disabled }
            className="button"
            onClick={ onClick }
        >
            { text }
        </Button>
    )
}