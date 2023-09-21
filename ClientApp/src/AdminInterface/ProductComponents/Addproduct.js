import React, { useState, useEffect } from "react"
import DOMPurify from 'dompurify';
import Getapi from "../../Apirequests/Getcategoryapi"
export default function AddupdateProduct({ proincrement, productdata, showproduct, Setshowproduct, Setshowsuccess, getproductapi,
    setimg, Setisupdate, isupdate, itemcode, modalactivate, img }) {
    const { categoriesdata } = Getapi();
    const incid = proincrement();
    modalactivate(showproduct);
    let id = isupdate ? itemcode[0] : incid;
    const [message, Setmessage] = useState("")
    const [file, setFiles] = useState("")
    const [fileerr, Setfileerr] = useState("")
    const [product, Setproduct] = useState({
        Title: "",
        Price: "",
        Categoryid: "",
        Subcategoryid: "",
        Definition: "",
        Brand: ""
    })
    function handlefile(event) {
        let fileget = event.target.files[0];
        if (!fileget.type.startsWith("image/")) {
            Setfileerr("* Sadece resim dosyaları seçilebilir!");
            setFiles(null)// Dosya seçimini iptal eder.
            event.target.value = null;
        }
        else {
            setFiles(fileget.name);
            Setfileerr("");
        }      
    }
    useEffect(() => {
        if (isupdate) {
            Setproduct(prevdata => {
                return {
                    ...prevdata,
                    Title: itemcode[1],
                    Price: itemcode[2],
                    Categoryid: itemcode[4],
                    Subcategoryid: itemcode[5],
                    Definition: itemcode[6],
                    Brand: itemcode[7]
                }
            })
            setFiles(itemcode[3]);
        }
        else {
            Setproduct(prevdata => {
                return {
                    ...prevdata,
                    Title: "",
                    Price: "",
                    Categoryid: "",
                    Subcategoryid: "",
                    Definition: "",
                    Brand: ""
                }
            })
            Setsub([]);
        }
    }, [isupdate])
    useEffect(() => {
        if (dataproduct.Img_url && file) {
            setimg(`imagespublic/ürünler/${dataproduct.Img_url}`)
        }
        else if (file === null) {
            setimg('imagespublic/image-gallery.png')
        }
    }, [file])
    const dataproduct = {
        Product_Id: id,
        Product_title: product.Title,
        Price: product.Price,
        Img_url: file,
        CategoryId: product.Categoryid,
        Subcategorycode: product.Subcategoryid,
        Definition: product.Definition,
        Brand: product.Brand
    };
    const [getsub, Setsub] = useState([]);
    async function getsubapiwid(i2) {
        const response = await fetch(`/subcategory/sub/${i2}`);
        const data = await response.json();
        //fetch edilen adresden dönen veriyi yeni bir array'e atayan state
        Setsub(data);
        if (isupdate) {
            const selectedcategory = data.some(cat => cat.categoryId === product.Categoryid);
            if (!selectedcategory) {
                Setproduct(prevdata => {
                    return {
                        ...prevdata,
                        Subcategoryid: data[0].subCategory_Id
                    }
                })
            }
        }
    }
    useEffect(() => {
        if (product.Categoryid) {
            getsubapiwid(product.Categoryid);
        }
    }, [product.Categoryid]);
    function handleChange(event) {
        const { name, value } = event.target
        Setproduct(inputvalue => {
            return {
                ...inputvalue,
                [name]: DOMPurify.sanitize(value.trimStart())
            }
        });
    }
    function Back(event) {
        event.preventDefault();
        Setmessage("");
        Setproduct(prevdata => {
            return {
                ...prevdata,
                Title: "",
                Price: "",
                Categoryid: "",
                Subcategoryid: "",
                Definition: "",
                Brand: ""
            }
        })
        Setshowproduct(false);
        Setisupdate(false);
        setFiles(null);
        setimg(null);
        Setsub([]);
        Setfileerr("");
    }
    function handlesubmit(event) {
        event.preventDefault();
        Setfileerr("");
        const value = productdata.some(data => data.product_title === product.Title);
        const value2 = productdata.some(data => data.definition === product.Definition)
        if (product.Title === "" || product.Definition === ""
            || !dataproduct.Img_url || product.Categoryid === ""
            || product.Price === "" || product.Brand === "" || product.Subcategoryid === "") {
            Setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Setmessage("* Bu ürün adı zaten var. Lütfen yeni ürün adı yazınız.");
        }
        else if (value2) {
            Setmessage("* Bu ürün açıklaması zaten var. Lütfen yeni ürün açıklaması yazınız.")
        }
        else {
            Setmessage("");
            Setfileerr("");
            //console.log(dataproduct);
            postproductapi();
        }
    }
    function postproductapi() {
        fetch('/product', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataproduct)
        }).then(r => r.json()).then(dataad => {
            if (dataad) {
                getproductapi();
                Setshowproduct(false);
                Setshowsuccess(true);
                Setproduct(prevdata => {
                    return {
                        ...prevdata,
                        Title: "",
                        Price: "",
                        Categoryid: "",
                        Subcategoryid: "",
                        Definition: "",
                        Brand: ""
                    }
                })
                setimg(null);
                setFiles(null);
                Setsub([]);
            }
        });
    }
    async function updateproductapi() {
        try {
            const response = await fetch(`/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataproduct)
            });
            if (response.ok) {
                Setisupdate(false);
                Setshowproduct(false);
                Setshowsuccess(true);
                getproductapi();
                setFiles(null);
                setimg(null);
                Setsub([]);
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    async function Updateproduct(event) {
        event.preventDefault();
        const value = productdata.some(
            data => data.product_title === product.Title
                && data.definition === product.Definition
                && data.img_url === dataproduct.Img_url && data.categoryId === product.Categoryid
                && data.subcategorycode === product.Subcategoryid && data.price === product.Price && data.brand === product.Brand);
        if (product.Title === "" || product.Definition === ""
            || !dataproduct.Img_url || product.Categoryid === ""
            || product.Price === "" || product.Brand === "" || product.Subcategoryid === "") {
            Setmessage("* lütfen tüm boş alanları doldurunuz.");
        }
        else if (value) {
            Setmessage("* Herhangi bir değişiklik yapmadınız.");
        }
        else {
            Setmessage("");
            //console.log(dataproduct);
            updateproductapi();
        }
    }
    return (
        <>
            {showproduct &&
                <div className="modal-wrapper bgpopupcolor text-capitalize scroll-down z-index-5">
                    <div className="modalcontent my-1">
                        <div className="d-flex justify-content-center">
                            <form onSubmit={isupdate ? Updateproduct : handlesubmit} className="border bg-body rounded-4  modalbody">
                                <div className="modal-header my-2">
                                    <h5 className="modal-title mx-auto fw-bold">Ürün {isupdate ? "güncelle" : "oluştur"}</h5>
                                </div>
                                <div className="d-flex justify-content-center imgbox mb-2">
                                    <div className="card">
                                        <img alt="" src={img} className="img-fitin rounded object-fit-cover" />
                                    </div>
                                </div>

                                <div className="modalproduct-body px-5">
                                    <div className="d-flex justify-content-around mb-1">
                                        <div className="me-3">
                                            <label htmlFor="ürüngörüntüsü" className="form-label">Ürün Görüntüsü Seç:</label>
                                            <input type="file" className="form-control border-dark rounded-1" id="ürüngörüntüsü"
                                                onChange={handlefile}
                                                accept="image/*"
                                            />
                                            <div className='text-capitalize text-start text-danger my-1'>{fileerr}</div>
                                        </div>
                                        <div className="me-3">
                                            <label htmlFor="ürünbaşlığı" className="form-label">Ürün Başlığı:</label>
                                            <input type="text" className="form-control border-dark rounded-1" id="ürünbaşlığı"
                                                name="Title"
                                                value={product.Title}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="ürünmarkası" className="form-label">Ürün Markası:</label>
                                            <input type="text" className="form-control border-dark rounded-1" id="ürünmarkası"
                                                name="Brand"
                                                value={product.Brand}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <div className="">
                                            <label htmlFor="ürünfiyatı" className="form-label">Ürün Fiyatı:</label>
                                            <input type="number" className="form-control border-dark rounded-1" id="ürünfiyatı"
                                                name="Price"
                                                value={product.Price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="anakategoriselect" className="form-label">Ana kategori:</label>
                                            <select className="form-select border-dark rounded-1"
                                                aria-label="Default select"
                                                id="anakategoriselect"
                                                value={product.Categoryid}
                                                onChange={handleChange}
                                                name="Categoryid"
                                            >
                                                <option value="" disabled>Ana Kategoriyi Seçiniz</option>
                                                {categoriesdata.map(
                                                    item => (
                                                        <option value={item.categorycode}
                                                            key={item.categorycode}>{item.categorytitle}</option>
                                                    )
                                                )
                                                }
                                            </select>
                                        </div>
                                        <div className="">
                                            <label htmlFor="altkategoriselect" className="form-label">Alt kategori:</label>
                                            <select className="form-select border-dark rounded-1"
                                                aria-label="Default select"
                                                id="altkategoriselect"
                                                value={product.Subcategoryid}
                                                onChange={handleChange}
                                                name="Subcategoryid"
                                            >
                                                <option value="" disabled>Alt Kategoriyi Seçiniz</option>
                                                {getsub.map(
                                                    item => (
                                                        <option value={item.subCategory_Id} key={item.subCategory_Id}>{item.subtitle}</option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`${message === "" && "mb-3" }`}>
                                        <label htmlFor="ürünaçıklaması" className="form-label">Ürün Açıklaması:</label>
                                        <textarea type="text" className="form-control border-dark rounded-1" id="ürünaçıklaması"
                                            value={product.Definition}
                                            name="Definition"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='text-capitalize text-start text-danger'>{message}</div>
                                </div>
                                <div className="modal-footer border-0 justify-content-center mb-3">
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