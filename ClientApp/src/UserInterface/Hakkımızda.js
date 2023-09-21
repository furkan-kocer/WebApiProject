import aboutus from "../images/aboutus.jpg"
export default function Hakkımızda() {
    return (
        <div className="d-flex mt-3 justify-content-between hakkımızda">
            <div className="hakkımızdapart">
                <h1 className="text-uppercase">hakkımızda</h1>
                <p>İnnova tarafından hazırlanmış teknoloji içerikli e-ticaret uygulaması.</p>
            </div>
            <div className="col-3 me-5">
                <img src={aboutus} className="w-100 h-75 object-fit-cover shadow-sm" alt="yok" />
            </div> 
        </div>   
        )
}