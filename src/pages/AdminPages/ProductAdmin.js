import React from 'react';
import axios from 'axios';
import { Table, Button, NavItem, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap'

class ProductAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            imgIndex: 0,
            productIndex: null,
            modal: false,
            images: []
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

    printImagesForm = () => {
        return this.state.images.map((value, index) => {
            return <Input type="text" placeholder={`Image-${index + 1}`}
                onChange={(e) => this.handleImages(e, index)} />
        })
    }

    handleImages = (e, index) => {
        let temp = this.state.images
        temp[index] = e.target.value
        this.setState({ images: temp })
    }

    btAddProduct = () => {
        let nama = this.refs.nama.value
        let brand = this.refs.brand.value
        let kategori = this.refs.kategori.value
        let stock = parseInt(this.refs.stock.value)
        let harga = parseInt(this.refs.harga.value)
        let deskripsi = this.refs.deskripsi.value
        let images = this.state.images

        console.log(nama, brand, kategori, stock, harga, deskripsi, images)

        axios.post("http://localhost:2010/products", {
            nama, brand, kategori, stock, harga, deskripsi, images
        }).then((res) => {
            this.getProducts()
            this.setState({ modal: !this.state.modal })
        }).catch((err) => {
            console.log(err)
        })
    }

    btAddImage = () => {
        let temp = this.state.images
        temp.push("")
        this.setState({ images: temp })
    }

    render() {
        console.log("List Images", this.state.images)
        return (
            <div className="p-3">
                <h3 className="text-center">Products Management</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button color="success" outline type="button" onClick={() => this.setState({ modal: !this.state.modal })}>
                        Add Product
                    </Button>
                </div>
                {/* Modal untuk add product */}
                <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
                    <ModalHeader>Add Product</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Name</label>
                                <input type="text" className="form-control" ref="nama" />
                            </div>
                            <div className="form-group col-6">
                                <label>Brand</label>
                                <input type="text" className="form-control" ref="brand" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select className="form-control" ref="kategori">
                                        <option value={null}>Pilih Category</option>
                                        <option value="Mebel">Mebel</option>
                                        <option value="Accesories">Accesories</option>
                                        <option value="Pakaian">Pakaian</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input type="text" className="form-control" ref="stock" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" className="form-control" ref="harga" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" ref="deskripsi" />
                            </div>
                        </div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label>Images List</Label>
                            <Button type="button" outline color="warning" size="sm" onClick={this.btAddImage}>Add Image</Button>
                        </div>
                        {this.printImagesForm()}
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" outline color="success" onClick={this.btAddProduct}>Submit</Button>
                    </ModalFooter>
                </Modal>

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