export default function Contactmessage() {
    return (
        <div className="modal-wrapper bgpopupcolor">
            <div className="modalcontent modalcontentpositioning">
                <div className="d-flex justify-content-center">
                    <div className="shadow bg-body rounded w-25">
                        <div className="modal-header border-bottom py-3">
                            <h5 className="modal-title fw-semibold mx-2">İşlem Kontrol Ediliyor.</h5>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center justify-content-center py-5">
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="fs-5 m-0"> Lütfen bekleyiniz...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}