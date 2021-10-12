import React from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText, Badge } from 'reactstrap'
import { Link } from 'react-router-dom';
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
        axios.get("http://localhost:2010/products")
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
                    <Link to={`/product-detail?id=${value.id}`} style={{textDecoration:"none", color:"black"}}>
                        <CardImg width="100%" src={value.images[0]} alt={`image ${value.nama}`} />
                        <CardBody>
                            <Badge color="info">{value.kategori}</Badge>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                            <CardText tag="h5" className="text-right">IDR. {value.harga.toLocaleString()}</CardText>
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