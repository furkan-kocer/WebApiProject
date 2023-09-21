import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Getproductwithid from "../../Apirequests/Getipwithid"
import "./Productdetails.css"
import { useCart } from '../../Apirequests/CartContext';
import Toast from "../Toastmessage";
export default function Ürünler() {
    const { getproductdata, isLoadingpro, getproductapi } = Getproductwithid();
    const [productobject, setproductobject] = useState();
    const { addtocart, toastactive, settoastactive, Setcounter, settoastmessage, setsuccessornot } = useCart();
    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getproductapi(id);
    }, [id]);
    const [inputValue, setInputValue] = useState(1);
    function increase() {
        if (parseInt(inputValue) < 10 && parseInt(inputValue) >= 1) {
            setInputValue(prev => parseInt(prev) + 1);
        }
        else if (inputValue === "") {
            setInputValue(1);
        }
    }
    function decrease() {
        if (inputValue > 1) {
            setInputValue(prev => parseInt(prev) - 1);
        }
    }
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
            setInputValue(value);
        }
    }
    useEffect(() => {
        if (inputValue !== "") {
            setproductobject({
                id: id,
                quantity: parseInt(inputValue)
            })
        }
        else {
            setproductobject({
                id: id,
                quantity: 1
            })
        }
    }, [id, inputValue]);

    function handleadd() {
        if (inputValue === "") {
            setInputValue(1);
            Setcounter(5);
            settoastactive(true);
            setsuccessornot("başarısız");
            settoastmessage("ürün sayısı boş bırakılamaz");
        }
        else {
            addtocart(inputValue, productobject);
        }
    }
    if (isLoadingpro) {
        return (
            <div className="d-flex mt-4">
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p> Ürün yükleniyor...</p>
            </div>
        )
    }
    return (
        <>
            {toastactive && <Toast />}
            {getproductdata.status === "aktif" ?
                <div className="card border-0 my-4 shadow-sm üründetay">
                    <div className="row g-0">
                        <div className="col-lg-6 img-cover">
                            <img src={`imagespublic/ürünler/${getproductdata.img_url}`} alt="yok" className="w-100 h-100 rounded-start object-fit-cover" />
                        </div>
                        <div className="col-lg-6">
                            <div className="card-body ürünbilgileri">
                                <div className="d-flex flex-wrap">
                                    <p className="text-capitalize fs-5 mb-0 pb-0">{getproductdata.maincategory[0].categorytitle}</p>
                                    <p className="text-capitalize fs-5 mb-0 pb-0 text-nowrap">-{getproductdata.subcategory[0].subtitle}</p>
                                </div>
                                <p className="text-capitalize fs-2 mb-0 pb-0">{getproductdata.product_title}</p>
                                <p className="mt-0 pt-0 fw-bold mb-4">{getproductdata.brand}</p>
                                <p className="text-primary fw-bold fs-4 mb-4">{parseFloat(getproductdata.price).toLocaleString('tr-TR')} TL</p>
                                <div className="d-flex">
                                    <div className="d-flex align-items-center inputnum">
                                        <button type="button" className="btn btn-dark" onClick={decrease}>-</button>
                                        <input type="number" maxLength="2" className="form-control mx-1"
                                            value={inputValue} onChange={handleChange}></input>
                                        <button type="button" className="btn btn-dark me-2" onClick={increase}>+</button>
                                    </div>
                                    <button type="button" className="btn btn-dark" onClick={handleadd}>Sepete Ekle</button>
                                </div>
                                <p className="mt-4"><span className="fw-bold">Açıklama:</span> {getproductdata.definition}</p>
                            </div>
                        </div>
                    </div>
                </div> : navigate("*")
            }
        </>
    )

}