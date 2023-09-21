import {useState,useEffect} from "react"
export default function Cartoperations() {
    const cartStore = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setcart] = useState(cartStore);
    const [cartItemsCount, setcartItemsCount] = useState(0);
    useEffect(() => {
        setcartItemsCount(cart.length);
    }, [cart]);
    console.log(cartItemsCount);
    const [productobject, setproductobject] = useState();
    function addtocart(inputValue) {
        const itemIndex = cart.findIndex((item) => item.id === productobject.id);
        if (itemIndex === -1) {
            setcart([...cart, productobject]);
        }
        else if (itemIndex !== -1) {
            const updatedCartItems = [...cart];
            const variable = updatedCartItems[itemIndex].quantity + parseInt(inputValue);
            if (variable <= 10) {
                updatedCartItems[itemIndex].quantity += parseInt(inputValue);
                setcart(updatedCartItems);
            }
            else {
                console.log("Limit ürün sayısına ulaştınız...");
            }
        }
    }
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    return {
        cart,
        cartItemsCount,
        addtocart,
        setproductobject
        }
}