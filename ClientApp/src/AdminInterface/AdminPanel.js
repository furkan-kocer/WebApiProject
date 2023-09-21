export default function AdminPanel() {
    return (
        <div className="admin-panel">
            <ul className="px-5 fw-normal">
               <li>Hoş geldiniz,</li>
               <li>Admin paneli aracılığıyla e-ticaret sistemi üzerinde dinamik değişiklikler yapılmaktadır.</li>
               <li>Admin paneli butonu ile istediğiniz sayfada aksiyon alırken ana sayfaya geri dönüş yapabilirsiniz.</li>
               <li>Kategori alanı ile yeni kategori oluşturabilir, önceden oluşturduğunuz kategorileri düzenleyebilir veya silebilirsiniz.
                Aynı işlemleri alt kategori oluşturmak için de yapabilirsiniz.
               </li>
               <li>Reklam verme kısmında e-ticaret sisteminin ana sayfa ekranında yer alan Reklam
                alanında görünmesini istediğiniz reklam veya kampanya detaylarını değiştirebilir,
                silebilir veya yeni reklam ekleyebilirsiniz.
               </li>
               <li>Ürün kısmında e-ticaret sisteminde yer almasını istediğiniz ürünleri ekleyebilir, önceden
                eklediğiniz ürünler üzerinde değişiklik yapabilir veya ürünü silebilirsiniz.
               </li>
               <li>Sistemden çıkış yapmak için Çıkış Yap butonuna tıklamanız gerekmektedir.</li>
            </ul>
        </div>
    )
}