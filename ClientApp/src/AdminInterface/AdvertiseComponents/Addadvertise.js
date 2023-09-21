import React, { useState, useEffect } from "react"
import DOMPurify from 'dompurify';
export default function Addandupdateadvertise({ advertisedataincrement, advertisedata, showadvertise,
    Setshowadvertise, Setshowsuccess, getadvertiseapi, Setisupdate, isupdate, itemcode, modalactivate, img, setimg }) {
    const incid = advertisedataincrement();
    modalactivate(showadvertise);
    let id = isupdate ? itemcode[0] : incid;
    const [message, Setmessage] = useState("")
    const [advertise, Setadvertise] = useState({
        Title: "",
        Definition:""
    })
    if (isupdate) {
        console.log(itemcode[3]);
    }
    const [file, setFiles] = useState(null)
    //const inputRef = useRef()
    function handlefile(event) {
        let fileget = event.target.files[0];
        setFiles(fileget.name);
    }
    useEffect(() => {
        if (isupdate) {
            Setadvertise({
                Title: itemcode[1],
                Definition:itemcode[2]
            })
            setFiles(itemcode[3]);
        }
        else {
            Setadvertise(prevdata => {
                return {
                    ...prevdata,
                    Title: "",
                    Definition: ""
                }  
            })
        }
    }, [isupdate])
    useEffect(() => {
        if (dataadvertise.Img_url) {
            setimg(`imagespublic/reklamlar/${dataadvertise.Img_url}`)
        }
    }, [file])
    const dataadvertise = {
        Title: advertise.Title,
        Definition: advertise.Definition,
        Img_url: file,
        Advertise_Id: id
    };
    function handleChange(event) {
        const { name, value } = event.target
        Setadvertise(inputvalue => {
            return {
                ...inputvalue,
                [name]:DOMPurify.sanitize(value.trimStart())
            }
        });
    }
    function Back(event) {
        event.preventDefault();
        Setmessage("");
        Setadvertise(prevdata => {
            return {
                ...prevdata,
                Title: "",
                Definition: ""
            }
        })
        Setshowadvertise(false);
        Setisupdate(false);
        setFiles(null);
        setimg(null);
    }
    function handlesubmit(event) {
        event.preventDefault();
        const value = advertisedata.some(data => data.title === advertise.Title);
        const value2 = advertisedata.some(data => data.definition === advertise.Definition)
        if (advertise.Title === "" || advertise.Definition === "" || !dataadvertise.Img_url) {
            Setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Setmessage("* Bu başlık adı zaten var. Lütfen yeni başlık adı yazınız.");
        }
        else if (value2) {
            Setmessage("* Bu açıklama zaten var. Lütfen yeni açıklama yazınız.")
        }
        else {
            Setmessage("");
           console.log(dataadvertise);
           postadvertiseapi();
        }
    }
    function postadvertiseapi() {
        fetch('/advertise', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataadvertise)
        }).then(r => r.json()).then(dataad => {
            if (dataad) {
                getadvertiseapi();
                Setshowadvertise(false);
                Setshowsuccess(true);
                Setadvertise(prevdata => {
                    return {
                        ...prevdata,
                        Title: "",
                        Definition: ""
                    }
                })
                setimg(null);
                setFiles(null);
            }
        });
    }
    async function updateadvertiseapi() {
        try {
            const response = await fetch(`/advertise/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataadvertise)
            });
            if (response.ok) {
                Setisupdate(false);
                Setshowadvertise(false);
                Setshowsuccess(true);
                getadvertiseapi();
                setFiles(null);
                setimg(null);
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    async function Updatecategories(event) {
        event.preventDefault();
        const value = advertisedata.some(data => data.title === advertise.Title && data.definition === advertise.Definition && data.img_url === dataadvertise.Img_url);
        if (advertise.Title === "" || advertise.Definition === "" || !dataadvertise.Img_url) {
            Setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Setmessage("* Herhangi bir değişiklik yapmadınız.");
        }
        else {
            Setmessage("");
            updateadvertiseapi();
        }
    }
    return (
        <>
            {showadvertise &&
                <div className="modal-wrapper bgpopupcolor text-capitalize  z-index-5">
                    <div className="modalcontent">
                        <div className="d-flex justify-content-center">
                            <form onSubmit={isupdate ? Updatecategories : handlesubmit} className="border bg-body rounded p-3 modalbody">
                                <div className="modal-header my-2">
                                    <h5 className="modal-title mx-auto">Reklam {isupdate ? "güncelle" : "oluştur"}</h5>        
                                </div>
                                <div className="d-flex justify-content-center imgbox mb-4">
                                    <div className="card">
                                        <img alt="" src={img} className="img-fitin object-fit-cover" />
                                    </div>
                                </div>
                                
                                <div className="modal-body">  
                                    <div className="d-flex align-items-center justify-content-center mb-4">
                                        <label htmlFor="reklambaşlığı" className="form-label mx-4">Reklam Başlığı</label>
                                        <input type="text" className="form-control ms-3 border-dark rounded-1" id="reklambaşlığı"
                                            name="Title"
                                            value={advertise.Title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-4">
                                        <label htmlFor="reklamgörüntüsü" className="form-label mx-3">Reklam Görüntüsü</label>
                                        <input type="file" className="form-control border-dark rounded-1" id="reklamgörüntüsü"
                                            onChange={handlefile}
                                            accept="Image/*"
                                        />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-4">
                                        <label htmlFor="reklamaçıklaması" className="form-label mx-3">Reklam Açıklaması</label>
                                        <textarea type="text" className="form-control border-dark rounded-1" id="reklamaçıklaması"
                                            value={advertise.Definition}
                                            name="Definition"
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