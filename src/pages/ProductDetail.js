import React from 'react';
import axios from 'axios';
import { Spinner, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail: {}
        }
    }

    componentDidMount() {
        // untuk mengambil data query yang ada pada URL
        console.table(this.props.location)
        console.table(this.props.match)
        this.getProductDetail()
    }

    getProductDetail = () => {
        axios.get(`http://localhost:2010/products${this.props.location.search}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ dataDetail: res.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }
    render() {
        let { dataDetail } = this.state
        return (
            <div className="row p-5">
                {
                    dataDetail.id &&
                    <>
                        <div className="col-md-7">
                            <img src={dataDetail.images[0]} width="100%" />
                        </div>
                        <div className="col-md-4">
                            <div >
                                <h4 style={{ fontWeight: "bolder" }}>{dataDetail.nama}</h4>
                                <h2 style={{ fontWeight: "bolder" }}>IDR. {dataDetail.harga.toLocaleString()}</h2>
                            </div>
                            <hr />
                            <div>
                                <label style={{ fontWeight: "bold" }}>Description</label>
                                <p style={{ textAlign: "justify" }}>{dataDetail.deskripsi}</p>
                            </div>
                            <hr />
                            <div>
                                <label style={{ fontWeight: "bold" }}>Stock</label>
                                <p style={{ textAlign: "justify" }}>{dataDetail.stock.toLocaleString()}</p>
                            </div>
                            <hr />
                            <div className="d-flex mb-3">
                                <label style={{ fontWeight: "bold" }}>Amount Buy :</label>
                                <InputGroup style={{width:"30%", marginLeft:"20px"}}>
                                    <InputGroupAddon addonType="prepend">
                                        <button className="btn btn-warning">-</button>
                                    </InputGroupAddon>
                                    <Input placeholder="qty" />
                                    <InputGroupAddon addonType="append">
                                        <button className="btn btn-warning">+</button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                            <button className="btn btn-success" style={{ width: "100%" }}>Add To Cart</button>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default ProductDetail;