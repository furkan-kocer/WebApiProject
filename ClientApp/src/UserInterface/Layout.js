import React from "react"
import { Container } from "reactstrap"
import Navbar from "./Navmenu"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
export default function Layout() {
    return (
        <div className="App-layout">
            <Navbar />
            <Container>
                <Outlet />
            </Container>
            <Footer/>
        </div>
    )
}