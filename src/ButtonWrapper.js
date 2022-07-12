import Button from '@mui/material/Button';

export default function ButtonWrapper(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            type={props.type}
            disabled={props.disabled}
            className="button"
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    )
}