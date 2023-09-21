import React, { useState, useEffect } from "react"
export default function Getapi() {
    //Kategori get api burası....
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesdata, setcategoriesdata] = useState([]);
    async function getcategoryapi() {
        const response = await fetch('/maincategory');
        const data = await response.json();
        setcategoriesdata(data);
        setIsLoading(false);
    }
    useEffect(() => {
        getcategoryapi();
    }, []);
    //Alt Kategori ile Ana Kategori birleştirilmiş halinin get apisi
    const [subcategoriesdata, setsubcategoriesdata] = useState([]);
    async function getsubcatapi() {
        const response = await fetch('/subcategory/subcategories');
        const data = await response.json();
        setsubcategoriesdata(data);
        setIsLoading(false);
    }
    useEffect(() => {
        getsubcatapi();
    }, []);
    return {
        categoriesdata,
        isLoading,
        subcategoriesdata
    }
}