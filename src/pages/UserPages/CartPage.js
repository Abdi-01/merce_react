import React from 'react';
import { Button, Input, FormGroup, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCartAction } from '../../actions';
import { API_URL } from '../../helper';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCart: []
        }
    }

    componentDidMount() {
        this.getCart()
    }

    getCart = async () => {
        try {
            let token = localStorage.getItem("shopToken")
            if (token) {
                let res = await axios.get(`${API_URL}/transactions/get-cart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(res.data)
                this.setState({ dataCart: res.data })
            }
        } catch (error) {
            console.log(error)
        }
    }

    printCart = () => {
        return this.state.dataCart.map((item, index) => {
            return <div className="row shadow p-1 mb-3 bg-white rounded" >
                <div className="col-md-2">
                    <img src={item.url_image} width="100%" />
                </div>
                <div className="col-md-3 d-flex justify-content-center flex-column">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.name}</h5>
                    <h4 style={{ fontWeight: 'bolder' }}>IDR. {item.price.toLocaleString()}</h4>
                </div>
                {/* <div className="col-md-1 d-flex align-items-center">
                    <h5 style={{ fontWeight: 'bolder' }}>{item.kategori}</h5>
                </div> */}
                <div className="col-md-5 d-flex align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <InputGroup style={{ width: "45%", marginLeft: "20px" }}>
                            <InputGroupAddon addonType="prepend">
                                <button type="button" className="btn btn-warning" onClick={() => this.btDec(index)}>-</button>
                            </InputGroupAddon>
                            <Input type="number" placeholder="qty" value={item.qty} disabled />
                            <InputGroupAddon addonType="append">
                                <button type="button" className="btn btn-warning" onClick={() => this.btInc(index)}>+</button>
                            </InputGroupAddon>
                        </InputGroup>
                        <h4>IDR. {(item.price * item.qty).toLocaleString()}</h4>
                    </div>
                    <Button color="warning" onClick={() => this.btDeleteCart(index)} style={{ border: 'none', float: 'right', marginLeft: "1vw" }} >Remove</Button>
                </div>
            </div>
        })
    }

    totalPayment = () => {
        let total = 0
        this.state.dataCart.forEach(item => total += item.qty * item.price)
        return { total: total + (total * 0.025), ongkir: total * 0.025 }
    }

    btDeleteCart = idx => {
        let temp = [...this.state.dataCart]
        temp.splice(idx, 1)
        this.setState({ dataCart: temp })
    }

    btInc = (idx) => {
        let { dataCart } = this.state
        let temp = [...dataCart]
        temp[idx].qty += 1
        this.setState({ dataCart: temp })
    }

    btDec = (idx) => {
        let { dataCart } = this.state
        let temp = [...dataCart]
        temp[idx].qty -= 1
        this.setState({ dataCart: temp })
    }

    btCheckOut = () => {
        let date = new Date()
        // data transaksi : idUser, username, date, totalPayment, note, detail : [cart], status:paid/unpaid
        // axios post => userTransactions
        axios.post("http://localhost:2010/userTransactions", {
            iduser: this.props.idUser,
            username: this.props.email,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            totalPayment: this.totalPayment().total,
            note: this.note.value,
            detail: this.props.cartUser,
            status: "Unpaid"
        }).then((res) => {
            // mereset data cart dari user
            this.props.updateCartAction([], this.props.idUser)
            alert("Checkout Berhasil")
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
                                <Input type="text" id="ongkir" disabled value={this.totalPayment().ongkir} innerRef={elemen => this.ongkir = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="note">Notes</Label>
                                <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button type="button" color="success" onClick={this.btCheckOut}>Checkout</Button>
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
        idUser: globalState.authReducer.iduser,
        email: globalState.authReducer.email
    }
}

export default connect(mapToProps, { updateCartAction })(CartPage);