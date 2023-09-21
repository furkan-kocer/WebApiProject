import { Link } from "react-router-dom"
export default function Access() {
    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center">
            <h1>Giriş Başarısız.</h1>
            <p className="text-secondary">İzinsiz Giriş isteği tespit edildi!!!</p>
            <p className="fw-semibold">
                Bu alana girmeye yetkiniz yok.
                Lütfen giriş yapınız.
                Ya da aşağıdaki linkten ana sayfaya geri dönün.
            </p>
            <Link to="/">Ana Sayfaya Dön</Link>
        </div>
    )
}