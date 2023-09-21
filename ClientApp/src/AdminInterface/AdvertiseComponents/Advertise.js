import Addupdateadvertise from "./Addadvertise"
import React, { useState, useEffect } from "react"
import Successmodal from "../Successmodal"
import DeleteModal from "../Deletemodal";
import Postpage from "../../Paginationtransactions/Postpage";
import Pagination from "../../Paginationtransactions/Pagination"
export default function Advertise({ modalactivate }) {
    const [advertisedata, setadvertisedata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showsuccess, Setshowsuccess] = useState(false);
    const [showdel, Setshowdelete] = useState(false);
    const [itemcode, Setitemcode] = useState(null);
    const [isupdate, Setisupdate] = useState(false);
    const [showadvertise, Setshowadvertise] = useState(false);
    async function getadvertiseapi() {
        const response = await fetch('/advertise');
        const data = await response.json();
        //fetch edilen adresden dönen veriyi yeni bir array'e atayan state
        setadvertisedata(data);
        //Reklam tablosuna veriler yüklendikten sonra loading yazısını kaldıran state 
        setIsLoading(false);
    }
    useEffect(() => {
        getadvertiseapi();
    }, []);
    console.log("length: " + advertisedata.length);
    console.log(advertisedata);
    function advertisedataincrement() {
        if (!isLoading && advertisedata.length !== 0) {
            const incrementadv = advertisedata.slice(-1)[0].advertise_Id;
            return incrementadv + 1;
        }
        else {
            const incrementadv = 1;
            return incrementadv;
        }
    }
    async function Deleteadvertise(id) {
        try {
            const response = await fetch(`/advertise/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Setshowdelete(false);
                Setshowsuccess(true);
                getadvertiseapi();
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
            updateadvertiseapistatus(id);
        }
        else if (getstatus === "pasif") {
            Statuschange.Status = "aktif";
            updateadvertiseapistatus(id);
        }
        else {
            console.log("sorun var.")
        }
    }
    async function updateadvertiseapistatus(id) {
        try {
            const response = await fetch(`/advertise/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(Statuschange)
            });
            if (response.ok) {
                Setshowsuccess(true);
                getadvertiseapi();
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    const [img, setimg] = useState(null);
    //Pagination işlemleri aşağıdaki gibidir.
    const [currentpage, setCurrentPage] = useState(1);
    const postperpage = 3;
    const { pagerender } = Postpage();
    const dataofpagerender = pagerender(currentpage, postperpage, advertisedata);
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
            <Addupdateadvertise advertisedataincrement={advertisedataincrement} advertisedata={advertisedata}
                showadvertise={showadvertise} Setshowadvertise={Setshowadvertise} showsuccess={showsuccess} Setshowsuccess={Setshowsuccess}
                getadvertiseapi={getadvertiseapi} setimg={setimg}
                Setisupdate={Setisupdate} isupdate={isupdate} itemcode={itemcode} modalactivate={modalactivate} img={img}
            />
            <div className="px-5 categories">
                <div className="d-flex">
                    <h4 className="text-uppercase me-3 fw-semibold my-3 align-self-center">Reklamlar</h4>
                    <button type="button" className="btn btn-outline-dark fs-4 my-3" onClick={() => {
                        Setshowadvertise(true);
                        Setisupdate(false);
                        setimg(`imagespublic/image-gallery.png`);
                    }}>+</button>
                </div>
                <table className="table table-striped bg-white rounded text-center">
                    <thead className="fw-semibold text-nowrap">
                        <tr className="">
                            <th scope="col">Reklam Başlığı</th>
                            <th scope="col">Reklam Görüntüsü</th>
                            <th scope="col">Reklam Açıklaması</th>
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
                                    <td>{item.title}</td>
                                    <td className="imgwrapper">
                                        <div className="cardx shadow rounded bg-body mx-auto">
                                            <img alt="resimyok" src={`imagespublic/reklamlar/${item.img_url}`} className="img-fitin object-fit-contain" />
                                        </div>
                                    </td>
                                    <td>{item.definition}</td>
                                    <td>{item.updated_at}</td>
                                    <td>{item.created_at}</td>
                                    <td className=""><button type="button"
                                        className="btn btn-dark text-yellow text-capitalize text-nowrap"
                                        onClick={() => changestatus(item.status, item.advertise_Id)}
                                    >
                                        {item.status}
                                    </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-dark btn-chnge mx-2" onClick={() => {
                                            Setshowadvertise(true);
                                            Setisupdate(true);
                                            setimg(`imagespublic/reklamlar/${item.img_url}`);
                                            Setitemcode([item.advertise_Id, item.title, item.definition, item.img_url]);
                                        }}>
                                            <i className="bi bi-arrow-repeat"></i>
                                        </button>
                                        <button type="button" className="btn btn-outline-dark btn-chnge" onClick={() => {
                                            Setshowdelete(true);
                                            Setitemcode([item.advertise_Id, item.title]);
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
            <Pagination postsPerpage={postperpage} totalPosts={advertisedata.length} paginate={paginate} currentpage={currentpage} setCurrentPage={setCurrentPage} />
            {showsuccess && <Successmodal Setshowsuccess={Setshowsuccess} showsuccess={showsuccess} modalactivate={modalactivate} />}
            {showdel && <DeleteModal Setshowdelete={Setshowdelete} itemcode={itemcode} showdel={showdel} modalactivate={modalactivate} Delete={Deleteadvertise} />}
        </>
    )
}