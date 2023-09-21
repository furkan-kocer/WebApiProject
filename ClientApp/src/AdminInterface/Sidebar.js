import { NavLink } from "react-router-dom"
import { NavItem } from "reactstrap"
import logo from "../images/logo.png"
import adminpng from "../images/admin.png"
import "./sidebar.css"
export default function Sidebar({ islogout }) {
    function logout() {
        const text = "Çıkış Yapmayı Onaylıyor Musunuz?"
        if (window.confirm(text)) {
            localStorage.removeItem(
                'token');
            localStorage.removeItem(
                'datausername'
            ); 
            islogout();
        }    
    }
    const username = localStorage.getItem("datausername");
    return (
        <div className="sidebar bg-white px-3">
            <div className="d-flex justify-content-center p-4">
                <img src={logo} alt="iconhere" className="me-2" /> <span className="fs-2 my-auto logo-font">quality</span>
            </div>
            <p className="fw-semibold text-center my-3">Hoş geldiniz : {username}</p>
            <div className="d-flex my-2">
                <img src={adminpng} className="icon-image mx-auto" alt="adminiconhere"></img>
            </div>  
            <ul className="py-4 d-flex flex-column">
                <NavItem>
                    <NavLink to="/AdminPanel/" className="">
                        <i className="bi bi-house-door me-2"></i><span>Admin Panel</span></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/AdminPanel/Kategori" className="">
                        <i className="bi bi-grid-3x3-gap me-2"></i><span>Kategori</span></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/AdminPanel/ReklamVitrin" className="">
                        <i className="bi bi-badge-ad me-2"></i><span>Reklam</span></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/AdminPanel/Product" className="">
                        <i className="bi bi-box-seam me-2"></i><span>Ürün</span></NavLink>
                </NavItem>
                <NavItem>
                    <a className="pointer" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Çıkış Yap</a>
                </NavItem>
            </ul>
        </div>
    )
}