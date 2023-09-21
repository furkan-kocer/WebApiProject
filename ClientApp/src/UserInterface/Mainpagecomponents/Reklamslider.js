import React, { useEffect, useState, useRef } from "react";
import Getapi from "../../Apirequests/Getapi"
import "./mainpagecomp.css"
export default function Advertisecarousel() {
    const { saveadvertisedata, getadvertiseapi, isLoading } = Getapi();
    useEffect(() => {
        getadvertiseapi();
    }, [])
    const saveactiveadvertisedata = saveadvertisedata.filter(item => item.status === "aktif");
    return (
        <>
            {isLoading &&
                <div className="d-flex mt-2">
                    <div className="spinner-border spinner-border-sm mx-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Reklam vitrini yükleniyor...</p>
                </div>
            }
            {saveactiveadvertisedata.length === 0 ? "" :
                <div id="carouselslider" className="carousel slide bg-dark shadow mt-2 rounded-1 mb-2" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {saveactiveadvertisedata.slice(0, 5).map((item, index) => (
                            <React.Fragment key={item.advertise_Id}>
                                <button type="button" data-bs-target="#carouselslider" data-bs-slide-to={index} className={index === 0 ? "active" : ""}
                                    key={item.advertise_Id}></button>
                            </React.Fragment>
                        ))
                        }
                    </div>
                    <div className="carousel-inner c-reklam rounded-1">
                        {saveactiveadvertisedata.slice(0, 5).map((item, index) => (
                            <React.Fragment key={item.advertise_Id}>
                                <div className={`carousel-item img-item ${index === 0 ? "active" : ""}`} data-bs-interval="5000">
                                    <img src={`imagespublic/reklamlar/${item.img_url}`} className="d-block h-100 w-100 object-fit-cover" alt="yok" />
                                    <div className="position-absolute text-white h-100 d-flex flex-column justify-content-end mx-5 pb-5">
                                        <h1 className="text-uppercase mx-5">{item.title}</h1>
                                        <p className="mx-5">{item.definition}</p>
                                    </div>

                                </div>
                            </React.Fragment>
                        ))
                        }
                    </div>
                    <button className="carousel-controlprev carouselprevproduct rounded-circle bg-body-tertiary" type="button" data-bs-target="#carouselslider" data-bs-slide="prev">
                        <i className="bi bi-chevron-compact-left fs-2"></i>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-controlnext carouselnextproduct rounded-circle bg-body-tertiary" type="button" data-bs-target="#carouselslider" data-bs-slide="next">
                        <i className="bi bi-chevron-compact-right fs-2"></i>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>}
        </>
    )
}