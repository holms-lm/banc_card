export default function Card(props) {
    function formatNumber(number) {
        let string = '';
        for (let i = 0; i < 5; i += 1) {
            string = string + number.substring(0, 4) + '  '
        }
        return string;
    }

    return (
        <div className='card'>
            <img src="img/card.jpg" alt="bg" className="card__image"/>
            <div className="card__content">
                <div className='card__number'>{formatNumber(props.number)}</div>
                <div className="card__footer">
                    <div>
                        <p className='card__title'>Card Holder</p>
                        <div className='card__name'>{props.name}</div>
                    </div>
                    <div>
                        <p className='card__title'>Expires</p>
                        <div className='card__name'>{props.expires}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}