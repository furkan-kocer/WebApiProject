import Anasayfa from "./Mainpage"
import İletişim from "./İletişim"
import Anakategori from "./Anakategori"
import Sepet from "./Sepet"
import Hakkımızda from "./Hakkımızda"
import Ürünler from "./Productindetail/Ürünler"
import AltKategori from "./Altkategori"
import Ürünara from "./Searchproduct"
import Ödeme from "./Ödeme"
const pages = [
    {
        index:true,
        element: <Anasayfa/>,
    },
    {
        path:"/iletisim",
        element:<İletişim/>,
    },
    {
        path:"/Kategoriler/:id",
        element: <Anakategori />,
    },
    {
        path:"/Sepetim",
        element: <Sepet/>,
    },
    {
        path: "/hakkimizda",
        element: <Hakkımızda />,
    },
    {
        path: "/Urunler/:id",
        element: <Ürünler />,
    },
    {
        path: "/AltKategori/:id",
        element: <AltKategori />,
    },
    {
        path: "/Arama",
        element: <Ürünara />,
    },
    {
        path: "/Odeme",
        element: <Ödeme />,
    },
]
export default pages;