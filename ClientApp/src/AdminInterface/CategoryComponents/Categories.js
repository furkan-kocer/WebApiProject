import Subcategory from "./Subcategory"
import Maincategory from "./Maincategory"
import Addcategorymodal from "./Addcategory"
import React, { useState, useEffect } from 'react';
import Successmodal from "../Successmodal"
import DeleteModal from "../Deletemodal";
import Postpage from "../../Paginationtransactions/Postpage";
import Pagination from "../../Paginationtransactions/Pagination"
export default function Categories({ modalactivate }) {
    //Ana kategori verisi alınıp categories data dizisine ekleniyor 
    const [categoriesdata, setcategoriesdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    //Alt kategori verisi alınıp categories data dizisine ekleniyor 
    const [subcategoriesdata, setsubcategoriesdata] = useState([]);
    //Başarılı pop up'ı alttaki state'e göre görünüyor.
    const [showsuccess, Setshowsuccess] = useState(false);
    //Silme pop up'ı alttaki state'e göre görünüyor.
    const [showdel, Setshowdelete] = useState(false);
    //Başka sayfaya verinin kodu ve adını göndermek için kullanılan state
    const [itemcode, Setitemcode] = useState(null);
    //Kategoriler ekleme Pop up'ının görünmesinin state yönetimi
    const [show, Setshow] = useState(false);
    //Kategorilerde herhangi bir ürünü silmeye kalktığımızda önümüze çıkan mesajın state'i
    const [sendederror, Setsendederror] = useState(false);
    //Buradaki state ile butonlardan tıklanan kısmın ekleme mi yoksa güncelleme mi olduğunu belirliyoruz.
    const [isupdate, Setisupdate] = useState(false);
    //maincategory adresinde dönen get requesti bu fonksiyonla çağırıyoruz. Ana kategorileri request eden fetch fonksiyonu
    async function getapi() {
        const response = await fetch('/maincategory');
        const data = await response.json();
        //fetch edilen adresden dönen veriyi yeni bir array'e atayan state
        setcategoriesdata(data);
        //Kategoriler tablosuna veriler yüklendikten sonra loading yazısını kaldıran state 
        setIsLoading(false);
    }
    //subcategory adresinde dönen get requesti bu fonksiyonla çağırıyoruz. Alt kategorileri request eden fetch fonksiyonu
    async function getsubcatapi() {
        const response = await fetch('/subcategory');
        const data = await response.json();
        //fetch edilen adresden dönen veriyi yeni bir array'e atayan state
        setsubcategoriesdata(data);
        //Alt kategoriler tablosuna veriler yüklendikten sonra loading yazısını kaldıran state 
        setIsLoading(false);
    }
    //Useeffect fonksiyonu sayesinde getapi fonksiyonunu sürekli loop şeklinde getirmek yerine sadece veri değiştiğinde ya da sayfa yeniliklentikten sonra getiriyoruz.
    useEffect(() => {
        getapi();
    }, []);
    useEffect(() => {
        getsubcatapi();
    }, []);
    /*Alttaki kod eğer sayfa yüklenmiyorsa yani veriler api ile geldiyse ve gelen verilerde boş dizi yoksa çalışır.
     Buna göre categoriesdata dizisi slice fonksiyonu ile ayrılıp dizideki son indexten bir array oluşturulup bu arrayin ilk elamanı tanımlanır ve categorycode
     objesi bu yeni array'e aktarılır. Bu fonksiyonda aktarılan array örneğin 1 'den fazla ise ilk durum döner değilse 1 döner. Kısaca auto increment yapmak için böyle
     bir fonksiyon kullanma ihtiyacı duydum.
     */
    function categoriesdatalength() {
        if (!isLoading && categoriesdata.length !== 0) {
            const lengofcat = categoriesdata.slice(-1)[0].categorycode;
            return lengofcat + 1;
        }
        else {
            const lengofcat = 1;
            return lengofcat;
        }
    }
    //Verilen id parametresi ile veritabanına delete sorgusu yapar.
    async function Deletecategories(id) {
        try {
            const response = await fetch(`/maincategory/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                //Buradaki fonksiyon ana kategorinin id'sine bağlı alt kategorileri de silmek için kullanılır.
                deletesub(id);
                //İşlem başarılı olduğu için silme modali kapatılır.
                Setshowdelete(false);
                //Ekrana işlemin başarılı olduğunu gösteren bir pop up gösterilir.
                Setshowsuccess(true);
                //En son olarak verilerin güncellendiğini görebilmek için tekrardan getapi fonksiyonu ile değiştirilen veriler request edilir.
                getapi();
            } else {
                console.error(`Failed to delete item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting item with ID ${id}: ${error}`);
        }
    }
    //Verilen ana kategori id değerine bağlı alt kategori silme işlemi
    function deletesub(id) {
        fetch(`/subcategory/sub/${id}`,
            {
                method: 'DELETE',
            }).then(response => {
                if (response.ok) {
                    getsubcatapi();
                }
            })
    }
    const Statuschange = {
        Status: "",
    }
    function changestatus(getstatus, id) {
        if (getstatus === "aktif") {
            Statuschange.Status = "pasif";
            updatecategoryapistatus(id);
        }
        else if (getstatus === "pasif") {
            Statuschange.Status = "aktif";
            updatecategoryapistatus(id);
        }
        else {
            console.log("sorun var.")
        }
    }
    async function updatecategoryapistatus(id) {
        try {
            const response = await fetch(`/maincategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(Statuschange)
            });
            if (response.ok) {
                Setshowsuccess(true);
                getapi();
            } else {
                console.error(`Failed to update item with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating item with ID ${id}: ${error}`);
        }
    }
    //Pagination işlemleri aşağıdaki gibidir.
    const [currentpage, setCurrentPage] = useState(1);
    const postperpage = 5;
    const { pagerender } = Postpage();
    const dataofpagerendercategory = pagerender(currentpage, postperpage, categoriesdata);
    const paginate = (number) => setCurrentPage(number);
    if (isLoading) {
        return (<div className="d-flex mt-2">
            <div className="spinner-border spinner-border-sm mx-2" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Yükleniyor...</p>
        </div>)
    }
    return (
        <>
            <Maincategory Setshow={Setshow} Setisupdate={Setisupdate} isLoading={isLoading} Setshowdelete={Setshowdelete}
                categoriesdata={dataofpagerendercategory} changestatus={changestatus} Setitemcode={Setitemcode} />
            <Pagination postsPerpage={postperpage} totalPosts={categoriesdata.length} paginate={paginate} currentpage={currentpage} setCurrentPage={setCurrentPage} />
            <Addcategorymodal catlen={categoriesdatalength} datacheck={categoriesdata}
                show={show} Setshow={Setshow} showsuccess={showsuccess} Setshowsuccess={Setshowsuccess} getapi={getapi}
                Setisupdate={Setisupdate} isupdate={isupdate} itemcode={itemcode} modalactivate={modalactivate}
            />
            <Subcategory categoriesdata={categoriesdata} showsuccess={showsuccess} Setshowsuccess={Setshowsuccess}
                modalactivate={modalactivate} subcategoriesdata={subcategoriesdata} getsubcatapi={getsubcatapi}
                setIsLoading={setIsLoading} isLoading={isLoading} />
            {showsuccess &&
                <Successmodal Setshowsuccess={Setshowsuccess} showsuccess={showsuccess} modalactivate={modalactivate} />}
            {showdel &&
                <DeleteModal Setshowdelete={Setshowdelete} Setsendederror={Setsendederror} sendederror={sendederror}
                    Delete={Deletecategories} itemcode={itemcode} showdel={showdel} modalactivate={modalactivate} />}
        </>
    )
}