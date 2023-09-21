import React,{ useEffect, useState } from "react"

export default function Successmodal({ Setshowsuccess, showsuccess, modalactivate }) {
    modalactivate(showsuccess);
    const [counter, Setcounter] = useState(5);
    useEffect(
        () => {
            if (showsuccess === true) {
                const timer = counter > 0 && setInterval(() => Setcounter(counter - 1), 1000);
                if (counter === 0) {
                   Setshowsuccess(false);
                }
                return () => clearInterval(timer);
            }
        }, [counter]);
    return (
        <>
            <div className="modal-wrapper"> 
                <div className="overlay" onClick={() => Setshowsuccess(false)}></div>
                <div className="modalcontent">
                    <div className="d-flex justify-content-center">
                        <div className="border bg-body rounded p-3 mt-5">
                            <div className="modal-header">
                                <h5 className="modal-title fw-semibold text-success">Başarılı</h5>
                                <button type="button" className="btn-close" onClick={() => Setshowsuccess(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body my-3">
                                <p>Değişikler başarı şekilde kaydedilmiştir.</p> 
                                <p>Pop up <span className="text-primary fw-bold">{counter}</span> saniye sonra kapanacaktır.</p>
                            </div>
                            <div className="modalfooter d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary" onClick={() => Setshowsuccess(false)}>Kapat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
}
