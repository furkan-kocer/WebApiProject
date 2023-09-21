import { createContext, useContext, useState, useEffect } from 'react';
import getapi from "./Getapi"
import { useLocation } from "react-router-dom"
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
    //cartstore değişkenine eğer localstorage'da cart adında bir değer varsa ata yoksa boş dizi döndürme
    const cartStore = JSON.parse(localStorage.getItem('cart') || '[]');
    //cartstore değişkenini cart dizisine state olarak atama
    const [cart, setCart] = useState(cartStore);
    //cartitemscount state değişkenine başlangıç olarak 0 değerini atama
    const [cartItemsCount, setCartItemsCount] = useState(0);
    //Sepete ekleme çıkarma işlemi sırasında değişecek olan mesaj
    const [toastmessage, settoastmessage] = useState("");
    //mesaj aktif veya pasif
    const [toastactive, settoastactive] = useState(false);
    //Her cart dizisi değiştiğinde setcartitems.. işlemiyle cartitemscount durumu cart dizisinin uzunluğuyla değiştirilir.
    useEffect(() => {
        setCartItemsCount(cart.length);
    }, [cart]);
    //Her cart dizisi değiştiğinde localstoragedaki cart değerine cart dizisi eklenir.
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const [paymentsuccessfull, setpaymentsuccessfull] = useState(false);
    const [counter, Setcounter] = useState(5);
    useEffect(
        () => {
            if (toastactive === true) {
                const timer = counter > 0 && setInterval(() => Setcounter(counter - 1), 1000);
                if (counter === 0) {
                    settoastactive(false);
                    if (paymentsuccessfull) {
                        setCart([]);
                    }
                }
                return () => clearInterval(timer);
            }
        }, [toastactive, counter]);
    const [successornot, setsuccessornot] = useState("başarılı");
    //addtocart fonksiyonu çalıştığında inputvalue ve productobject parametrelerini alır.
    const addtocart = (inputValue, productobject) => {
        Setcounter(5);
        //productobject id'si ile cart dizisindeki id karşılaştırılıp eşleşen index bulunur.
        const itemIndex = cart.findIndex((item) => item.id === productobject.id);
        //Eğer index bulunamadıysa -1 değeri döner.
        if (itemIndex === -1) {
            //Cart dizisine cartta önceden yer alan değerler ve yeni değerler atanır.
            setCart([...cart, productobject]);
            setsuccessornot("başarılı");
            const toastMessage = (
                <div className="d-block mx-2">
                    <p className="mb-0 pb-0">Ürün sepete başarıyla eklendi.</p>
                    <p className="pb-0 mb-0">Eklenen ürün adedi: {inputValue}</p>
                </div>
            );
            settoastmessage(toastMessage);
            settoastactive(true);
        }
        //Eğer carttaki index eşleşirse carttaki quantity değeri değişir.
        else if (itemIndex !== -1) {
            const updatedCartItems = [...cart];
            const variable = updatedCartItems[itemIndex].quantity + parseInt(inputValue);
            setsuccessornot("başarılı");
            settoastmessage(`Ürünün adedi ${inputValue} arttırıldı.`);
            settoastactive(true);
            if (variable <= 10) {
                updatedCartItems[itemIndex].quantity += parseInt(inputValue);
                setCart(updatedCartItems);
            } else {
                setsuccessornot("başarısız");
                const toastMessage = (
                    <div className="d-block mx-2">
                        <p className="mb-0 pb-0">Eklenecek ürün limitine ulaştınız.</p>
                        <p className="pb-0 mb-0">Not: Ürün limiti her bir ürün için 10'dur.</p>
                    </div>
                );
                settoastmessage(toastMessage);
                settoastactive(true);
            }
        }
    };
    const location = useLocation();
    useEffect(() => {
        settoastactive(false);
        Setcounter(5);
        if (paymentsuccessfull) {
            setCart([]);
        }
    }, [location.key]);
    function deletefromcart(productid) {
        const updatedCart = cart.filter(item => parseInt(item.id) !== productid);
        setCart(updatedCart);
    };
    function removeallcart() {
        setCart([]);
    }
    const setQuantity = (product, amount) => {
        if (amount === "" || isNaN(amount) || amount === 0) {
            setsuccessornot("başarısız");
            Setcounter(5);
            settoastmessage("ürün adedi boş bırakılamaz.");
            settoastactive(true);
            amount = 1;
        }
        if (amount >= 1 && amount<=10) {
            const newCart = cart.map((item) => {
                if (parseInt(item.id) === product.product_Id) {
                    return { ...item, quantity: parseInt(amount) };
                }
                return item;
            });
            setCart(newCart);
        }
    }
    const incrementQuantity = (product) => {
        if (product.quantity === 10) {
            setsuccessornot("başarısız");
            Setcounter(5);
            settoastmessage("Ürün adedi 10'dan fazla olamaz");
            settoastactive(true);
        }
        const newCart = cart.map((item) => {
            if (parseInt(item.id) === product.product_Id && item.quantity < 10) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(newCart);
    }

    const decrementQuantity = (product) => {
        const newCart = cart.map((item) => {
            if (parseInt(item.id) === product.product_Id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(newCart);
    }
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const calculatedTotalPrice = cartProducts.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0);
        setTotalPrice(calculatedTotalPrice);
    }, [cartProducts])
    const value = {
        cartItemsCount,
        addtocart,
        toastmessage,
        toastactive,
        settoastactive,
        Setcounter,
        successornot,
        counter,
        deletefromcart,
        settoastmessage,
        setsuccessornot,
        cart,
        setCart,
        setQuantity,
        incrementQuantity,
        decrementQuantity,
        removeallcart,
        totalPrice,
        setCartProducts,
        cartProducts,
        setTotalPrice,
        setpaymentsuccessfull
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};