import React from 'react';
import Form from '../Form';
import Card from '../Card/Card';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formData: { number: '################', name: '', expires: 'MM/YY' }};
        this.printDataCard = this.printDataCard.bind(this);
    }

    printDataCard(data) {
        this.setState({ formData: data });
    }
    render() {
        const { number, name, expires } = this.state.formData;
        return (
            <div className="wrapper">
                <Card number={ number } name={ name } expires={ expires } />
                <Form printDataCard={ this.printDataCard }/>
            </div>
        )
    }
}

export default Wrapper;