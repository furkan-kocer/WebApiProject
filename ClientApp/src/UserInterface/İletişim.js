import { useState } from "react"
import DOMPurify from 'dompurify';
import Toast from "./Toastmessage";
import { useCart } from "../Apirequests/CartContext"
import Contactmessage from "./İletişimmesajı"
export default function İletişim() {
    const [contactdata, setcontactdata] = useState({
        isimsoyisim: "",
        emailadresi: "",
        mesaj: ""
    });
    const { toastactive, settoastactive, Setcounter, settoastmessage, setsuccessornot } = useCart();
    const [message, setmessage] = useState("");
    function handlechange(event) {
        const { value, name } = event.target;
        setcontactdata(prev => {
            return {
                ...prev,
                [name]: DOMPurify.sanitize(value.trimStart().replace(/\s+/g, ' '))
            }
        })
    }
    const [Loadingcontact, setLoadingcontact] = useState(false);
    function handlesubmit(event) {
        event.preventDefault();
        var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (contactdata.emailadresi === "" || contactdata.isimsoyisim === "" || contactdata.mesaj === "") {
            setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (!contactdata.emailadresi.match(pattern)) {
            setmessage("* Girilen mail geçerli değil. Lütfen geçerli mail giriniz.");
        }
        else {
            setmessage("");
            console.log(contactdata);
            setLoadingcontact(true);
            postcontactapi();
        }
    }
    const datacontact = {
        Email: contactdata.emailadresi,
        NameandSurname: contactdata.isimsoyisim,
        Message: contactdata.mesaj,
    };
    async function postcontactapi() {
        try {
            const response = await fetch(`/emailsend`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datacontact)
            });
            if (response.ok) {
                setcontactdata(prevdata => {
                    return {
                        ...prevdata,
                        isimsoyisim: "",
                        emailadresi: "",
                        mesaj: ""
                    }
                })
                setLoadingcontact(false);
                Setcounter(5);
                settoastactive(true);
                setsuccessornot("başarılı");
                settoastmessage("İsteğiniz başarıyla iletildi.");
            }
            else {
                setLoadingcontact(false);
                Setcounter(5);
                settoastactive(true);
                setsuccessornot("başarısız");
                settoastmessage("Email gönderimi başarısız oldu.");
            }
        }
        catch (error) {
            console.error(`Hata oluştu : ${error}`);
        }
    }
    return (
        <>
            {toastactive && <Toast />}
            {Loadingcontact && <Contactmessage />}
            <div className="col-5 iletişim my-5 mx-auto">
                <div className="top-body1 text-center">
                    <p className="fs-5 iletişimçizgi">
                        <span className="text-uppercase px-5">İletişim</span>
                    </p>
                    <p className="text-secondary">Aşağıdaki formu kullanarak iletişime geçebilirsiniz.</p>
                </div>
                <form onSubmit={handlesubmit}>
                    <div className="mb-4">
                        <label htmlFor="isimsoyisim" className="form-label text-secondary">İsim-Soyisim</label>
                        <input type="text" className="form-control rounded-1" id="isimsoyisim" maxLength="40"
                            name="isimsoyisim"
                            value={contactdata.isimsoyisim}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="emailadresi" className="form-label text-secondary">E-Mail Adresi</label>
                        <input type="text" className="form-control rounded-1" id="emailadresi" maxLength="60"
                            name="emailadresi"
                            value={contactdata.emailadresi}
                            onChange={handlechange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mesaj" className="form-label text-secondary">Mesajınız</label>
                        <textarea type="text" className="form-control rounded-1" id="mesaj" maxLength="200"
                            name="mesaj"
                            value={contactdata.mesaj}
                            onChange={handlechange}
                        />
                    </div>
                    <div className='text-capitalize text-start my-3 text-danger'>{message}</div>
                    <button type="submit" className="btn btn-primary w-100">Gönder</button>
                </form>
            </div>
        </>
    )
}