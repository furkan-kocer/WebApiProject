import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer-wrapper bg-dark text-white">
            <div className="container d-flex justify-content-between mt-3">
                <div className="Kurumsal">
                    <p className="fs-3 border-bottom rounded border-2">Kurumsal</p>
                    <NavLink to="/hakkimizda" className="text-white">Hakkımızda</NavLink>
                </div>
                <div className="İletişim">
                    <span className="fs-3 border-bottom rounded pb-1 border-2">İletişim</span>
                    <div className="emailbox d-flex align-items-center mb-2 mt-3">
                        <i className="bi bi-envelope me-2 fs-4"></i>
                        <p className="my-auto">email@outlook.com.tr</p>
                    </div>
                    <div className="phonebox d-flex align-items-center mb-2">
                        <i className="bi bi-phone me-2 fs-4"></i>
                        <p className="my-auto">+91 - 9876543210</p>
                    </div>
                    <div className="socialmediabox d-flex align-items-center mb-2">
                        <a href="https://www.facebook.com" target="_blank" className="shadow bg-light rounded-circle fs-4 me-2 px-2 py-1"><i className="bi bi-facebook text-dark"></i></a>
                        <a href="https://www.twitter.com" target="_blank" className="shadow bg-light rounded-circle fs-4 me-2 px-2 py-1"><i className="bi bi-twitter text-dark"></i></a>
                        <a href="https://www.whatsapp.com" target="_blank" className="shadow bg-light rounded-circle fs-4 me-2 px-2 py-1"><i className="bi bi-whatsapp text-dark"></i></a>
                        <a href="https://www.instagram.com" target="_blank" className="shadow bg-light rounded-circle fs-4 px-2 py-1"><i className="bi bi-instagram text-dark"></i></a>
                    </div>
                </div>
               
            </div>  
            <div className="border-top border-secondary container d-flex justify-content-between mt-2">
                <p className="mt-2 copyright">Coded by Furkan Koçer</p>
                <span className="mx-2 mt-2 copyright">&#169; copyright 2023 - Present All Rights Reserved</span>
            </div>
        </div>
        )
}