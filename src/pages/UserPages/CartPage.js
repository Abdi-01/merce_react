import React from 'react';
import { Button, Input, FormGroup, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCartAction } from '../../actions';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printCart = () => {
        return this.props.cartUser.map((item, index) => {
            return <div className="row shadow p-1 mb-3 bg-white rounded" >
                <div className="col-md-2">
                    <img src={item.image} width="100%" />
                </div>
                <div className="col-md-3 d-flex justify-content-center flex-column">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.nama}</h5>
                    <h4 style={{ fontWeight: 'bolder' }}>IDR. {item.harga.toLocaleString()}</h4>
                </div>
                {/* <div className="col-md-1 d-flex align-items-center">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.kategori}</h5>
                </div> */}
                <div className="col-md-5 d-flex align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <InputGroup style={{ width: "45%", marginLeft: "20px" }}>
                            <InputGroupAddon addonType="prepend">
                                <button type="button" className="btn btn-warning" onClick={this.btDec}>-</button>
                            </InputGroupAddon>
                            <Input type="number" placeholder="qty" defaultValue={item.qty} />
                            <InputGroupAddon addonType="append">
                                <button type="button" className="btn btn-warning" onClick={this.btInc}>+</button>
                            </InputGroupAddon>
                        </InputGroup>
                        <h4>IDR. {(item.harga * item.qty).toLocaleString()}</h4>
                    </div>
                    <Button color="warning" onClick={() => this.btDeleteCart(index)} style={{ border: 'none', float: 'right', marginLeft: "1vw" }} >Remove</Button>
                </div>
            </div>
        })
    }

    totalPayment = () => {
        let total = 0
        this.props.cartUser.forEach(item => total += item.qty * item.harga)
        return { total: total + (total * 0.025), ongkir: total * 0.025 }
    }

    btDeleteCart = idx => {
        let temp = [...this.props.cartUser]
        temp.splice(idx, 1)
        axios.patch(`http://localhost:2010/users/${this.props.idUser}`, {
            cart: temp
        })
            .then((res) => {
                this.props.updateCartAction(res.data.cart)
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="p-5">
                <h1 className="text-center mt-5">Keranjang Belanja</h1>
                <div className="row m-1">
                    <div className="col-8">
                        {this.printCart()}
                    </div>
                    <div className="col-4">
                        <div className="shadow p-4 mb-3 bg-white rounded">
                            <h3 style={{}}>Total Payment</h3>
                            <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment().total.toLocaleString()}</h2>
                            <FormGroup>
                                <Label for="ongkir">Biaya Pengiriman</Label>
                                <Input type="text" id="ongkir" defaultValue={'Rp. ' + this.totalPayment().ongkir.toLocaleString()} innerRef={elemen => this.ongkir = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="note">Notes</Label>
                                <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button type="button" color="success" onClick={this.onBtCheckOut}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Untuk mengambil data cart dari reducer atau globalstorage
const mapToProps = (globalState) => {
    return {
        cartUser: globalState.authReducer.cart,
        idUser: globalState.authReducer.id,
    }
}

export default connect(mapToProps, { updateCartAction })(CartPage);