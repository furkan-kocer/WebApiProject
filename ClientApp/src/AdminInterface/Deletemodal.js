import React from "react"
export default function DeleteModal({ Setshowdelete, Delete, itemcode, showdel, modalactivate, sendederror, Setsendederror }) {
    modalactivate(showdel);
    if (Setsendederror) {
        Setsendederror(true);
    }
    function back() {
        Setshowdelete(false);
    }
    function deleteitem(itemid) {
        Delete(itemid);
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modalcontent">
                    <div className="d-flex justify-content-center">
                        <div className="border bg-body rounded p-3 mt-5">
                            <div className="modal-header">
                                <h5 className="modal-title fw-semibold text-danger">Silme işlemi</h5>
                                <button type="button" className="btn-close" onClick={() => Setshowdelete(false)} aria-label="Close"></button>
                            </div>
                            <hr/>
                            <div className="modal-body m-4">
                                <p className="text-dark"><span className="fw-semibold text-dark">{itemcode[1]}</span> kalıcı olarak silinecektir.</p>
                                <p className="text-dark">Silmek istediğinize emin misiniz?</p>
                                {sendederror && <>
                                    <p className="text-danger fw-semibold">Dikkat! Bu işlem geri alınamaz.</p>
                                    <p className="text-danger fw-semibold">Bu Kategori adı ile eşleşen tüm alt kategoriler silinecektir.</p>
                                </>
                                }
                                    
                            </div>
                            <div className="modalfooter d-flex justify-content-center">
                                <button type="button" className="btn btn-primary me-5" onClick={() => deleteitem(itemcode[0])}>Evet</button>
                                <button type="button" className="btn btn-primary" onClick={back}>Hayır</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}