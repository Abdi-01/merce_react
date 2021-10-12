import React from 'react';
import axios from 'axios';
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail: {}
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        // untuk mengambil data query yang ada pada URL
        console.log(this.props.location.search)
        axios.get(`http://localhost:2010/products${this.props.location.search}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ dataDetail: res.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                Product Detail
            </div>
        );
    }
}

export default ProductDetail;