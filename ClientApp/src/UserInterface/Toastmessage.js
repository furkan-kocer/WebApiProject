import { useCart } from "../Apirequests/CartContext"
export default function Toastmessage() {
    const { toastmessage, settoastactive, successornot,counter } = useCart();
    const progressBarWidth = (counter / 5) * 100;
    return (
        <div className={`position-absolute toastshow shadow rounded-4`}>
            <div className="d-flex justify-content-between border-bottom p-2">
                <strong className="text-capitalize">{successornot ==="başarılı" ? "İşlem başarılı" : "İşlem başarısız" }</strong>
                <button type="button" className="btn-close" onClick={() => settoastactive(false)} aria-label="Close"></button>
            </div>
            <div className=" d-flex align-items-center pe-2 py-3">
                <div className="fs-4 my-auto mx-2">{successornot === "başarılı" ? <i className="bi bi-check-circle-fill text-success"></i>
                    : <i className="bi bi-exclamation-circle-fill text-danger"></i>}
                </div>
                {toastmessage}
            </div>
            <div className="progress-bar" style={{ width: `${progressBarWidth}%` }} />
        </div>
        )
}