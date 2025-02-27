import { Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

// const userRole = {
//   ADMIN: "admin",
//   CUSTOMER: "customer",
// };

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  // let sidebarItems;

  // // switch ((user as TUser)!.role) {
  // //   case userRole.ADMIN:
  // //     sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
  // //     break;
  // //   case userRole.CUSTOMER:
  // //     sidebarItems = sidebarItemsGenerator(customerPaths, userRole.CUSTOMER);
  // //     break;

  // //   default:
  // //     break;
  // // }

  return (
    <Col md={2} className="bg-dark text-white p-3 vh-100">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? "nav-link bg-primary text-white" : "nav-link text-white"
        }
      >
        Bike Shop
      </NavLink>
      <Nav className="flex-column mt-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link bg-primary text-white" : "nav-link text-white"
          }
        >
          Dashboard
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-primary text-white"
                : "nav-link text-white"
            }
          >
            All products
          </NavLink>
        )}
        {user?.role === "admin" && (
          <NavLink
            to="/dashboard/create-product"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-primary text-white"
                : "nav-link text-white"
            }
          >
            Create product
          </NavLink>
        )}
        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            isActive ? "nav-link bg-primary text-white" : "nav-link text-white"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "nav-link bg-primary text-white" : "nav-link text-white"
          }
        >
          Profile
        </NavLink>
      </Nav>
    </Col>
  );
};

export default Sidebar;
