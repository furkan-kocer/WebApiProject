import {  useEffect, useState } from "react"
import DOMPurify from 'dompurify';
export default function AddCategory({ catlen, datacheck, show, Setshow, Setshowsuccess, getapi, Setisupdate, isupdate, itemcode, modalactivate }) {
    const lenid = catlen();
    modalactivate(show);
    let id = isupdate ? itemcode[0] : lenid;
    const [message, Setmessage] = useState("")
    const [category, Setcategory] = useState({
        Categorytitle: "",
    })
    useEffect(() => {
        if (isupdate) {
            Setcategory({
                Categorytitle: itemcode[1],
            })
        }
        else {
            Setcategory({
                Categorytitle: "",
            })
        }
    }, [isupdate])
    const datacategory = {
        Categorytitle: category.Categorytitle,
        Categorycode: id
    };
    function handleChange(event) {
        const { name, value } = event.target
        Setcategory(inputvalue => {
            return {
                ...inputvalue,
                [name]: DOMPurify.sanitize(value.trimStart())
            }
        });
    }
    function Back(event) {
        event.preventDefault();
        Setmessage("");
        Setcategory({
            Categorytitle: "",
        }
        )
        Setshow(false);
        Setisupdate(false);
    }
    function handlesubmit(event) {
        event.preventDefault();
        const value = datacheck.some(data => data.categorytitle === category.Categorytitle);
        if (category.Categorytitle === "") {
            Setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Setmessage("* Bu kategori adı zaten var. Lütfen yeni kategori adı yazınız.");
        }
        else {
            Setmessage("");
            postapi();
        }
    }
    async function Updatecategories(event) {
        event.preventDefault();
        const categorytitle = category.Categorytitle;
        const value = datacheck.some(data => data.categorytitle === categorytitle);
        if (categorytitle === "") {
            Setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Setmessage("* Bu kategori adı zaten var. Lütfen yeni kategori adı yazınız.");
        }
        else {
            Setmessage("");
            updateapi();
        }
    }
    function postapi() {
        fetch('/maincategory', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(datacategory)
        }).then(r => r.json()).then(datacat => {
            if (datacat) {
                getapi();
                Setshow(false);
                Setshowsuccess(true); 
                Setcategory({
                    Categorytitle: "",
                }
                )     
            }
        });
    }
   async function updateapi() {
        try {
            const response = await fetch(`/maincategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datacategory)
            });
            if (response.ok) {
                Setisupdate(false);
                Setshow(false);
                Setshowsuccess(true);
                getapi();
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    return (
        <>
            {show && 
                <div className="modal-wrapper bgpopupcolor text-capitalize z-index-5">
                    <div className="modalcontent">
                        <div className="d-flex justify-content-center">
                            <form onSubmit={isupdate ?
                                Updatecategories : handlesubmit   
                           } className="border bg-body rounded p-3 modalbody">
                            <div className="modal-header pb-3">
                                    <h5 className="modal-title mx-auto">ana kategori {isupdate ? "güncelle" : "oluştur"}</h5>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex align-items-center justify-content-center mb-4">
                                    <label htmlFor="kategorikodu" className="form-label mx-4">kategori kodu</label>
                                        <input type="text" className="form-control border-dark rounded-1 bg-light" id="kategorikodu"
                                            value={isupdate ? id : lenid}
                                        readOnly
                                    />
                                </div>
                                    <div className="d-flex align-items-center justify-content-center mb-4">
                                    <label htmlFor="kategoriadı" className="form-label mx-4">kategori adı</label>
                                    <input type="text" className="form-control ms-3 border-dark rounded-1" id="kategoriadı"
                                        name="Categorytitle"
                                            value={category.Categorytitle}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='text-capitalize text-center my-2 text-danger'>{message}</div>
                            </div>
                            <div className="modal-footer border-0 justify-content-center ms-3">
                                <button type="button" className="btn btn-primary text-uppercase mx-2" onClick={Back}>Geri</button>
                                    <button type="submit" className="btn btn-primary text-uppercase mx-2">{isupdate ? "Güncelle" : "Ekle"}</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
              }
        </>
    )
}