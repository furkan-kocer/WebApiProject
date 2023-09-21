export default function Maincategory({Setshow,Setisupdate,isLoading,categoriesdata,changestatus,Setitemcode,Setshowdelete }) {
    return (
        <>
            <div className="px-5 categories">
                <div className="d-flex">
                    <h4 className="text-uppercase me-3 fw-semibold my-3 align-self-center">Kategori</h4>
                    <button type="button" className="btn btn-outline-dark fs-4 my-3"
                        onClick={() => {
                            Setshow(true);
                            Setisupdate(false);
                        }
                        }>+</button>
                </div>
                <table className="table table-striped bg-white rounded text-center">
                    <thead className="fw-semibold text-nowrap">
                        <tr className="">
                            <th scope="col">Ana Kategori Kodu</th>
                            <th scope="col">Kategori Adı</th>
                            <th scope="col">Durum</th>
                            <th scope="col">Son Güncelleme Tarihi</th>
                            <th scope="col">Oluşturma Tarihi</th>
                            <th scope="col">Güncelle & Sil</th>
                        </tr>
                    </thead>
                    <tbody className="my-auto align-middle">
                        {isLoading && <tr><td>Yükleniyor...</td></tr>}
                        {!isLoading && categoriesdata.map(
                            item => (
                                <tr key={item.id}>
                                    <td>{item.categorycode}</td>
                                    <td>{item.categorytitle}</td>
                                    <td className=""><button type="button"
                                        className="btn btn-dark text-yellow text-capitalize text-nowrap"
                                        onClick={() => changestatus(item.status, item.categorycode)}
                                    >
                                        {item.status}
                                    </button>
                                    </td>
                                    <td>{item.updated_at}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-dark btn-chnge mx-2" onClick={() => {
                                            Setshow(true);
                                            Setisupdate(true);
                                            Setitemcode([item.categorycode, item.categorytitle]);
                                        }
                                        }>
                                            <i className="bi bi-arrow-repeat"></i>
                                        </button>
                                        <button type="button" className="btn btn-outline-dark btn-chnge" onClick={() => {
                                            Setshowdelete(true);
                                            Setitemcode([item.categorycode, item.categorytitle]);
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
        </>
        )
}