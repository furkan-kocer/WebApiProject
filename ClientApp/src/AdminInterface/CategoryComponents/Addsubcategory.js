import React,{ useState,useEffect } from "react"
import DOMPurify from 'dompurify';
export default function AddSubcategory({ showsub, Setshowsub, sublen, categoriesdata, subcategoriesdata, getsubcatapi, Setshowsuccess, modalactivate, Setisupdate, isupdate, itemcode2 }) {
    const lenid = sublen();
    modalactivate(showsub);
    let id = isupdate ? itemcode2[0] : lenid;
    const [subcategory, Setsubcategory] = useState({
        Subtitle: "",
        CategoryId:""
    })
    const [error, Seterror] = useState("")
    useEffect(() => {
        if (isupdate) {
            Setsubcategory({
                Subtitle: itemcode2[1],
                CategoryId: itemcode2[2]
            })
        }
        else {
            Setsubcategory({
                Subtitle: "",
                CategoryId: ""
            })
        }
    }, [isupdate])
    const datacategory = {
        Subtitle: subcategory.Subtitle,
        CategoryId: subcategory.CategoryId,
        SubCategory_Id: id
    };
    function Back(event) {
        event.preventDefault();
        Seterror("");
        Setsubcategory({
            Subtitle: "",
            CategoryId: ""
        })
        Setshowsub(false);
        Setisupdate(false);
    }
    function handleChange(event) {
        const { name, value } = event.target
        Setsubcategory(inputvalue => {
            return {
                ...inputvalue,
                [name]: DOMPurify.sanitize(value.trimStart())
            }
        })
    }
    function handlesubmit(event) {
        event.preventDefault();
        const value = subcategoriesdata.some(data => data.subtitle === subcategory.Subtitle);
        if (subcategory.Subtitle === "" || subcategory.CategoryId === "") {
            Seterror("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Seterror("* Bu alt kategori adı zaten var. Lütfen yeni alt kategori adı yazınız.");
        }
        else {
            Seterror("");
            subpostapi();
        } 
    }
    function subpostapi() {
        fetch('/subcategory', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(datacategory)
        }).then(r => r.json()).then(datacat => {
            if (datacat) {
                getsubcatapi();
                Setshowsub(false);
                Setshowsuccess(true);
                Setsubcategory({
                    Subtitle: "",
                    CategoryId: ""
                }
                )
            }
        });
    }
    async function Updatesubcategories(event) {
        event.preventDefault();
        const value1 = subcategoriesdata.some(data => (data.categoryId === subcategory.CategoryId && data.subtitle === subcategory.Subtitle));
        if (subcategory.Subtitle === "" || subcategory.CategoryId === "") {
            Seterror("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value1) {
            Seterror("* Bu alt kategori adı ve ana kategori adı zaten var. Lütfen yeni değerler giriniz.");
        }
        else {
            Seterror("");
            updatesubapi();
        }
    }
    async function updatesubapi() {
        try {
            const response = await fetch(`/subcategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datacategory)
            });
            if (response.ok) {
                Setisupdate(false);
                Setshowsub(false);
                Setshowsuccess(true);
                getsubcatapi();
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    return (
        <>
            {showsub && <div className="modal-wrapper bgpopupcolor text-capitalize  z-index-5">
                <div className="modalcontent">
                    <div className="d-flex justify-content-center">
                        <form className="border bg-body rounded p-3 modalbody" onSubmit={isupdate ?
                            Updatesubcategories : handlesubmit }>
                            <div className="modal-header pb-3">
                                <h5 className="modal-title mx-auto">alt kategori {isupdate ? "güncelle" : "oluştur"}</h5>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex align-items-center justify-content-center mb-4">
                                    <label htmlFor="altkategorikodu" className="form-label ms-4">alt kategori kodu</label>
                                    <input type="text" className="form-control ms-3 border-dark rounded-1 bg-light" id="altkategorikodu"
                                        value={isupdate ? id : lenid}
                                        readOnly
                                    ></input>
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-4">
                                    <label htmlFor="altkategoriadı" className="form-label mx-4">alt kategori adı</label>
                                    <input type="text" className="form-control ms-2 border-dark rounded-1" id="altkategoriadı"
                                        name="Subtitle"
                                        value={subcategory.Subtitle}
                                        onChange={handleChange}
                                    ></input>
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-4">
                                    <label htmlFor="anakategoriselect" className="form-label mx-4">Ana kategori seç</label>
                                    <select className="form-select border-dark rounded-1"
                                        aria-label="Default select"
                                        id="anakategoriselect"
                                        value={subcategory.CategoryId}
                                        onChange={handleChange}
                                        name="CategoryId"
                                    >
                                        <option value="" disabled>Ana Kategoriyi Seçiniz</option>
                                        { categoriesdata.map(
                                             item => (
                                                <option value={item.categorycode} key={item.id}>{item.categorytitle}</option>
                                            )
                                        )
                                        } 
                                    </select>
                                </div>
                            </div>
                            {error && <div className='text-danger text-capitalize text-center my-2'>{error}</div>}
                            <div className="modal-footer border-0 justify-content-center ms-5">
                                <button type="button" className="btn btn-primary text-uppercase mx-2" onClick={Back}>Geri</button>
                                <button type="submit" className="btn btn-primary text-uppercase mx-2">{isupdate ? "Güncelle" : "Ekle"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    )
}