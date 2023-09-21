import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
import "./Modal.css"
export default function AdminLayout({ islogout, username }) {
    return(
        <div className="d-flex">
        <Sidebar islogout={islogout} username={username}/>
            <div className="py-4 bg-light w-100" >
        <Outlet />
            </div>
        </div>
    )
}