export default function FormElement({ children, label, message }) {
    return (
        <div className="form_element">
            <div className="form_element__label">{label}</div>
            {children}
            {message && <div className="form_element__message">{message}</div>}
        </div>
    )
}