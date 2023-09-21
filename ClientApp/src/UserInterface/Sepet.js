import { useEffect} from "react";
import getapi from "../Apirequests/Getapi"
import {useNavigate} from "react-router-dom"
import { useCart } from '../Apirequests/CartContext';
import Toast from "./Toastmessage";
export default function Sepetim() {
    const navigate = useNavigate();
    const { getproductapi, saveproductdata, isLoadingpro } = getapi();
    const { deletefromcart, cart, setQuantity, toastactive, incrementQuantity, decrementQuantity, removeallcart, totalPrice, setCartProducts, cartProducts } = useCart();
    useEffect(() => {
        getproductapi();
    }, [cart])
    console.log(totalPrice);
    useEffect(() => {
        // cartItems dizisi ile eşleşen ürünleri filtreleme işlemi
        if (!isLoadingpro && cart) {
            const productsInCart = saveproductdata.filter((product) => {
                const cartItem = cart.find((item) => parseInt(item.id) === product.product_Id);
                if (cartItem) {
                    return true;
                }
            }).map((product) => {
                const cartItem = cart.find((item) => parseInt(item.id) === product.product_Id);
                const quantity = cartItem.quantity;
                return { ...product, quantity };
            }
            );
            setCartProducts(productsInCart);
        }
    }, [saveproductdata, isLoadingpro, cart]);
    function sendorder() {
        navigate("/Odeme");
    }
    const Sepetboş = () => {
        return (
            <div className="w-100 d-flex mt-4 p-4 justify-content-between shadow rounded align-items-center">
                <div className="d-flex align-items-center">
                    <i className="bi bi-cart2 fs-1 bg-dark text-white rounded-circle px-3 py-2 mx-2"></i>
                    <p className="fs-5 m-0 p-0 fw-semibold">Sepetinde ürün bulunmamaktadır.</p>
                </div>
                <div>
                    <button className="btn btn-dark px-5 py-3 fs-5" onClick={()=> navigate("/") }>Alışverişe Başla</button>
                </div>
            </div>
        )
    }
    const Sepetyükleniyor = () => {
        return (
            <div className="d-flex mt-2">
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p> Sepetim yükleniyor...</p>
            </div>
            )
    }
    return (
        <>
            {toastactive && <Toast />}
            {isLoadingpro && <Sepetyükleniyor />}
            {cartProducts.length === 0 ? (!isLoadingpro && <Sepetboş />)  :
                <div className="position-relative">
                    <h1 className="mt-3">Sepetim</h1>
                    {cartProducts.length > 1 && <div className="w-70">
                        <button className="btn btn-danger float-end mb-2" onClick={removeallcart}>Tümünü Sil</button>
                    </div>}
                    <div className="d-flex wrapper w-100 my-2">
                        <div className="card-wrapper">
                            {cartProducts.map(item => (
                                <div className="card cart mb-4" key={item.id}>
                                    <ul className="d-flex align-items-center justify-content-between m-0 p-0">
                                        <li className="imgwrap m-0 p-0">
                                            <img className="img-fluid w-100 h-100 rounded-start object-fit-cover" src={`imagespublic/ürünler/${item.img_url}`} alt="yok" />
                                        </li>
                                        <li className="w-25 text-center">{item.product_title}</li>

                                        <li className="d-flex align-items-center w-20">
                                            <button type="button" className="btn btn-dark" onClick={() => decrementQuantity(item)}>-</button>
                                            <input type="number" className="form-control mx-2"
                                                value={item.quantity}
                                                onChange={(e) => setQuantity(item, e.target.value)}
                                            ></input>
                                            <button type="button" className="btn btn-dark" onClick={() => incrementQuantity(item)}>+</button>
                                        </li>
                                        <li className="w-10 text-center">{`${(item.quantity * parseFloat(item.price)).toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits:3 })} TL`}</li>
                                        <li className="me-3">
                                            <button className="btn btn-danger" onClick={() => deletefromcart(item.product_Id)}>
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ))
                            }
                        </div>
                        <div className="card mx-auto position-sticky">
                            <p className="fs-3 bg-dark text-white p-3 rounded-top">Sipariş Özeti</p>
                            <p className="fs-3 fw-bold mx-2">Toplam</p>
                            <p className="mx-3">Toplam Tutar :<span className="text-primary fw-bold mx-2">{totalPrice.toLocaleString('tr-TR')} TL</span></p>
                            <button className="btn btn-dark p-3 m-3" onClick={sendorder}>Siparişi Tamamla</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}