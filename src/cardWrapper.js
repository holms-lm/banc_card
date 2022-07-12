import React from 'react';
import Form from './Form';
import Card from './card';

class CardWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formData: {number: '################', name: '', expires: 'MM/YY'}};
        this.printDataCard = this.printDataCard.bind(this);
    }

    printDataCard(data) {
        this.setState({formData: data});
    }

    render() {
        return (
            <div>
                <div className="form_wrapper">
                    <Card number={this.state.formData.number} name={this.state.formData.name} expires={this.state.formData.expires} />
                    <Form printDataCard={this.printDataCard}/>
                </div>
            </div>
        )
    }
}

export default CardWrapper;