import { Button } from '@material-ui/core';

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