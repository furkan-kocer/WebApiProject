import React, { useState, useEffect } from "react"
import Successmodal from "../Successmodal"
import DeleteModal from "../Deletemodal";
import Addupdateproduct from "./Addproduct";
import Postpage from "../../Paginationtransactions/Postpage";
import Pagination from "../../Paginationtransactions/Pagination"
export default function Product({ modalactivate }) {
    const [productdata, setproductdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showsuccess, Setshowsuccess] = useState(false);
    const [showdel, Setshowdelete] = useState(false);
    const [itemcode, Setitemcode] = useState(null);
    const [isupdate, Setisupdate] = useState(false);
    const [showproduct, Setshowproduct] = useState(false);
    const [img, setimg] = useState(null);
    async function getproductapi() {
        const response = await fetch('/product');
        const data = await response.json();
        //fetch edilen adresden dönen veriyi yeni bir array'e atayan state
        setproductdata(data);
        //Ürün tablosuna veriler yüklendikten sonra loading yazısını kaldıran state 
        setIsLoading(false);
    }
    useEffect(() => {
        getproductapi();
    }, []);
    //console.log("length: " + productdata.length);
    function productdataincrement() {
        if (!isLoading && productdata.length !== 0) {
            const incrementpro = productdata.slice(-1)[0].product_Id;
            return incrementpro + 1;
            console.log("1den fazla");
        }
        else {
            const incrementadv = 1;
            return incrementadv;
        }
    }
    async function Deleteproduct(id) {
        try {
            const response = await fetch(`/product/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Setshowdelete(false);
                Setshowsuccess(true);
                getproductapi();
            } else {
                console.error(`Failed to delete item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting item with ID ${id}: ${error}`);
        }
    }
    const Statuschange = {
        Status: "",
    }
    function changestatus(getstatus, id) {
        if (getstatus === "aktif") {
            Statuschange.Status = "pasif";
            updateproductapistatus(id);
        }
        else if (getstatus === "pasif") {
            Statuschange.Status = "aktif";
            updateproductapistatus(id);
        }
        else {
            console.log("sorun var.")
        }
    }
    async function updateproductapistatus(id) {
        try {
            const response = await fetch(`/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(Statuschange)
            });
            if (response.ok) {
                Setshowsuccess(true);
                getproductapi();
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    //Pagination işlemleri aşağıdaki gibidir.
    const [currentpage, setCurrentPage] = useState(1);
    const postperpage = 3;
    const { pagerender } = Postpage();
    const dataofpagerender = pagerender(currentpage, postperpage, productdata);
    const paginate = (number) => setCurrentPage(number);
    if (isLoading) {
        return (<div className="d-flex mt-2">
            <div className="spinner-border spinner-border-sm mx-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Yükleniyor...</p>
        </div>)
    }
    return (
        <>
            <Addupdateproduct proincrement={productdataincrement} productdata={productdata}
                showproduct={showproduct} Setshowproduct={Setshowproduct} Setshowsuccess={Setshowsuccess}
                getproductapi={getproductapi} setimg={setimg}
                Setisupdate={Setisupdate} isupdate={isupdate} itemcode={itemcode} modalactivate={modalactivate} img={img}
            />
            <div className="px-5 categories">
                <div className="d-flex">
                    <h4 className="text-uppercase me-3 fw-semibold my-3 align-self-center">Ürünler</h4>
                    <button type="button" className="btn btn-outline-dark fs-4 my-3" onClick={() => {
                        Setshowproduct(true);
                        Setisupdate(false);
                        setimg(`imagespublic/image-gallery.png`);
                    }}>+</button>
                 
                </div>
                <table className="table table-striped bg-white rounded text-center">
                    <thead className="fw-semibold text-nowrap">
                        <tr className="">
                            <th scope="col">Ana Kategori</th>
                            <th scope="col">Alt Kategori</th>
                            <th scope="col">Ürün Adı</th>
                            <th scope="col">Ürün Fiyatı</th>
                            <th scope="col">Ürün Görüntüsü</th>
                            <th scope="col">Ürün Markası</th>
                            <th scope="col">Son Güncelleme Tarihi</th>
                            <th scope="col">Oluşturma Tarihi</th>
                            <th scope="col">Durum</th>
                            <th scope="col">Güncelle & Sil</th>
                        </tr>
                    </thead>
                    <tbody className="my-auto align-middle">
                        {!isLoading && dataofpagerender.map(
                            item => (
                                <tr key={item.id}>
                                    <td>{item.maincategory[0].categorytitle}</td>
                                    <td>{item.subcategory[0].subtitle}</td>
                                    <td>{item.product_title}</td>
                                    <td>{parseFloat(item.price).toLocaleString('tr-TR')} TL</td>
                                    <td className="imgwrapper">
                                        <div className="cardx shadow rounded bg-body mx-auto">
                                            <img alt="resimbulunamadı" src={`imagespublic/ürünler/${item.img_url}`} className="img-fitin rounded object-fit-cover" />
                                        </div>
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>{item.updated_at}</td>
                                    <td>{item.created_at}</td>
                                    <td className=""><button type="button"
                                        className="btn btn-dark text-yellow text-capitalize text-nowrap"
                                        onClick={() => changestatus(item.status, item.product_Id)}
                                    >
                                        {item.status}
                                    </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-dark btn-chnge mx-2" onClick={() => {
                                            Setshowproduct(true);
                                            Setisupdate(true);
                                            setimg(`imagespublic/ürünler/${item.img_url}`);
                                            Setitemcode([item.product_Id, item.product_title, item.price, item.img_url, item.categoryId, item.subcategorycode, item.definition, item.brand]);
                                        }}>
                                            <i className="bi bi-arrow-repeat"></i>
                                        </button>
                                        <button type="button" className="btn btn-outline-dark btn-chnge" onClick={() => {
                                            Setshowdelete(true);
                                            Setitemcode([item.product_Id, item.product_title]);
                                        }}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                        }
                    </tbody>
                </table>
            </div>
            <Pagination postsPerpage={postperpage} totalPosts={productdata.length} paginate={paginate} currentpage={currentpage} setCurrentPage={setCurrentPage} />
            {showsuccess && <Successmodal Setshowsuccess={Setshowsuccess} showsuccess={showsuccess} modalactivate={modalactivate} />}

            {showdel && <DeleteModal Setshowdelete={Setshowdelete} itemcode={itemcode} showdel={showdel} modalactivate={modalactivate} Delete={Deleteproduct} />}
        </>
    )
}