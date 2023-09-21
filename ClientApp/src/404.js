import { Link } from "react-router-dom"
export default function NotFound() {
    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center">
            <h1>404</h1>
            <p>Aradığınız sayfa bulunamadı!</p>
            <p> Lütfen tekrar deneyin ya da
                linkten ana sayfaya dönün.</p>
            <Link to="/">Ana Sayfaya Dön</Link>
        </div>
    )
}