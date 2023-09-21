import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom';
import Data from "./UserInterface/Pages"
import NotFound from "./404"
import Layout from "./UserInterface/Layout"
import AdminLogin from "./AdminInterface/AdminLogin"
import AdminPanel from "./AdminInterface/AdminPanel"
import Accessdenied from "./Accessdenied"
import useToken from "./UseJWT"
import AdminLayout from "./AdminInterface/AdminLayout"
import Categories from "./AdminInterface/CategoryComponents/Categories"
import Product from "./AdminInterface/ProductComponents/Product"
import Advertise from "./AdminInterface/AdvertiseComponents/Advertise"
import { CartProvider } from './Apirequests/CartContext';
import { SearchProvider } from './Apirequests/SearchContext';
export default function App() {
    const { token, setToken } = useToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [validatepages, setvalidatepages] = useState(null);
    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);
    const navigate = useNavigate();
    function handleLogin(username) {
        setToken();
        setIsAuthenticated(true);
        if (localStorage.getItem("datausername") == null) {
            localStorage.setItem('datausername', username);
        }
        navigate('/AdminPanel/');
    }
    function handleLogout() {
        setIsAuthenticated(false);
        navigate('/adminlogin');
    }
    const dataelements = Data.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />
    })
    useEffect(() => {
        async function getawait() {
            const isauthenticate = await isAuthenticated;
            if (isauthenticate) {
                setvalidatepages(<AdminLayout islogout={handleLogout} />)
            }
            else {
                setvalidatepages(<Accessdenied />)
            }
        }
        getawait();
    }, [isAuthenticated])
    function modalactivate(scroll) {
        if (scroll) {
            document.body.classList.add('active-modal')
        } else {
            document.body.classList.remove('active-modal')
        }
    }

    return (
        <React.Fragment>
            <CartProvider>
                <SearchProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            {dataelements}
                        </Route>
                        <Route path="*" element={<NotFound />}></Route>
                        < Route path={"/adminlogin"} element={<AdminLogin islogin={handleLogin} isAuthenticated={isAuthenticated} navigate={navigate} />}></Route>
                        <Route element={validatepages}>
                            <Route path="/AdminPanel">
                                <Route index element={<AdminPanel />}></Route>
                                <Route path="Kategori" element={<Categories modalactivate={modalactivate} />}></Route>
                                <Route path="Product" element={<Product modalactivate={modalactivate} />}></Route>
                                <Route path="ReklamVitrin" element={<Advertise modalactivate={modalactivate} />}></Route>
                            </Route>
                        </Route>
                    </Routes>
                </SearchProvider>
            </CartProvider>
        </React.Fragment>
    );
}
