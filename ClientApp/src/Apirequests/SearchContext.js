import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {useCart} from "./CartContext"
const SearchContext = createContext();

export const useSearch = () => {
    return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
    const { setsuccessornot, Setcounter, settoastmessage, settoastactive } = useCart();
       //Search işlemleri
    const [getsearchdata, setgetsearchdata] = useState([]);
    const [getsearchdatasorted, setgetsearchdatasorted] = useState([]);
    const [isLoadingsearch, setisLoadingsearch] = useState(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();  
    const [query, setQuery] = useState('');
    function handlesearch(event) {
        event.preventDefault();
        if (query === "" || (query.length < 2) ) {
            setsuccessornot("başarısız");
            Setcounter(5);
            settoastmessage("Lütfen en az 2 karakter girin");
            settoastactive(true);
        }
        else {
            settoastactive(false);
            searchapi();
        }
    }
    function searchapi(initial) {
        const searchQuery = initial || query;
        setSearchParams({ query: searchQuery });
        fetch(`product/search?query=${searchQuery}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setgetsearchdata(data);
                setgetsearchdatasorted(data);
                setisLoadingsearch(false);
                navigate(`/Arama?query=${searchQuery}`);
            })
            .catch(error => {
                console.log(error);
                navigate("*");
                setisLoadingsearch(false);
                setQuery('');
            });
    }
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/Arama') {
            setQuery('');
        }
    }, [location]);
    const value = {
        setQuery,
        query,
        handlesearch,
        getsearchdata,
        isLoadingsearch,
        searchapi,
        searchParams,
        setisLoadingsearch,
        getsearchdatasorted,
        setgetsearchdata
    };
    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};