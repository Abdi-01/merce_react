import React from 'react';
import axios from 'axios';
import { Table, Button, NavItem } from 'reactstrap'

class ProductAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            imgIndex: 0,
            productIndex: null
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
        // Destructering object state
        let { products, imgIndex, productIndex } = this.state

        return products.map((value, index) => {
            return <tr>
                <th>{index + 1}</th>
                <td className="text-center" style={{ width: "20vw" }}>
                    {
                        productIndex == index ?
                            <img src={value.images[imgIndex]} width="40%" alt={value.nama} />
                            :
                            <img src={value.images[0]} width="40%" alt={value.nama} />

                    }
                    <div className="pt-2">
                        {
                            value.images.map((val, idx) => {
                                return <img className="px-1" style={{ cursor: "pointer" }} src={val} width="15%" alt={value.nama + idx}
                                    onClick={() => this.setState({ imgIndex: idx, productIndex: index })}
                                />
                            })
                        }
                    </div>
                </td>
                <td>{value.nama}</td>
                <td>{value.brand}</td>
                <td>{value.kategori}</td>
                <td>{value.stock}</td>
                <td>IDR. {value.harga.toLocaleString()}</td>
                <td>
                    <Button type="button" color="warning" >Edit</Button>
                    <Button type="button" color="danger" outline>Delete</Button>
                </td>
            </tr>
        })
    }

    render() {
        return (
            <div className="p-3">
                <h3 className="text-center">Products Management</h3>
                <Table dark className="mt-4">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printProducts()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductAdmin;