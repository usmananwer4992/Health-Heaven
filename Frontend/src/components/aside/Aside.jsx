import React, { useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import AsideImage from "../../assets/images/svg-icon/color-svg/custom-17.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleById } from "../../redux/rolesSlice";
import UserHasPermission from "../../utils/Permissions";

const Aside = ({ Icon, sideBarRefresh,setSideBarRefresh }) => {
  const navigate = useHistory();

  const dispatch = useDispatch();
  const [role, setRole] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    dispatch(fetchRoleById(user?.roleId, "partner"));
  }, [user]);

  //  const { modulePermissions } = useSelector((state) => state.roles);
  const userAllowedPermissions = useSelector((state) => state.roles.role);
  const [isActive, setIsActive] = React.useState(false);
  const [isActive2, setIsActive2] = React.useState(false);
  const [isActive3, setIsActive3] = React.useState(false);

  const [subMenuActive, setSubMenuActive] = React.useState("");
  const [subMenuActive2, setSubMenuActive2] = React.useState("");
  const [subMenuActive3, setSubMenuActive3] = React.useState("");
  const [activeSubMenus, setActiveSubMenus] = React.useState({});

  const [activeItem, setActiveItem] = React.useState("");
  const [activeStates, setActiveStates] = React.useState({
    orders: false,
    drugs: false,
    accesstype: false,
  });

  const handleClick = (
    e,
    item,
    submenu,
    activeStates,
    setActiveStates,
    setActiveItem,
    setActiveSubMenu
  ) => {
    e.stopPropagation();

    // Determine the submenu key
    const submenuKey = submenu || item.slug || item;

    // Close all other submenus
    const updatedActiveStates = {};
    Object.keys(activeStates).forEach((key) => {
      updatedActiveStates[key] = key === submenuKey;
    });

    // Update the active state for the clicked menu
    const isActive = !activeStates[submenuKey];
    updatedActiveStates[submenuKey] = isActive;

    // Close other menus at the same level
    if (!submenu || submenuKey.includes("orders")) {
      setIsActive(true);
      setIsActive2(false);
      setIsActive3(false);
    } else if (submenuKey.includes("drugs")) {
      setIsActive(false);
      setIsActive2(true);
      setIsActive3(false);
    } else if (submenuKey.includes("accesstype")) {
      setIsActive(false);
      setIsActive2(false);
      setIsActive3(true);
    }

    // Set the active item if it's not a submenu
    if (!submenu) {
      setActiveItem(item);
    }

    // Set the active submenu if it's a submenu
    if (submenu) {
      setActiveSubMenu(submenu);
    }

    // Update the state
    setActiveStates(updatedActiveStates);

    // Remove activeMenu from local storage if submenu is null
    if (submenu === null) {
      localStorage.removeItem("activeSubMenu");
      localStorage.removeItem("activeLevel");

      setIsActive(false);
      setIsActive2(false);
      setIsActive3(false);

      // Store active menu in local storage
      localStorage.setItem("activeMenu", item);
    } else {
      setActiveItem("");
      // Store active menu and submenu in local storage
      localStorage.setItem("activeMenu", item);
    }
  };

  const handleSubMenuClick = (event, level, item) => {
    event.stopPropagation();

    // Close all other submenus
    setIsActive(false);
    setIsActive2(false);
    setIsActive3(false);

    // Set the active submenu
    setSubMenuActive(item);
    setSubMenuActive2(level === 2 ? item : "");
    setSubMenuActive3(level === 3 ? item : "");

    // Set the state for the clicked submenu
    if (level === 1) {
      setIsActive(true);
    } else if (level === 2) {
      setIsActive2(true);
    } else if (level === 3) {
      setIsActive3(true);
    }

    localStorage.setItem("activeSubMenu", item || "");
    localStorage.setItem("activeLevel", level);
  };

  const hardRefresh= ()=>{
    localStorage.setItem("activeMenu","");
    localStorage.setItem("activeSubMenu","");
    localStorage.setItem("activeLevel","");
  }
  useEffect(()=>{
    if(sideBarRefresh === true){
      hardRefresh()
      navigate.push('/')
      setSideBarRefresh(false)
    }

  },[sideBarRefresh])
  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("user"));
    setRole(res?.roles[0]);

    // Check local storage for active menu and submenu
    const activeMenu = localStorage.getItem("activeMenu");
    const activeSubMenu = localStorage.getItem("activeSubMenu");
    const level = localStorage.getItem("activeLevel");

    // Set active states based on local storage values
    if (activeMenu) {
      setActiveItem(activeMenu);
      setActiveStates((prev) => ({ ...prev, [activeMenu]: true }));
    }

    // Set the active submenu
    setSubMenuActive(activeSubMenu);
    setSubMenuActive2(level === "2" ? activeSubMenu : "");
    setSubMenuActive3(level === "3" ? activeSubMenu : "");

    // Set the state for the clicked submenu
    if (level === "1") {
      setIsActive(true);
    } else if (level === "2") {
      setIsActive2(true);
    } else if (level === "3") {
      setIsActive3(true);
    }
  }, []); // Empty dependency array to run only on mount

  return (
    <aside className="main-sidebar">
      <section className="sidebar position-relative">
        <div className="multinav" style={{ overflow: "scroll" }}>
          <div className="multinav-scroll" style={{ height: "100%" }}>
            {role === "PARTNER" || role === "partner" ? (
              <ul
                className="sidebar-menu"
                style={{ minHeight: "60%" }}
                data-widget="tree"
              >
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_DRUGS"
                ) && (
                  <li
                    className={
                      isActive2 ? "treeview menu-open active" : "treeview"
                    }
                    onClick={(e) =>
                      handleClick(
                        e,
                        "drugs",
                        "drugs",
                        activeStates.drugs,
                        (updatedState) =>
                          setActiveStates({
                            ...activeStates,
                            drugs: updatedState,
                          }),
                        setActiveItem,
                        setActiveSubMenus
                      )
                    }
                  >
                    <a href="#">
                      <Icon.Droplet />
                      <span>Drug</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-right pull-right"></i>
                      </span>
                    </a>
                    <ul
                      className="treeview-menu"
                      style={{ display: isActive2 ? "block" : "none" }}
                    >
                      <li
                        onClick={(e) => handleSubMenuClick(e, 2, "drugs")}
                        className={`${
                          subMenuActive2 === "drugs" ? "active" : ""
                        }`}
                      >
                        <Link to="/app/partner/drug/drugs">
                          <i className="icon-Commit m-0  ">
                            <Icon.File style={{ width: "15px" }} />
                          </i>
                          <span>Drugs</span>
                        </Link>
                      </li>
                      <li
                        onClick={(e) => handleSubMenuClick(e, 2, "category")}
                        className={`${
                          subMenuActive2 === "category" ? "active" : ""
                        }`}
                      >
                        <Link to="/app/partner/drug/categories">
                          <i className="icon-Commit m-0  ">
                            <Icon.File style={{ width: "15px" }} />
                          </i>
                          <span>Category</span>
                        </Link>
                      </li>
                      <li
                        onClick={(e) => handleSubMenuClick(e, 2, "class")}
                        className={`${
                          subMenuActive2 === "class" ? "active" : ""
                        }`}
                      >
                        <Link to="/app/partner/drug/classes">
                          <i className="icon-Commit m-0  ">
                            <Icon.File style={{ width: "15px" }} />
                          </i>
                          <span>Class</span>
                        </Link>
                      </li>
                      <li
                        onClick={(e) => handleSubMenuClick(e, 2, "form")}
                        className={`${
                          subMenuActive2 === "form" ? "active" : ""
                        }`}
                      >
                        <Link to="/app/partner/drug/forms">
                          <i className="icon-Commit m-0  ">
                            <Icon.File style={{ width: "15px" }} />
                          </i>
                          <span>Form</span>
                        </Link>
                      </li>
                      <li
                        onClick={(e) => handleSubMenuClick(e, 2, "type")}
                        className={`${
                          subMenuActive2 === "type" ? "active" : ""
                        }`}
                      >
                        <Link to="/app/partner/drug/types">
                          <i className="icon-Commit m-0  ">
                            <Icon.Type style={{ width: "15px" }} />
                          </i>
                          <span>Type</span>
                        </Link>
                      </li>
                      <li
                        onClick={(e) => handleSubMenuClick(e, 2, "agegroup")}
                        className={`${
                          subMenuActive2 === "agegroup" ? "active" : ""
                        }`}
                      >
                        <Link to="/app/partner/agegroups">
                          <i className="icon-Commit m-0  ">
                            <Icon.Type style={{ width: "15px" }} />
                          </i>
                          <span>Age Groups</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_USERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "partnerUsers" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "partnerUsers",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/partner/users">
                      <Icon.Users />
                      <span>Users</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_CUSTOMERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "customers" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "customers",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/partner/customers">
                      <Icon.Users />
                      <span>Customers</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_TRANSFERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "transfers" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "transfers",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/partner/transfers">
                      <Icon.File />
                      <span>Transfers</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_ORDERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "orders" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "orders",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/partner/orders">
                      <Icon.File />
                      <span>Orders</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_SIGS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "sigs" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "sigs",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/partner/sigs">
                      <Icon.File />
                      <span>Sigs</span>
                    </Link>
                  </li>
                )}
                {/* <li
                  className={
                    isActive ? "treeview menu-open active" : "treeview"
                  }
                  onClick={(e) =>
                    handleClick(
                      e,
                      "orders",
                      "orders",
                      activeStates.orders,
                      (updatedState) =>
                        setActiveStates({
                          ...activeStates,
                          orders: updatedState,
                        }),
                      setActiveItem,
                      setActiveSubMenus
                    )
                  }
                >
                   {UserHasPermission(
                      userAllowedPermissions.permission,
                      "READ_ORDERS"
                    ) && (<Link to="/app/partner/orders">
                          <i className="icon-Commit m-0  ">
                            <Icon.File style={{ width: "15px" }} />
                          </i>
                          <span>Order</span>
                        </Link>
                    )}
                     {UserHasPermission(
                      userAllowedPermissions.permission,
                      "READ_SIGS"
                    ) && ( <Link to="/app/partner/order/sigs">
                        <i className="icon-Commit m-0  ">
                          <Icon.File style={{ width: "15px" }} />
                        </i>
                        <span>Sigs</span>
                      </Link>
                    )}
                    
                </li> */}
              </ul>
            ) : (
              <ul
                className="sidebar-menu"
                style={{ minHeight: "60vh" }}
                data-widget="tree"
              >
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_PARTNERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "partners" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "partners",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/admin/partners">
                      <Icon.Users />
                      <span>Partners</span>
                    </Link>
                  </li>
                )}
                <li
                  className={`sidebar-item ${
                    activeItem === "partnerUsers" ||
                    activeItem == "partner users"
                      ? "active"
                      : ""
                  }`}
                  onClick={(e) =>
                    handleClick(
                      e,
                      "partnerUsers",
                      null, // No submenu for this item
                      activeStates,
                      setActiveStates,
                      setActiveItem
                    )
                  }
                >
                  <Link to="/app/admin/partner/users">
                    <Icon.Users />
                    <span>Partner Users</span>
                  </Link>
                </li>
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_USERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "users" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "users",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/admin/users">
                      <Icon.Users />
                      <span>Users</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_PHARMACY"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "pharmacies" || activeItem === "pharmacy"
                        ? "active"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "pharmacies",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/admin/pharmacies">
                      <Icon.Users />
                      <span>Pharmacy</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_CUSTOMERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "customers" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "customers",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/admin/customers">
                      <Icon.Users />
                      <span>Customers</span>
                    </Link>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_TRANSFERS"
                ) && (
                  <li
                    className={`sidebar-item ${
                      activeItem === "transfers" ? "active" : ""
                    }`}
                    onClick={(e) =>
                      handleClick(
                        e,
                        "transfers",
                        null, // No submenu for this item
                        activeStates,
                        setActiveStates,
                        setActiveItem
                      )
                    }
                  >
                    <Link to="/app/admin/transfers">
                      <Icon.File />
                      <span>Transfers</span>
                    </Link>
                  </li>
                )}
                {(UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_ORDERS"
                ) ||
                  UserHasPermission(
                    userAllowedPermissions.permission,
                    "READ_SIGS"
                  )) && (
                  <li
                    className={
                      isActive ? "treeview menu-open active" : "treeview"
                    }
                    onClick={(e) =>
                      handleClick(
                        e,
                        "orders",
                        "orders",
                        activeStates.orders,
                        (updatedState) =>
                          setActiveStates({
                            ...activeStates,
                            orders: updatedState,
                          }),
                        setActiveItem,
                        setActiveSubMenus
                      )
                    }
                  >
                    <a href="#">
                      <Icon.File />
                      <span>Order</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-right pull-right"></i>
                      </span>
                    </a>
                    <ul
                      className="treeview-menu"
                      style={{ display: isActive ? "block" : "none" }}
                    >
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_ORDERS"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 1, "order")}
                          className={`${
                            subMenuActive === "order" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/orders">
                            <i className="icon-Commit m-0  ">
                              <Icon.File style={{ width: "15px" }} />
                            </i>
                            <span>Order</span>
                          </Link>
                        </li>
                      )}
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_SIGS"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 1, "sigs")}
                          className={`${
                            subMenuActive === "sigs" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/order/sigs">
                            <i className="icon-Commit m-0  ">
                              <Icon.File style={{ width: "15px" }} />
                            </i>
                            <span>Sigs</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
                {(UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_DRUGS"
                ) ||
                  UserHasPermission(
                    userAllowedPermissions.permission,
                    "READ_DRUG_CATEGORY"
                  ) ||
                  UserHasPermission(
                    userAllowedPermissions.permission,
                    "READ_DRUG_CLASS"
                  ) ||
                  UserHasPermission(
                    userAllowedPermissions.permission,
                    "READ_DRUG_FORM"
                  ) ||
                  UserHasPermission(
                    userAllowedPermissions.permission,
                    "READ_DRUG_TYPE"
                  ) ||
                  UserHasPermission(
                    userAllowedPermissions.permission,
                    "READ_AGE_GROUPS"
                  )) && (
                  <li
                    className={
                      isActive2 ? "treeview menu-open active" : "treeview"
                    }
                    onClick={(e) =>
                      handleClick(
                        e,
                        "drugs",
                        "drugs",
                        activeStates.drugs,
                        (updatedState) =>
                          setActiveStates({
                            ...activeStates,
                            drugs: updatedState,
                          }),
                        setActiveItem,
                        setActiveSubMenus
                      )
                    }
                  >
                    <a href="#">
                      <Icon.Droplet />
                      <span>Drug</span>
                      <span className="pull-right-container">
                        <i className="fa fa-angle-right pull-right"></i>
                      </span>
                    </a>
                    <ul
                      className="treeview-menu"
                      style={{ display: isActive2 ? "block" : "none" }}
                    >
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_DRUGS"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 2, "drugs")}
                          className={`${
                            subMenuActive2 === "drugs" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/drug/drugs">
                            <i className="icon-Commit m-0  ">
                              <Icon.File style={{ width: "15px" }} />
                            </i>
                            <span>Drugs</span>
                          </Link>
                        </li>
                      )}
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_DRUG_CATEGORY"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 2, "category")}
                          className={`${
                            subMenuActive2 === "category" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/drug/categories">
                            <i className="icon-Commit m-0  ">
                              <Icon.File style={{ width: "15px" }} />
                            </i>
                            <span>Category</span>
                          </Link>
                        </li>
                      )}
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_DRUG_CLASS"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 2, "class")}
                          className={`${
                            subMenuActive2 === "class" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/drug/classes">
                            <i className="icon-Commit m-0  ">
                              <Icon.File style={{ width: "15px" }} />
                            </i>
                            <span>Class</span>
                          </Link>
                        </li>
                      )}
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_DRUG_FORM"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 2, "form")}
                          className={`${
                            subMenuActive2 === "form" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/drug/forms">
                            <i className="icon-Commit m-0  ">
                              <Icon.File style={{ width: "15px" }} />
                            </i>
                            <span>Form</span>
                          </Link>
                        </li>
                      )}
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_DRUG_TYPE"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 2, "type")}
                          className={`${
                            subMenuActive2 === "type" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/drug/types">
                            <i className="icon-Commit m-0  ">
                              <Icon.Type style={{ width: "15px" }} />
                            </i>
                            <span>Type</span>
                          </Link>
                        </li>
                      )}
                      {UserHasPermission(
                        userAllowedPermissions.permission,
                        "READ_AGE_GROUPS"
                      ) && (
                        <li
                          onClick={(e) => handleSubMenuClick(e, 2, "agegroup")}
                          className={`${
                            subMenuActive2 === "agegroup" ? "active" : ""
                          }`}
                        >
                          <Link to="/app/admin/agegroups">
                            <i className="icon-Commit m-0  ">
                              <Icon.Type style={{ width: "15px" }} />
                            </i>
                            <span>Age Groups</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
                {UserHasPermission(
                  userAllowedPermissions.permission,
                  "READ_ACCESS_MANAGER"
                ) && (
                <li
                  id="treeview"
                  className={
                    isActive3 ? "treeview menu-open active" : "treeview"
                  }
                  onClick={(e) =>
                    handleClick(
                      e,
                      "accesstype",
                      "accesstype",
                      activeStates.accesstype,
                      (updatedState) =>
                        setActiveStates({
                          ...activeStates,
                          accesstype: updatedState,
                        }),
                      setActiveItem,
                      setActiveSubMenus
                    )
                  }
                >
                  <a href="javascript:void(0)">
                    <Icon.Sliders />
                    <span>Access Manager</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li
                      onClick={(e) => handleSubMenuClick(e, 3, "accesstype")}
                      className={`${
                        subMenuActive3 === "accesstype" ? "active" : ""
                      }`}
                    >
                      <Link to="/app/admin/access/types">
                        <i className="icon-Commit m-0  ">
                          <Icon.Key style={{ width: "15px" }} />
                        </i>
                        <span>Access Types</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                )}
              </ul>
            )}

            <div className="sidebar-widgets">
              <div className="mx-25 mb-30 pb-20 side-bx bg-primary-light rounded20">
                <div className="text-center">
                  <img src={AsideImage} className="sideimg p-5" alt="" />
                  {/* <h4 className="title-bx text-primary">
                    Make an Appointments
                  </h4>
                  <a href="#" className="py-10 fs-14 mb-0 text-primary">
                    Best Helth Care here <i className="mdi mdi-arrow-right"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Aside;
