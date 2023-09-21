import admicon from "../images/admin.png"
import logo from "../images/logo.png"
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
export default function Admin({ islogin, change2, setchange2, isAuthenticated, navigate}) {
    const [adminData, setAdminData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputvalue, Setvalue] = useState(
        {
            username: "",
            password: "",
            checkedcontrol: false
        }
    )
     async function fetchapi() {
        const response = await fetch('/loginadminpanel');
        const data = await response.json();
         setAdminData(data);
         setIsLoading(false);
    }
    useEffect(() => {
        fetchapi()
    }, []);
    const [message, Setmessage] = useState("")
    function handleChange(event) {
        const { name, value, type, checked } = event.target
        Setvalue(inputvalue => {
            return {
                ...inputvalue,
                [name]: type === "checkbox" ? checked : DOMPurify.sanitize(value.trim())
            }
        })
    }
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername && savedPassword) {
            Setvalue({
                username: savedUsername,
                password: savedPassword,
                checkedcontrol: true
            })
        }
    }, []);
    function handlelogin(event) {
        event.preventDefault();
        const value = adminData.some(data => data.userName === inputvalue.username && data.password === inputvalue.password);
        if (value) {
            if (inputvalue.checkedcontrol) {
               localStorage.setItem('username', inputvalue.username);
               localStorage.setItem('password', inputvalue.password);          
            }
            else if (inputvalue.checkedcontrol === false) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
            islogin(inputvalue.username);
        }
        else {
            Setvalue({
                username: "",
                password: "",
                checkedcontrol: false
            }
            )
            Setmessage("Kullanıcı Adı veya Şifre Hatalıdır.")
            if ((localStorage.getItem('username') && localStorage.getItem('password'))) {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
        }
    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/AdminPanel/');
        }
    }, [isAuthenticated]) 
    if (isLoading) {
        return (<div className="d-flex h-100 align-items-center justify-content-center">
            <div className="spinner-border spinner-border mx-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="my-auto fs-2">Yükleniyor...</p>
        </div>)
    }
    return (
        <div className="d-flex py-5 justify-content-center">
            <div className="row w-100 mx-3">
                <form className="col-sm-2 col-md-3 card mx-auto card-width" onSubmit={handlelogin}>
                    <div className="d-flex justify-content-center my-2">
                        <img src={logo} className="icon-image" alt="iconhere" /> <span className="fs-5 my-auto logo-font">quality</span>
                    </div>
                    <div className="top-body text-center my-3">
                        <h3 className=""><span className="text-uppercase">Admin Girişi</span></h3>
                        <img src={admicon} className="icon-image mt-2 mb-4" alt="adminiconhere"></img>
                    </div>
                    <div className="d-flex flex-column px-3 gap-2">
                        <div className="">
                            <label htmlFor="username" className="form-label fw-semibold">Kullanıcı Adı</label>
                            <input type="text" className="form-control" id="username" placeholder="adsoyadexample"
                                name="username"
                                value={inputvalue.username}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="">
                            <label htmlFor="pass" className="form-label fw-semibold">Şifre</label>
                            <input type="password" className="form-control" id="pass" placeholder="****"
                                name="password"
                                value={inputvalue.password}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"
                                checked={inputvalue.checkedcontrol}
                                onChange={handleChange}
                                name="checkedcontrol"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Beni Hatırla</label>
                        </div>
                        {message && <div className='text-danger'>{message}</div>}
                        <button type="submit" className="btn btn-primary my-3 text-uppercase fw-semibold">Giriş Yap</button>
                    </div>
                </form>
            </div>
        </div>
    )
}