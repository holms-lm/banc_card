export default function Button(props) {
    return (
        <button type={props.type}
                disabled={props.disabled}
                className="button"
                onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}