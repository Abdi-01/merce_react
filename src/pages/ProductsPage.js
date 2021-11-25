import React from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText, Badge } from 'reactstrap'
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';
class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get(`${API_URL}/products/get`)
            .then((res) => {
                // console.table(res.data)
                this.setState({ products: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    printProducts = () => {
        return this.state.products.map((value, index) => {
            return <div key={index} className="col-md-3 my-2">
                <Card>
                    <Link to={`/product-detail?idproduct=${value.idproduct}`} style={{textDecoration:"none", color:"black"}}>
                        <CardImg width="100%" src={value.images[0].url} alt={`image ${value.name}`} />
                        <CardBody>
                            <Badge color="info">{value.category}</Badge>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.name}</CardTitle>
                            <CardText tag="h5" className="text-right">IDR. {value.price.toLocaleString()}</CardText>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    render() {
        return (
            <div className="container row m-auto mt-5">
                {this.printProducts()}
            </div>
        );
    }
}

export default ProductPage;