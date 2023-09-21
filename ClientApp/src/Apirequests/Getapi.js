import {useState} from "react"
export default function Getapi() {
    const [isLoading, setIsLoading] = useState(true);
    const [saveadvertisedata, setsaveadvertisedata] = useState([]);
    const [saveproductdata, setsaveproductdata] = useState([]);

    async function getadvertiseapi() {
        const response = await fetch('/advertise');
        const data = await response.json();
        setsaveadvertisedata(data);
        setIsLoading(false);
    }
    const [isLoadingpro, setIsLoadingpro] = useState(true);
    async function getproductapi() {
        const response = await fetch('/product/uiproduct');
        const data = await response.json();
        setsaveproductdata(data);
        setIsLoadingpro(false);
    }

    return {
        saveadvertisedata,
        getadvertiseapi,
        isLoading,
        saveproductdata,
        getproductapi,
        isLoadingpro,
        setIsLoadingpro
        }
}