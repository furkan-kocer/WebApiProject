import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { useSearch } from "../Apirequests/SearchContext"
import Postpage from "../Paginationtransactions/Postpage";
import Pagination from "../Paginationtransactions/Pagination"
export default function Search() {
    const { getsearchdata, isLoadingsearch, searchapi, setQuery, searchParams, setisLoadingsearch, getsearchdatasorted, setgetsearchdata } = useSearch();
    const [getquerytitle, setquerytitle] = useState('');
    const initialget = searchParams.get('query');
    useEffect(() => {
        const initialQuery = searchParams.get('query');
        const hasSpecialCharacters = /[^\p{L}0-9-\s]+/gu.test(initialQuery);
        if (initialQuery.length < 2) {
            setisLoadingsearch(false);
            //setquerytitle("Lütfen en az 2 kelime ile arama yapınız.");
        }
        else if (hasSpecialCharacters) {
            setisLoadingsearch(false);
            //setquerytitle("Özel karakterler kullanılamaz.");
        }
        else if (initialQuery !== "" && initialQuery.length > 1) {
            setQuery(initialQuery);
            searchapi(initialQuery);
        }
    }, []);
    const [selectsortsearch, setselectsortsearch] = useState({
        selected: ""
    })
    function handleselect(event) {
        const { value, name } = event.target;
        setselectsortsearch({
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
        let sortproducts = [...getsearchdatasorted];
        switch (selectsortsearch.selected) {
            case '1':
                sortproducts.sort((a, b) => b.price - a.price);
                break;
            case '2':
                sortproducts.sort((a, b) => a.price - b.price);
                break;
            case '3':
                sortproducts.sort((a, b) => parseDate(a.updated_at) - parseDate(b.updated_at));
                break;
            case '4':
                sortproducts.sort((a, b) => parseDate(b.updated_at) - parseDate(a.updated_at));
                break;
            case '':
                break;
            default:
                break;
        }
        setgetsearchdata(sortproducts);
    }, [selectsortsearch, getsearchdatasorted])
    const getprowstatussearch = getsearchdata.some(item => item.status === "aktif");
    const getprowsearchdata = getsearchdata.map(item => item.status === "pasif");
    const trueCount = getprowsearchdata.filter(value => value === true).length;
    const getprosearchdata = getsearchdata.filter(item => item.status === "aktif");
    //Pagination işlemleri aşağıdaki gibidir.
    const [currentpage, setCurrentPage] = useState(1);
    const postperpage = 4;
    const { pagerender } = Postpage();
    const dataofpagerender = pagerender(currentpage, postperpage, getsearchdata);
    const paginate = (number) => setCurrentPage(number);
    if (isLoadingsearch) {
        return (
            <div className="d-flex mt-4">
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p> Ürünler yükleniyor...</p>
            </div>
        )
    }
    //!getsearchdata.length > 0 && initialget.length > 1
    return (
        <div>
           
            { !getprowstatussearch  &&
                <>
                <p className="m-0 p-0 fw-bold mt-4">Girdiğiniz kelime ile ilgili herhangi bir sonuç bulunamamıştır.</p>
                <p className="fw-bold mt-1">Lütfen tekrar deneyiniz.</p>
            </>
            }
            <p className="mt-4 fw-bold">{getquerytitle}</p>
            {getsearchdata.length > 0 && getprowstatussearch &&
                <>
                <div className="my-4 d-flex justify-content-between">
                    <div className="d-flex">
                        <strong className="fs-5 me-3">'{initialget}'</strong>
                        <p className="my-auto">{getsearchdata.length - trueCount} adet ürün listelenmiştir.</p>
                    </div>
                    <div className="d-flex me-5">
                        <select className="form-select border-dark rounded-1 me-2"
                            aria-label="Default select"
                            value={setselectsortsearch.selected}
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
                    <div className="d-flex mx-5 px-5 mb-2">
                        <div className="product-wrapper d-flex flex-wrap">
                        {(getprosearchdata.length > 4 ? dataofpagerender : getsearchdata).map(
                                (item) => (
                                    item.status==="aktif" &&
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
                </>  
            }
            {getprosearchdata.length > 4 && <Pagination postsPerpage={postperpage} totalPosts={getsearchdata.length}
                paginate={paginate} currentpage={currentpage} setCurrentPage={setCurrentPage} />}
            </div>
        )
}