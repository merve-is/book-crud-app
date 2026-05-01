import { NavLink } from "react-router";
import NavItem from "./NavItem";

const Navbar = () => {
    return (
        <div className="navbar bg-emerald-900 shadow-sm">
            <div className="flex-1">
                <NavLink to="/" className="btn btn-ghost text-2xl">
                    BookDB
                </NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    
                        <NavItem to="/books">Kitaplar</NavItem>
                        <NavItem to="/books/add">Ekle</NavItem>
                </ul>
            </div>
        </div>
    );
};
export default Navbar;