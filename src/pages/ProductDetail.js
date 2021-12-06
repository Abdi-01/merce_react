import React from 'react';
import axios from 'axios';
import { Spinner, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { updateCartAction } from "../actions"
import { Redirect } from 'react-router-dom';
import { API_URL } from '../helper';
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail: {},
            qty: 1,
            redirectToCart: false
        }
    }

    componentDidMount() {
        // untuk mengambil data query yang ada pada URL
        console.table(this.props.location)

        // untuk mengambil data params yang ada pada URL
        console.table(this.props.match)
        this.getProductDetail()
    }

    getProductDetail = () => {
        axios.get(`${API_URL}/products/get${this.props.location.search}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ dataDetail: res.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    btInc = () => {
        if (this.state.qty < this.state.dataDetail.stock) {
            this.setState({ qty: this.state.qty += 1 })
        } else {
            alert("Product out of stock ❌")
        }
    }

    btDec = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty -= 1 })
        }
    }

    handleQty = (e) => {
        if (this.state.qty < this.state.dataDetail.stock) {
            this.setState({ qty: parseInt(e.target.value) })
        } else {
            alert("Product out of stock ❌")
        }
    }

    btAddToCart = async () => {
        try {
            if (this.props.idUser) {
                let { dataDetail, qty } = this.state
                // let temp = [...this.props.cartUser]
                // temp.push({
                //     nama: dataDetail.nama,
                //     harga: dataDetail.harga,
                //     qty,
                //     subTotal: dataDetail.harga * qty,
                //     image: dataDetail.images[0]
                // })
                let res = await axios.post(`${API_URL}/transactions/add-cart`, {
                    idproduct: dataDetail.idproduct,
                    iduser: this.props.idUser,
                    qty
                })
                console.log(res.data)
                //     let res = await this.props.updateCartAction(temp, this.props.idUser)
                if (res.data.success) {
                    this.setState({ redirectToCart: true })
                    alert("Success Add To Cart ✅")
                }
            } else {
                alert("Login First !!!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { dataDetail, qty, redirectToCart } = this.state
        if (redirectToCart) {
            return <Redirect to="/cart" />
        }
        return (
            <div className="container p-2">
                <div className="row p-5">
                    {
                        dataDetail.idproduct &&
                        <>
                            <div className="col-md-7">
                                <img src={dataDetail.images[0].url} width="100%" />
                            </div>
                            <div className="col-md-4">
                                <div >
                                    <h4 style={{ fontWeight: "bolder" }}>{dataDetail.name}</h4>
                                    <h2 style={{ fontWeight: "bolder" }}>IDR. {dataDetail.price.toLocaleString()}</h2>
                                </div>
                                <hr />
                                <div>
                                    <label style={{ fontWeight: "bold" }}>Description</label>
                                    <p style={{ textAlign: "justify" }}>{dataDetail.description}</p>
                                </div>
                                <hr />
                                <div>
                                    <label style={{ fontWeight: "bold" }}>Stock</label>
                                    <p style={{ textAlign: "justify" }}>{dataDetail.stock.toLocaleString()}</p>
                                </div>
                                <hr />
                                <div className="d-flex mb-3">
                                    <label style={{ fontWeight: "bold" }}>Amount Buy :</label>
                                    <InputGroup style={{ width: "40%", marginLeft: "20px" }}>
                                        <InputGroupAddon addonType="prepend">
                                            <button type="button" className="btn btn-warning" onClick={this.btDec}>-</button>
                                        </InputGroupAddon>
                                        <Input type="number" placeholder="qty" value={qty} onChange={this.handleQty} />
                                        <InputGroupAddon addonType="append">
                                            <button type="button" className="btn btn-warning" onClick={this.btInc}>+</button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                                <button type="button" className="btn btn-success" style={{ width: "100%" }} onClick={this.btAddToCart}>Add To Cart</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapToProps = (globalState) => {
    return {
        cartUser: globalState.authReducer.cart,
        idUser: globalState.authReducer.iduser,
    }
}

export default connect(mapToProps, { updateCartAction })(ProductDetail);