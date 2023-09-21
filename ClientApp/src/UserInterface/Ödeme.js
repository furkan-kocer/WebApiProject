import { useState, useEffect } from "react"
import { useCart } from "../Apirequests/CartContext"
import getapi from "../Apirequests/Getapi"
import InputMask from "react-input-mask";
import Creditcartexample from "../ExampleCreditCard/Creditcartexample"
import Paymentmessage from "./İletişimmesajı"
import Toast from "./Toastmessage";
import {useNavigate} from "react-router-dom"
export default function Ödeme() {
    const { totalPrice, cart, setCartProducts, cartProducts, toastactive, settoastactive, Setcounter, settoastmessage, setsuccessornot, setpaymentsuccessfull } = useCart();
    const { getproductapi, saveproductdata, isLoadingpro } = getapi();
    useEffect(() => {
        getproductapi();
    }, [cart])
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
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [errorMessage3, setErrorMessage3] = useState("");
    const [isempty, setisempty] = useState(false);
    const [Loadingpayment, setLoadingpayment] = useState(false);
    const navigate = useNavigate();
    const [payment, setpayment] = useState({
        namesurname: "",
        email: "",
        adress: "",
        cardnumber: "",
        cardname: "",
        deadlinedate: "",
        securitycvc:""
    })
    //Alttaki fonksiyon sayesinde tek tek obje boş mu kontrolü yapmama gerek kalmıyor.
    const hasEmptyValue = (obj) => {
        return Object.values(obj).some((value) => value === "");
    };
    function handlesubmit(e) {
        e.preventDefault();
        var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (hasEmptyValue(payment)) {
            setisempty(true);
            setErrorMessage("*Lütfen tüm boş alanları doldurunuz.");
            setErrorMessage1("");
            setErrorMessage2("");
            setErrorMessage3("");
        }
        else if (!payment.email.match(pattern)) {
            setisempty(true);
            setErrorMessage("* Girilen mail geçerli değil. Lütfen geçerli mail giriniz.");
        }
        else if (payment.cardnumber.length < 16)
        {   
            setErrorMessage2("");
            setisempty(false);
            setErrorMessage1("*Kart numarası 16 haneden az olamaz!");
            setErrorMessage3("");
        }
        else if (payment.deadlinedate.length < 7) {
            setisempty(false);
            setErrorMessage1("");
            setErrorMessage2("");
            setErrorMessage3("*Lütfen geçerli son kullanma tarihi giriniz. Örneğin:12/2028");
        }
        else if (payment.securitycvc.length < 3) {
            setErrorMessage1("");
            setisempty(false);
            setErrorMessage2("*CVC 3 haneden az olamaz!");
            setErrorMessage3("");
        }
        else {
            setisempty(false);
            setErrorMessage1("");
            setErrorMessage2("");
            setErrorMessage3("");
            const check = Creditcartexample.some(data => data.Creditcardnumber === payment.cardnumber && data.Cardyear === payment.deadlinedate
                && data.CVC === payment.securitycvc && data.username.replace(/\s+/g, '').toLowerCase() === payment.cardname.replace(/\s+/g, '').toLowerCase());
            if (check) {
                setLoadingpayment(true);
                postpaymentapi();
            }
            else {
                setisempty(true);
                setErrorMessage("Hatalı kredi kart bilgileri lütfen tekrar deneyiniz.");
            }
          
        }
    }
    const productsInfo = cartProducts.map(product => ({
        product_title: product.product_title,
        brand: product.brand,
        quantity: product.quantity,
        definition: product.definition
    }));
    const datapayment = {
        Email: payment.email,
        NameandSurname: payment.namesurname,
        Address: payment.adress,
        Totalmoney: totalPrice,
        Productinfo: productsInfo
    };
    async function postpaymentapi() {
        //debugger;
        try {
            const response = await fetch(`/paymentsend`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datapayment)
            });
            if (response.ok) {
                setpayment(prevdata => {
                    return {
                        ...prevdata,
                        namesurname: "",
                        email: "",
                        adress: "",
                        cardnumber: "",
                        cardname: "",
                        deadlinedate: "",
                        securitycvc: ""
                    }
                })
                setLoadingpayment(false);
                Setcounter(5);
                settoastactive(true);
                setsuccessornot("başarılı");
                settoastmessage("Ödeme İşleminiz Başarıyla Gerçekleşmiştir.");
                setpaymentsuccessfull(true);
            }
            else {
                setpayment(prevdata => {
                    return {
                        ...prevdata,
                        namesurname: "",
                        email: "",
                        adress: "",
                        cardnumber: "",
                        cardname: "",
                        deadlinedate: "",
                        securitycvc: ""
                    }
                })
                setLoadingpayment(false);
                Setcounter(5);
                settoastactive(true);
                setsuccessornot("başarısız");
                settoastmessage("Ödeme İşlemi Başarısız Oldu.");
                setpaymentsuccessfull(false);
            }
        }
        catch (error) {
            console.error(`Hata oluştu : ${error}`);
            setpaymentsuccessfull(false);
        }
    }
    function handleChange(e) {
        const { value, name } = e.target;
        const isEmail = name === "email";
        const newValue =
            isEmail
                ? value.trim()
                : value.trimStart().replace(/\s+/g, " ");
        setpayment((prev) => {
            return {
                ...prev,
                [name]: newValue,
            }
        })
    }
    function handleChangecvc(e) {
        let { value, name } = e.target;
        if (value.length > 3) {
            value = value.slice(0, 3);
        }
        setpayment((prev) => {
            return {
                ...prev,
                [name]: value
                }
        })
    }
    function handleChangecardnumber(e) {
        let { value, name } = e.target;
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        setpayment((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const handleKeyPress = (e) => {
        const keyCode = e.which ? e.which : e.keyCode;
        if (keyCode < 48 || keyCode > 57) {
            e.preventDefault();
        }
    };
    if (isLoadingpro) {
        return (
            <div className="d-flex mt-4">
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Yükleniyor...</p>
            </div>
        )
    }
    return (
    <>
        {toastactive && <Toast />}
            {Loadingpayment && <Paymentmessage />}
            {(cart.length === 0) && navigate('/Sepetim')}
            {cartProducts.length > 0 && < div className="py-3 px-5 ödeme">
                <div className="d-flex">
                    <p className="w-50 fs-3">Teslimat Bilgileri</p>
                    <p className="w-50 fs-3">Ödeme Bilgileri</p>
                </div>
                <div className="border rounded">
                    <div className="d-flex border-bottom bg-light px-3">
                        <p className="w-50 my-2">Adres ve Kişi Bilgileri</p>
                        <p className="w-50 my-2 ps-3">Kart Bilgileri</p>
                    </div>
                    <form onSubmit={handlesubmit} className="">
                        <div className="d-flex">
                            <div className="w-50 p-4">
                                <div className="mb-2">
                                    <label htmlFor="isimsoyisim" className="form-label">İsim - Soyisim</label>
                                    <input type="text" className="form-control rounded-1" id="isimsoyisim" maxLength="40"
                                        onChange={handleChange}
                                        value={payment.namesurname}
                                        name="namesurname"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="form-label">E-mail Adresi</label>
                                    <input type="text" className="form-control rounded-1" id="email" maxLength="64"
                                        onChange={handleChange}
                                        value={payment.email}
                                        name="email"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="Adres" className="form-label">Adres</label>
                                    <textarea type="text" className="form-control rounded-1" id="Adres" maxLength="200"
                                        onChange={handleChange}
                                        value={payment.adress}
                                        name="adress"
                                    />
                                </div>
                            </div>
                            <div className="w-50 p-4">
                                <div className="mb-2">
                                    <label htmlFor="Kartnumarası" className="form-label mb-2">Kart Numarası</label>
                                    <input type="number" className="form-control rounded-1" id="Kartnumarası"
                                        onKeyPress={(e) => handleKeyPress(e)}
                                        onChange={handleChangecardnumber}
                                        value={payment.cardnumber}
                                        name="cardnumber"
                                        placeholder="xxxx-xxxx"
                                    />
                                    <p className="text-danger">{errorMessage1}</p>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="Kartkişiisim" className="form-label">Kart Üzerindeki İsim</label>
                                    <input type="text" className="form-control rounded-1" id="Kartkişiisim" maxLength="40"
                                        onChange={handleChange}
                                        value={payment.cardname}
                                        name="cardname"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="Sonkullanmatarihi" className="form-label">Son Kullanma Tarihi</label>
                                    <InputMask type="text" className="form-control rounded-1" id="Sonkullanmatarihi"
                                        mask="99/9999"
                                        maskChar={null}
                                        onChange={handleChange}
                                        value={payment.deadlinedate}
                                        name="deadlinedate"
                                        placeholder="Ay/Yıl"
                                    />
                                    <p className="text-danger">{errorMessage3}</p>
                                </div>
                                <div className="">
                                    <label htmlFor="Güvenlikkodu" className="form-label">Güvenlik Kodu</label>
                                    <input type="number" className="form-control rounded-1"
                                        onChange={handleChangecvc}
                                        onKeyPress={(e) => handleKeyPress(e)}
                                        value={payment.securitycvc}
                                        name="securitycvc"
                                        id="Güvenlikkodu" placeholder="CVC" />
                                    <p className="text-danger">{errorMessage2}</p>
                                </div>
                            </div>
                        </div>
                        {isempty && <p className="text-danger text-center">{errorMessage}</p>}
                        <div className="d-flex align-items-center justify-content-end mx-4 mb-4">
                            <p className="fs-5 me-2 m-0 fw-bold">Toplam Tutar : {totalPrice.toLocaleString('tr-TR')} TL</p>
                            <button type="submit" className="btn btn-dark">Ödeme</button>
                        </div>
                    </form>
                </div>
            </div>}
        </>
    )
}