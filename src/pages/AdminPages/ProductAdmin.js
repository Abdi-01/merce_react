import React from 'react';
import { Table } from 'reactstrap'
class ProductAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    getProducts = () => {

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

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductAdmin;