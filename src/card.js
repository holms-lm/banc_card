export default function Card(props) {
    return (
        <div className='card'>
            <div>{props.number}</div>
            <p>Card Holder</p>
            <div>{props.name}</div>
            <p>Expires</p>
            <div>{props.expires}</div>
        </div>
    )
}