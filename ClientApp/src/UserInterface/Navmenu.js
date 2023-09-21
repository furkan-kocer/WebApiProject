import { Link, NavLink } from "react-router-dom";
import { NavItem } from "reactstrap"
import logo from "../images/logo.png"
import "./Navbar.css"
import Getapi from "../Apirequests/Getcategoryapi"
import { useCart } from '../Apirequests/CartContext';
import Toast from "./Toastmessage";
import DOMPurify from 'dompurify';
import { useSearch } from '../Apirequests/SearchContext'
export default function NavigationUser() {
    const { isLoading, subcategoriesdata } = Getapi();
    const { setQuery, query, handlesearch } = useSearch();
    const { cartItemsCount, toastactive } = useCart();
    const saveactivesubcategoriesdata = subcategoriesdata.filter(item => item.category.status === "aktif");
    return (
        <>
            <header className="shadow-sm header bg-white">
                <div className="container pt-4 pb-2">
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="d-flex align-items-center text-decoration-none text-dark mx-5">
                            <img src={logo} alt="logo" /><span className="my-auto fs-2 logo-font">quality</span>
                        </Link>
                        <form className="d-flex position-relative align-self-center w-50">
                            <input className="form-control t-indent rounded-4" type="search" placeholder="Ürün, kategori veya marka ara" aria-label="Search"
                                value={query}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setQuery(DOMPurify.sanitize(value.trimStart().replace(/[^\p{L}0-9-\s]+/gu, '')))
                                }}
                            />
                            <button className="dontshow" type="submit" onClick={handlesearch}>
                                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y px-2"></i>
                            </button>
                        </form>
                        <Link to="/Sepetim" className="text-decoration-none text-dark d-flex align-items-center position-relative mx-5">
                            <i className="bi bi-handbag fs-2">
                            </i>
                            <p className="border border-1 fw-bold rounded-circle px-2 border-dark position-absolute exact">{cartItemsCount}</p>
                            <p className="my-auto mx-2">Sepetim</p>
                        </Link>
                    </div>
                    <nav className="navbar-expand-md navbar mt-2 mainnav">
                        <ul className="navbar-nav flex-wrap">
                            <NavItem>
                                <NavLink to="/" className="">Ana Sayfa</NavLink>
                            </NavItem>
                            {isLoading === true ? "Yükleniyor..." : saveactivesubcategoriesdata.slice(0, 6).map(
                                item => (
                                    <NavItem key={item.category.categorycode}>
                                        <NavLink to={`/Kategoriler/${item.category.categorycode}`} className="">{item.category.categorytitle}</NavLink>
                                        <ul className="dropdown-menu">
                                            {item.subcategories.map(
                                                item2 => (
                                                    <NavItem key={item2.subCategory_Id}>
                                                        <Link to={`/AltKategori/${item2.subCategory_Id}`} className="dropdown-item">{item2.subtitle}</Link>
                                                    </NavItem>
                                                )
                                            )
                                            }
                                        </ul>
                                    </NavItem>
                                )
                            )
                            }
                            <NavItem>
                                <NavLink to="/iletisim" className="">İletişim</NavLink>
                            </NavItem>
                        </ul>
                    </nav>
                </div>
            </header>
            {toastactive && <Toast />}
        </>
    )
}