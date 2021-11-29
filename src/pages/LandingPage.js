import React from 'react';
import { Container } from 'reactstrap';
import CarousleHome from '../components/Carousle';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Container className="pt-4">
                    <CarousleHome />
                </Container>
            </div>
        );
    }
}

export default LandingPage;