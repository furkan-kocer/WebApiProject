import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Getapi from "../../Apirequests/Getapi"
export default function Productcards() {
    const { saveproductdata, getproductapi, isLoadingpro } = Getapi();
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClickNext = () => {
        if (currentIndex < saveproductdata.length - 4) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };
    const handleClickPrev = () => {
        if (currentIndex >= 1) {
            setCurrentIndex(currentIndex - 1);
        } else {
            if (saveproductdata.length % 5 !== 0) {
                setCurrentIndex(saveproductdata.length - (saveproductdata.length % 5));
            }
            else {
                setCurrentIndex(saveproductdata.length - (saveproductdata.length % 5) - 1);
            }
        }
    };
    useEffect(() => {
        getproductapi();
    }, [])
    return (
        <>
            {isLoadingpro &&
                <div className="d-flex">
                    <div className="spinner-border spinner-border-sm mx-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p> Ürünler vitrini yükleniyor...</p>
                </div>
            }
            {saveproductdata.length === 0 ? "" :
                <div className="vitrin my-4 position-relative">
                    <p className="fs-3 fw-bold text-capitalize">öne çıkanlar</p>             
                    <div className="product-wrapper d-flex overflow-hidden w-100">
                        {saveproductdata.slice(currentIndex, currentIndex + 5).map(
                            (item) => (
                                <NavLink to={`Urunler/${item.product_Id}`} className={`card border-0 shadow text-decoration-none`} key={item.id}>
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
                    <button className="carousel-controlprev  carouselprevproduct rounded-circle bg-body-tertiary productprevcarousel" type="button" onClick={handleClickPrev}>
                        <i className="bi bi-chevron-compact-left fs-2"></i>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-controlnext carouselnextproduct rounded-circle bg-body-tertiary productnextcarousel" type="button" onClick={handleClickNext}>
                        <i className="bi bi-chevron-compact-right fs-2"></i>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            }
        </>
    )
}