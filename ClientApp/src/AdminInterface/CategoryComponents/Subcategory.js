import Addsubcategorymodal from "./Addsubcategory"
import React, { useState, useEffect } from 'react';
import DeleteModal from "../Deletemodal";
import Postpage from "../../Paginationtransactions/Postpage";
import Pagination from "../../Paginationtransactions/Pagination"
export default function Subcategory({ categoriesdata, showsuccess, Setshowsuccess, modalactivate, getsubcatapi, subcategoriesdata, isLoading }) {
    const [showsub, Setshowsub] = useState(false);
    const [showdel2, Setshowdelete2] = useState(false);
    const [itemcode2, Setitemcode2] = useState(null);
    const [isupdate, Setisupdate] = useState(false);
    function subcategoriesdatalength() {
        if (!isLoading && subcategoriesdata.length !== 0) {
            const lengofsubcat = subcategoriesdata.slice(-1)[0].subCategory_Id;
            return lengofsubcat + 1;
        }
        else {
            const lengofsubcat = 1;
            return lengofsubcat;
        }
    }
    async function Deletesubcategories(id) {
        try {
            const response = await fetch(`/subcategory/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Setshowdelete2(false);
                Setshowsuccess(true);
                getsubcatapi();
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
            updatesubapistatus(id);
        }
        else if (getstatus === "pasif") {
            Statuschange.Status = "aktif";
            updatesubapistatus(id);
        }
        else {
            console.log("sorun var.")
        }
    }
    async function updatesubapistatus(id) {
        try {
            const response = await fetch(`/subcategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(Statuschange)
            });
            if (response.ok) {
                Setshowsuccess(true);
                getsubcatapi();
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    //Pagination işlemleri aşağıdaki gibidir.
    const [currentpage, setCurrentPage] = useState(1);
    const postperpage = 5;
    const { pagerender } = Postpage();
    const dataofpagerender = pagerender(currentpage, postperpage, subcategoriesdata);
    const paginate = (number) => setCurrentPage(number);
    return(
        <>
            <Addsubcategorymodal Setshowsub={Setshowsub} showsub={showsub} sublen={subcategoriesdatalength} categoriesdata={categoriesdata}
                Setisupdate={Setisupdate} isupdate={isupdate} subcategoriesdata={subcategoriesdata} getsubcatapi={getsubcatapi}
                showsuccess={showsuccess} Setshowsuccess={Setshowsuccess} modalactivate={modalactivate} itemcode2={itemcode2} />
             <div className="px-5 categories">
            <div className="d-flex ">
                    <h4 className="text-uppercase me-3 fw-semibold  my-3 align-self-center">Alt Kategori</h4>
                    <button type="button" className="btn btn-outline-dark fs-4 my-3" onClick={() => {
                        Setshowsub(true)
                        Setisupdate(false);
                    }}>+</button>
            </div>
            <table className="table text-center table-striped bg-white rounded">
                    <thead className="fw-semibold text-nowrap">
                    <tr>
                        <th scope="col">Alt Kategori Kodu</th>
                        <th scope="col">Ana Kategori Kodu</th>
                        <th scope="col">Alt Kategori Adı</th>
                        <th scope="col">Durum</th>
                        <th scope="col">Son Güncelleme Tarihi</th>
                        <th scope="col">Oluşturma Tarihi</th>
                        <th scope="col">Güncelle & Sil</th>
                    </tr>
                </thead>
                    <tbody className="my-auto align-middle">
                        {isLoading && <tr><td>Yükleniyor...</td></tr>}
                        {!isLoading && dataofpagerender.map(
                            item => (
                                <tr key={item.id}>
                                    <td>{item.subCategory_Id}</td>
                                    <td>{item.categoryId}</td>
                                    <td>{item.subtitle}</td>
                                    <td className=""><button type="button"
                                        className="btn btn-dark text-yellow text-capitalize text-nowrap"
                                        onClick={() => changestatus(item.status, item.subCategory_Id)}
                                    >
                                        {item.status}
                                    </button>
                                    </td>
                                    <td>{item.updated_at}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-dark btn-chnge mx-2" onClick={() => {
                                            Setshowsub(true);
                                            Setisupdate(true);
                                            Setitemcode2([item.subCategory_Id, item.subtitle, item.categoryId]);
                                        }}>
                                            <i className="bi bi-arrow-repeat"></i>
                                        </button>
                                        <button type="button" className="btn btn-outline-dark btn-chnge" onClick={() => { 
                                            Setshowdelete2(true);
                                            Setitemcode2([item.subCategory_Id, item.subtitle]); }}>
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
            <Pagination postsPerpage={postperpage} totalPosts={subcategoriesdata.length} paginate={paginate} currentpage={currentpage} setCurrentPage={setCurrentPage} />
            {showdel2 && <DeleteModal Setshowdelete={Setshowdelete2}
                Delete={Deletesubcategories} itemcode={itemcode2} showdel={showdel2} modalactivate={modalactivate} />}
        </>
    )
}
