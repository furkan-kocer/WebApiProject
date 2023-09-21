import Getproductwithid from "../Apirequests/Getipwithid"
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import Postpage from "../Paginationtransactions/Postpage";
import Pagination from "../Paginationtransactions/Pagination"
export default function Altkategori() {
    const { getprowsubdata, isLoadingprosub, getproductwsubapi, setisLoadingprosub, setgetprowsubdata, originalProducts } = Getproductwithid();
    let { id } = useParams();
    useEffect(() => {
        setisLoadingprosub(true);
        getproductwsubapi(id);
    }, [id]);
    const [selectsort, setselectsort] = useState({
        selected: ""
    })
    function handleselect(event) {
        const { value , name } = event.target;
        setselectsort({
            [name]: value
        })
    }
    const parseDate = (dateString) => {
        const [day, month, yearTime] = dateString.split(".");
        const [year, time] = yearTime.split(" ");
        const [hours, minutes] = time.split(":");

        return new Date(year, month - 1, day, hours, minutes);
    };
    useEffect(() => {
        let sortproducts = [...originalProducts];
        switch (selectsort.selected) {
            case '1':
                sortproducts.sort((a, b) => b.price - a.price);
                break;
            case '2':
                sortproducts.sort((a, b) => a.price - b.price);
                break;
            case '3':
                sortproducts.sort((a, b) => parseDate(a.created_at) - parseDate(b.created_at));
                break;
            case '4':
                sortproducts.sort((a, b) => parseDate(b.created_at) - parseDate(a.created_at));
                break;
            case '':
                break;
            default:
                break;
        }
        setgetprowsubdata(sortproducts);
    }, [selectsort, originalProducts])
    const getprowstatus = getprowsubdata.some(item => item.status === "aktif");
    const getprowsub = getprowsubdata.filter(item => item.status === "aktif");
    //Pagination işlemleri aşağıdaki gibidir.
    const [currentpage, setCurrentPage] = useState(1);
    const postperpage = 4;
    const { pagerender } = Postpage();
    const dataofpagerender = pagerender(currentpage, postperpage, getprowsubdata);
    const paginate = (number) => setCurrentPage(number);
    if (isLoadingprosub) {
        return (
            <div className="d-flex mt-4">
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p> Ürünler yükleniyor...</p>
            </div>
        )
    }
    return (
        <div>
            {getprowsubdata.length > 0 && getprowstatus ? 
                <div className="d-flex mt-4 justify-content-between">
                    <div className="d-flex">
                    <NavLink to="/" className="breadcrumb text-dark">Ana Sayfa</NavLink>
                    <i className="bi bi-chevron-right px-2"></i>
                    <NavLink to={`/Kategoriler/${getprowsubdata[0]?.categoryId}`}
                        className="breadcrumb text-dark">{getprowsubdata[0]?.maincategory[0].categorytitle}</NavLink>
                    <p className="fw-semibold">
                        <i className="bi bi-chevron-right px-2"></i>
                        {getprowsubdata[0]?.subcategory[0].subtitle} </p>
                    </div>
                    <div className="d-flex me-5">
                        <select className="form-select border-dark rounded-1 me-2"
                            aria-label="Default select"
                            value={setselectsort.selected}
                            onChange={handleselect}
                            name="selected"
                        >
                            <option value="">Gelişmiş sıralama</option>
                            <option value="1">Fiyat Azanalana Göre</option>
                            <option value="2">Fiyat Artana Göre</option>
                            <option value="3">Yeniye Göre</option>
                            <option value="4">Eskiye Göre</option>
                        </select>
                    </div>
                </div>
                : <p className="mt-4 mx-2 fw-bold">Bu Kategoriyle eşleşen herhangi bir ürün bulunamamıştır.</p>}
            {getprowsubdata.length > 0 &&
                <div className="d-flex mx-5 px-5">
                    <div className="product-wrapper d-flex flex-wrap">
                        {(getprowsub.length > 4 ? dataofpagerender : getprowsubdata).map(
                            (item) => (
                                item.status === "aktif" &&
                                <NavLink to={`/Urunler/${item.product_Id}`} className="card border-0 shadow text-decoration-none" key={item.id}>
                                    <img src={`imagespublic/ürünler/${item.img_url}`} alt="yok" className="card-img-top rounded object-fit-cover" />
                                    <div className="card-body position-relative">
                                        <p className="my-3 title">{item.product_title}</p>
                                        <p className="brand top-right">{item.brand}</p>
                                            <p className="price right-bottom">{parseFloat(item.price).toLocaleString('tr-TR')} TL</p>
                                    </div>
                                </NavLink>

                            )
                        )}
                    </div>
                </div>
            }
            {getprowsub.length > 4 && <Pagination postsPerpage={postperpage} totalPosts={getprowsubdata.length} paginate={paginate}
                currentpage={currentpage} setCurrentPage={setCurrentPage} />}
        </div>
    )
}