import { NavLink } from "react-router";

type Props = {
    to: string;
    children: React.ReactNode;
};
const NavItem = ({ to, children }: Props) => {
    return (
        <li>
            <NavLink
                to={to}
                end
                className={({ isActive }) => `${isActive ? "menu-active" : ""}`}
            >
            {children}
            </NavLink>
        </li>
    );
};
export default NavItem;