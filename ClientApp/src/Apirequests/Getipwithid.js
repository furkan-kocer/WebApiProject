import { useState } from "react"
import { useNavigate } from 'react-router-dom';
export default function Getapiwid() {
    const [getproductdata, setgetproductdata] = useState([]);
    const [getprowcatdata, setgetprowcatdata] = useState([]);
    const [getprowsubdata, setgetprowsubdata] = useState([]);
    const [isLoadingpro, setIsLoadingpro] = useState(true);
    const [isLoadingprocat, setIsLoadingprocat] = useState(true);
    const [isLoadingprosub, setisLoadingprosub] = useState(true);
    const navigate = useNavigate();
    function getproductapi(id) {
        fetch(`/product/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setgetproductdata(data);
                setIsLoadingpro(false);
            })
            .catch(error => {
                console.log(error);
                navigate("*");
                setIsLoadingpro(false);
            });
    }
    const [originalProductsmain, setOriginalProductsmain] = useState([]);
    function getproductwcategoryapi(id) {
        fetch(`product/category/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setgetprowcatdata(data);
                setOriginalProductsmain(data);
                setIsLoadingprocat(false);
            })
            .catch(error => {
                console.log(error);
                navigate("*");
                setIsLoadingprocat(false);
            });
    }
    const [originalProducts, setOriginalProducts] = useState([]);
    function getproductwsubapi(id) {
        fetch(`product/subcategory/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setgetprowsubdata(data);
                setOriginalProducts(data);
                setisLoadingprosub(false);
            })
            .catch(error => {
                console.log(error);
                navigate("*");
                setisLoadingprosub(false);
            });
    }
    return {
        getproductdata,
        isLoadingpro,
        getproductapi,
        isLoadingprocat,
        getprowcatdata,
        getproductwcategoryapi,
        isLoadingprosub,
        getproductwsubapi,
        getprowsubdata,
        setIsLoadingprocat,
        setisLoadingprosub,
        setgetprowsubdata,
        originalProducts,
        originalProductsmain,
        setgetprowcatdata
    }
}