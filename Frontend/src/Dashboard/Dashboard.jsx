import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setLogoutSuccessMessage } from "../redux/authActions";
import * as Icon from "react-feather";

import CareModal from "./CareModal/CareModal";
import CommentModal from "./CommentModal/CommentModal";

import LogoLetter from "../assets/images/logo-letter.png";
import LogoDark from "../assets/images/logo-dark-text.png";
import LogoLight from "../assets/images/logo-light-text.png";
import Avatar1 from "../assets/images/avatar/avatar-1.png";
import Avatar2 from "../assets/images/avatar/2.jpg";
import Avatar3 from "../assets/images/avatar/3.jpg";
import Avatar4 from "../assets/images/avatar/4.jpg";
import Avatar5 from "../assets/images/avatar/1.jpg";
import CustomSvg17 from "../assets/images/svg-icon/color-svg/custom-17.svg";
import MedicalIcon1 from "../assets/images/svg-icon/medical/icon-1.svg";
import MedicalIcon2 from "../assets/images/svg-icon/medical/icon-2.svg";
import MedicalIcon3 from "../assets/images/svg-icon/medical/icon-3.svg";
import MedicalIcon4 from "../assets/images/svg-icon/medical/icon-4.svg";

const Dashboard = () => {
  React.useEffect(() => {
    document.querySelector("body").classList =
      "light-skin sidebar-mini theme-success fixed";
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const [isCommentOpen, setIsCommentOpen] = React.useState(false);

  const openCommentModal = () => {
    setIsCommentOpen(true);
  };

  const [isActive, setIsActive] = React.useState(false);

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const dispatch = useDispatch();

  // const logoutSuccessMessage = useSelector(
  //   (state) => state.auth.logoutSuccessMessage
  // );

  // React.useEffect(() => {
  //   if (logoutSuccessMessage) {
  //     const timeout = setTimeout(() => {
  //       dispatch(setLogoutSuccessMessage(null));
  //     }, 3000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [dispatch, logoutSuccessMessage]);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="wrapper">
      {/* {logoutSuccessMessage && <div>{logoutSuccessMessage}</div>} */}
      {/*Loadeer*/}
      {/*<div id="loader"></div>*/}
      {/*header*/}
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">
          <a href="index.html" className="logo">
            <div className="logo-mini w-50">
              <span className="light-logo">
                <img src={LogoLetter} alt="logo" />
              </span>
              <span className="dark-logo">
                <img src={LogoLetter} alt="logo" />
              </span>
            </div>
            <div className="logo-lg">
              <span className="light-logo">
                <img src={LogoDark} alt="logo" />
              </span>
              <span className="dark-logo">
                <img src={LogoLight} alt="logo" />
              </span>
            </div>
          </a>
        </div>

        <nav className="navbar navbar-static-top">
          <div className="app-menu">
            <ul className="header-megamenu nav">
              <li className="btn-group nav-item">
                <a
                  href="#"
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                >
                  <Icon.AlignLeft />
                </a>
              </li>
              <li className="btn-group d-lg-inline-flex d-none">
                <div className="app-menu">
                  <div className="search-bx mx-5">
                    <form>
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn"
                            type="submit"
                            id="button-addon3"
                          >
                            <Icon.Search />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">
              <li className="btn-group nav-item d-lg-inline-flex d-none">
                <a
                  href="#"
                  data-provide="fullscreen"
                  className="waves-effect waves-light nav-link full-screen btn-warning-light"
                  title="Full Screen"
                >
                  <Icon.Maximize />
                </a>
              </li>
              <li className="dropdown notifications-menu">
                <a
                  href="#"
                  className="waves-effect waves-light dropdown-toggle btn-info-light"
                  data-bs-toggle="dropdown"
                  title="Notifications"
                >
                  <Icon.Bell />
                </a>
                <ul className="dropdown-menu animated bounceIn">
                  <li className="header">
                    <div className="p-20">
                      <div className="flexbox">
                        <div>
                          <h4 className="mb-0 mt-0">Notifications</h4>
                        </div>
                        <div>
                          <a href="#" className="text-danger">
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <ul className="menu sm-scrol">
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-info"></i> Curabitur id
                          eros quis nunc suscipit blandit.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-warning text-warning"></i> Duis
                          malesuada justo eu sapien elementum, in semper diam
                          posuere.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-danger"></i> Donec at
                          nisi sit amet tortor commodo porttitor pretium a erat.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart text-success"></i>{" "}
                          In gravida mauris et nisi
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-danger"></i> Praesent eu
                          lacus in libero dictum fermentum.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-primary"></i> Nunc
                          fringilla lorem
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-success"></i> Nullam
                          euismod dolor ut quam interdum, at scelerisque ipsum
                          imperdiet.
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="#">View all</a>
                  </li>
                </ul>
              </li>

              <li className="btn-group nav-item">
                <a
                  href="#"
                  data-toggle="control-sidebar"
                  title="Setting"
                  className="waves-effect full-screen waves-light btn-danger-light"
                >
                  <Icon.Settings />
                </a>
              </li>

              <li className="dropdown user user-menu" onClick={handleClick}>
                <a
                  href="javascript:void(0)"
                  className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  data-bs-toggle="dropdown"
                  title="User"
                >
                  <div className="d-flex pt-5">
                    <div className="text-end me-10">
                      <p className="pt-5 fs-14 mb-0 fw-700 text-primary">
                        Johen Doe
                      </p>
                      <small className="fs-10 mb-0 text-uppercase text-mute">
                        Admin
                      </small>
                    </div>
                    <img
                      src={Avatar1}
                      className="avatar rounded-10 bg-primary-light h-40 w-40"
                      alt=""
                    />
                  </div>
                </a>
                <ul
                  className={
                    isActive
                      ? "dropdown-menu animated flipInX show"
                      : "dropdown-menu animated flipInX"
                  }
                >
                  <li className="user-body">
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="ti-user text-muted me-2"></i> Profile
                    </a>
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="ti-wallet text-muted me-2"></i> My Wallet
                    </a>
                    <a className="dropdown-item" href="javascript:void(0)">
                      <i className="ti-settings text-muted me-2"></i> Settings
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={handleLogout}
                    >
                      <i className="ti-lock text-muted me-2"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/*side_bar*/}
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          <div className="help-bt">
            <a href="tel:108" className="d-flex align-items-center">
              <div className="bg-danger rounded10 h-50 w-50 l-h-50 text-center me-15">
                <Icon.Mic />
              </div>
              <h4 className="mb-0">
                Emergency
                <br />
                help
              </h4>
            </a>
          </div>
          <div className="multinav">
            <div className="multinav-scroll" style={{ height: "100%" }}>
              <ul className="sidebar-menu" data-widget="tree">
                {/* <li className="treeview active">
                  <a href="#">
                    <Icon.Monitor />
                    <span>Dashboard</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <a href="index.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Dashboard 1
                      </a>
                    </li>
                    <li>
                      <a href="index2.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Dashboard 2
                      </a>
                    </li>
                    <li>
                      <a href="index3.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Dashboard 3
                      </a>
                    </li>
                    <li>
                      <a href="index4.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Dashboard 4
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="appointments.html">
                    <Icon.Calendar />
                    <span>Appointments</span>
                  </a>
                </li> */}
                <li className="treeview">
                  <Link to="/app/admin/partners">
                    <Icon.Users />
                    <span>Partners</span>
                    {/* <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span> */}
                  </Link>
                  {/* <ul className="treeview-menu">
                    <li>
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <Link to="/app/admin/partners">List</Link>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <Link to="/admin/partner/users">Users</Link>
                      </a>
                    </li>
                  </ul> */}
                </li>
                {/* <li className="treeview">
                  <a href="#">
                    <Icon.Activity />
                    <span>Doctors</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <a href="doctor_list.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Doctors
                      </a>
                    </li>
                    <li>
                      <a href="doctors.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Doctor Details
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="treeview">
                  <a href="#">
                    <Icon.Package />
                    <span>Features</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Card
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="box_cards.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            User Card
                          </a>
                        </li>
                        <li>
                          <a href="box_advanced.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Advanced Card
                          </a>
                        </li>
                        <li>
                          <a href="box_basic.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Basic Card
                          </a>
                        </li>
                        <li>
                          <a href="box_color.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Card Color
                          </a>
                        </li>
                        <li>
                          <a href="box_group.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Card Group
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        BS UI
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="ui_grid.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Grid System
                          </a>
                        </li>
                        <li>
                          <a href="ui_badges.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Badges
                          </a>
                        </li>
                        <li>
                          <a href="ui_border_utilities.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Border
                          </a>
                        </li>
                        <li>
                          <a href="ui_buttons.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Buttons
                          </a>
                        </li>
                        <li>
                          <a href="ui_color_utilities.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Color
                          </a>
                        </li>
                        <li>
                          <a href="ui_dropdown.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Dropdown
                          </a>
                        </li>
                        <li>
                          <a href="ui_dropdown_grid.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Dropdown Grid
                          </a>
                        </li>
                        <li>
                          <a href="ui_progress_bars.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Progress Bars
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Icons
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="icons_fontawesome.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Font Awesome
                          </a>
                        </li>
                        <li>
                          <a href="icons_glyphicons.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Glyphicons
                          </a>
                        </li>
                        <li>
                          <a href="icons_material.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Material Icons
                          </a>
                        </li>
                        <li>
                          <a href="icons_themify.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Themify Icons
                          </a>
                        </li>
                        <li>
                          <a href="icons_simpleline.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Simple Line Icons
                          </a>
                        </li>
                        <li>
                          <a href="icons_cryptocoins.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Cryptocoins Icons
                          </a>
                        </li>
                        <li>
                          <a href="icons_flag.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Flag Icons
                          </a>
                        </li>
                        <li>
                          <a href="icons_weather.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Weather Icons
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Custom UI
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="ui_ribbons.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Ribbons
                          </a>
                        </li>
                        <li>
                          <a href="ui_sliders.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Sliders
                          </a>
                        </li>
                        <li>
                          <a href="ui_typography.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Typography
                          </a>
                        </li>
                        <li>
                          <a href="ui_tab.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Tabs
                          </a>
                        </li>
                        <li>
                          <a href="ui_timeline.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Timeline
                          </a>
                        </li>
                        <li>
                          <a href="ui_timeline_horizontal.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Horizontal Timeline
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Components
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="component_bootstrap_switch.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Bootstrap Switch
                          </a>
                        </li>
                        <li>
                          <a href="component_date_paginator.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Date Paginator
                          </a>
                        </li>
                        <li>
                          <a href="component_media_advanced.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Advanced Medias
                          </a>
                        </li>
                        <li>
                          <a href="component_rangeslider.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Range Slider
                          </a>
                        </li>
                        <li>
                          <a href="component_rating.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Ratings
                          </a>
                        </li>
                        <li>
                          <a href="component_animations.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Animations
                          </a>
                        </li>
                        <li>
                          <a href="extension_fullscreen.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Fullscreen
                          </a>
                        </li>
                        <li>
                          <a href="extension_pace.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Pace
                          </a>
                        </li>
                        <li>
                          <a href="component_nestable.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Nestable
                          </a>
                        </li>
                        <li>
                          <a href="component_portlet_draggable.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Draggable Portlets
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="treeview">
                  <a href="#">
                    <Icon.Inbox />
                    <span>Forms, Tables & Charts</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Forms
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="forms_advanced.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Form Elements
                          </a>
                        </li>
                        <li>
                          <a href="forms_general.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Form Layout
                          </a>
                        </li>
                        <li>
                          <a href="forms_wizard.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Form Wizard
                          </a>
                        </li>
                        <li>
                          <a href="forms_validation.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Form Validation
                          </a>
                        </li>
                        <li>
                          <a href="forms_mask.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Formatter
                          </a>
                        </li>
                        <li>
                          <a href="forms_xeditable.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Xeditable Editor
                          </a>
                        </li>
                        <li>
                          <a href="forms_dropzone.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Dropzone
                          </a>
                        </li>
                        <li>
                          <a href="forms_code_editor.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Code Editor
                          </a>
                        </li>
                        <li>
                          <a href="forms_editors.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Editor
                          </a>
                        </li>
                        <li>
                          <a href="forms_editor_markdown.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Markdown
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Tables
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="tables_simple.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Simple tables
                          </a>
                        </li>
                        <li>
                          <a href="tables_data.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Data tables
                          </a>
                        </li>
                        <li>
                          <a href="tables_editable.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Editable Tables
                          </a>
                        </li>
                        <li>
                          <a href="tables_color.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Table Color
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Charts
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="charts_chartjs.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            ChartJS
                          </a>
                        </li>
                        <li>
                          <a href="charts_flot.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Flot
                          </a>
                        </li>
                        <li>
                          <a href="charts_inline.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Inline charts
                          </a>
                        </li>
                        <li>
                          <a href="charts_morris.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Morris
                          </a>
                        </li>
                        <li>
                          <a href="charts_peity.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Peity
                          </a>
                        </li>
                        <li>
                          <a href="charts_chartist.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Chartist
                          </a>
                        </li>
                        <li>
                          <a href="charts_c3_axis.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Axis Chart
                          </a>
                        </li>
                        <li>
                          <a href="charts_c3_bar.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Bar Chart
                          </a>
                        </li>
                        <li>
                          <a href="charts_c3_data.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Data Chart
                          </a>
                        </li>
                        <li>
                          <a href="charts_c3_line.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Line Chart
                          </a>
                        </li>
                        <li>
                          <a href="charts_echarts_basic.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Basic Charts
                          </a>
                        </li>
                        <li>
                          <a href="charts_echarts_bar.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Bar Chart
                          </a>
                        </li>
                        <li>
                          <a href="charts_echarts_pie_doughnut.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Pie & Doughnut Chart
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="treeview">
                  <a href="#">
                    <Icon.Grid />
                    <span>Apps & Widgets</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Apps
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="extra_calendar.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Calendar
                          </a>
                        </li>
                        <li>
                          <a href="contact_app.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Contact List
                          </a>
                        </li>
                        <li>
                          <a href="contact_app_chat.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Chat
                          </a>
                        </li>
                        <li>
                          <a href="extra_taskboard.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Todo
                          </a>
                        </li>
                        <li>
                          <a href="mailbox.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Mailbox
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Widgets
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li className="treeview">
                          <a href="#">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Custom
                            <span className="pull-right-container">
                              <i className="fa fa-angle-right pull-right"></i>
                            </span>
                          </a>
                          <ul className="treeview-menu">
                            <li>
                              <a href="widgets_blog.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Blog
                              </a>
                            </li>
                            <li>
                              <a href="widgets_chart.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Chart
                              </a>
                            </li>
                            <li>
                              <a href="widgets_list.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                List
                              </a>
                            </li>
                            <li>
                              <a href="widgets_social.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Social
                              </a>
                            </li>
                            <li>
                              <a href="widgets_statistic.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Statistic
                              </a>
                            </li>
                            <li>
                              <a href="widgets_weather.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Weather
                              </a>
                            </li>
                            <li>
                              <a href="widgets.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Widgets
                              </a>
                            </li>
                            <li>
                              <a href="email_index.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Emails
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="treeview">
                          <a href="#">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Maps
                            <span className="pull-right-container">
                              <i className="fa fa-angle-right pull-right"></i>
                            </span>
                          </a>
                          <ul className="treeview-menu">
                            <li>
                              <a href="map_google.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Google Map
                              </a>
                            </li>
                            <li>
                              <a href="map_vector.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Vector Map
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="treeview">
                          <a href="#">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Modals
                            <span className="pull-right-container">
                              <i className="fa fa-angle-right pull-right"></i>
                            </span>
                          </a>
                          <ul className="treeview-menu">
                            <li>
                              <a href="component_modals.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Modals
                              </a>
                            </li>
                            <li>
                              <a href="component_sweatalert.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Sweet Alert
                              </a>
                            </li>
                            <li>
                              <a href="component_notification.html">
                                <i className="icon-Commit">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                Toastr
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Ecommerce
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="ecommerce_products.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Products
                          </a>
                        </li>
                        <li>
                          <a href="ecommerce_cart.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Products Cart
                          </a>
                        </li>
                        <li>
                          <a href="ecommerce_products_edit.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Products Edit
                          </a>
                        </li>
                        <li>
                          <a href="ecommerce_details.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Product Details
                          </a>
                        </li>
                        <li>
                          <a href="ecommerce_orders.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Product Orders
                          </a>
                        </li>
                        <li>
                          <a href="ecommerce_checkout.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Products Checkout
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="#">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Sample Pages
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li>
                          <a href="invoice.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Invoice
                          </a>
                        </li>
                        <li>
                          <a href="invoicelist.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Invoice List
                          </a>
                        </li>
                        <li>
                          <a href="extra_app_ticket.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Support Ticket
                          </a>
                        </li>
                        <li>
                          <a href="extra_profile.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            User Profile
                          </a>
                        </li>
                        <li>
                          <a href="contact_userlist_grid.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Userlist Grid
                          </a>
                        </li>
                        <li>
                          <a href="contact_userlist.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Userlist
                          </a>
                        </li>
                        <li>
                          <a href="sample_faq.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            FAQs
                          </a>
                        </li>
                        <li>
                          <a href="sample_blank.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Blank
                          </a>
                        </li>
                        <li>
                          <a href="sample_coming_soon.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Coming Soon
                          </a>
                        </li>
                        <li>
                          <a href="sample_custom_scroll.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Custom Scrolls
                          </a>
                        </li>
                        <li>
                          <a href="sample_gallery.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Gallery
                          </a>
                        </li>
                        <li>
                          <a href="sample_lightbox.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Lightbox Popup
                          </a>
                        </li>
                        <li>
                          <a href="sample_pricing.html">
                            <i className="icon-Commit">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            Pricing
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="treeview">
                  <a href="#">
                    <Icon.Lock />
                    <span>Authentication</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <a href="auth_login.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Login
                      </a>
                    </li>
                    <li>
                      <a href="auth_register.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Register
                      </a>
                    </li>
                    <li>
                      <a href="auth_lockscreen.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Lockscreen
                      </a>
                    </li>
                    <li>
                      <a href="auth_user_pass.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Recover password
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="treeview">
                  <a href="#">
                    <Icon.AlertTriangle />
                    <span>Miscellaneous</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <a href="error_404.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Error 404
                      </a>
                    </li>
                    <li>
                      <a href="error_500.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Error 500
                      </a>
                    </li>
                    <li>
                      <a href="error_maintenance.html">
                        <i className="icon-Commit">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        Maintenance
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>

              {/* <div className="sidebar-widgets">
                <div className="mx-25 mb-30 pb-20 side-bx bg-primary-light rounded20">
                  <div className="text-center">
                    <img src={CustomSvg17} className="sideimg p-5" alt="" />
                    <h4 className="title-bx text-primary">
                      Make an Appointments
                    </h4>
                    <a href="#" className="py-10 fs-14 mb-0 text-primary">
                      Best Helth Care here{" "}
                      <i className="mdi mdi-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="copyright text-center m-25">
                  <p>
                    <strong className="d-block">Rhythm Admin Dashboard</strong>{" "}
                    © <script>document.write(new Date().getFullYear())</script>{" "}
                    All Rights Reserved
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </aside>
      {/*    content wrapper*/}
      <div className="content-wrapper">
        <div className="container-full">
          <section className="content">
            <div className="row">
              <div className="col-xl-12 col-12">
                <div className="row">
                  <div className="col-xl-3 col-md-6 col-6">
                    <div className="box">
                      <div className="box-body text-center">
                        <div className="bg-primary-light rounded10 p-20 mx-auto w-100 h-100">
                          <img src={MedicalIcon1} className="" alt="" />
                        </div>
                        <p className="text-fade mt-15 mb-5">Total Patients</p>
                        <h2 className="mt-0">1,548</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-6">
                    <div className="box">
                      <div className="box-body text-center">
                        <div className="bg-danger-light rounded10 p-20 mx-auto w-100 h-100">
                          <img src={MedicalIcon2} className="" alt="" />
                        </div>
                        <p className="text-fade mt-15 mb-5">Consulation</p>
                        <h2 className="mt-0">448</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-6">
                    <div className="box">
                      <div className="box-body text-center">
                        <div className="bg-warning-light rounded10 p-20 mx-auto w-100 h-100">
                          <img src={MedicalIcon3} className="" alt="" />
                        </div>
                        <p className="text-fade mt-15 mb-5">Staff</p>
                        <h2 className="mt-0">848</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 col-6">
                    <div className="box">
                      <div className="box-body text-center">
                        <div className="bg-info-light rounded10 p-20 mx-auto w-100 h-100">
                          <img src={MedicalIcon4} className="" alt="" />
                        </div>
                        <p className="text-fade mt-15 mb-5">Total Rooms</p>
                        <h2 className="mt-0">3,100</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="box-body">
                    <h4 className="box-title">Radiology List</h4>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th className="bb-2">No.</th>
                            <th className="bb-2">Test</th>
                            <th className="bb-2">Lab</th>
                            <th className="bb-2">Priority</th>
                            <th className="bb-2">Cost</th>
                            <th className="bb-2">Handling</th>
                            <th className="bb-2">Coll. By</th>
                            <th className="bb-2">Status</th>
                            <th className="bb-2">Result</th>
                            <th className="bb-2">Signed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-warning">Law</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                onClick={openCommentModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-danger">High</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                                onClick={openCommentModal}
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-warning">Law</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                                onClick={openCommentModal}
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-danger">High</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                                onClick={openCommentModal}
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-danger">High</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                                onClick={openCommentModal}
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-warning">Law</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                                onClick={openCommentModal}
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Blood Count</td>
                            <td>Microbiology</td>
                            <td>
                              <span className="badge badge-warning">Law</span>
                            </td>
                            <td>N500</td>
                            <td>Johen Doe</td>
                            <td>5.45pm 11/05</td>
                            <td>
                              <span className="badge badge-success">
                                Result Added
                              </span>
                            </td>
                            <td>
                              <a
                                onClick={openModal}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#result"
                                className="text-info"
                              >
                                Result{" "}
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#comment-dialog"
                                className="text-info"
                                onClick={openCommentModal}
                              >
                                Comment{" "}
                              </a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-toggle"
                                data-bs-toggle="button"
                                aria-pressed="false"
                                autoComplete="off"
                              >
                                <div className="handle"></div>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {isOpen && <CareModal setIsOpen={setIsOpen} />}
              {isCommentOpen && (
                <CommentModal setIsCommentOpen={setIsCommentOpen} />
              )}
            </div>
          </section>
        </div>
      </div>
      {/*    footer    */}
      <footer className="main-footer">
        <div className="pull-right d-none d-sm-inline-block">
          <ul className="nav nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
            <li className="nav-item">
              <a className="nav-link" href="#">
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Purchase Now
              </a>
            </li>
          </ul>
        </div>
        &copy;
        <script>document.write(new Date().getFullYear())</script>
        <a href="https://www.multipurposethemes.com/">Multipurpose Themes</a>.
        All Rights Reserved.
      </footer>
      {/*    control_sidebar*/}
      <aside className="control-sidebar">
        <div className="rpanel-title">
          <span
            className="pull-right btn btn-circle btn-danger"
            data-toggle="control-sidebar"
          >
            <i className="ion ion-close text-white"></i>
          </span>
        </div>
        <ul className="nav nav-tabs control-sidebar-tabs">
          <li className="nav-item">
            <a
              href="#control-sidebar-home-tab"
              data-bs-toggle="tab"
              className="active"
            >
              <i className="mdi mdi-message-text"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="#control-sidebar-settings-tab" data-bs-toggle="tab">
              <i className="mdi mdi-playlist-check"></i>
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="control-sidebar-home-tab">
            <div className="flexbox">
              <a href="javascript:void(0)" className="text-grey">
                <i className="ti-more"></i>
              </a>
              <p>Users</p>
              <a href="javascript:void(0)" className="text-end text-grey">
                <i className="ti-plus"></i>
              </a>
            </div>
            <div className="lookup lookup-sm lookup-right d-none d-lg-block">
              <input
                type="text"
                name="s"
                placeholder="Search"
                className="w-p100"
              />
            </div>
            <div className="media-list media-list-hover mt-20">
              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-success" href="#">
                  <img src={Avatar1} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Tyler</strong>
                    </a>
                  </p>
                  <p>Praesent tristique diam...</p>
                  <span>Just now</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-danger" href="#">
                  <img src={Avatar2} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Luke</strong>
                    </a>
                  </p>
                  <p>Cras tempor diam ...</p>
                  <span>33 min ago</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-warning" href="#">
                  <img src={Avatar3} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Evan</strong>
                    </a>
                  </p>
                  <p>In posuere tortor vel...</p>
                  <span>42 min ago</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-primary" href="#">
                  <img src={Avatar4} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Evan</strong>
                    </a>
                  </p>
                  <p>In posuere tortor vel...</p>
                  <span>42 min ago</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-success" href="#">
                  <img src={Avatar5} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Tyler</strong>
                    </a>
                  </p>
                  <p>Praesent tristique diam...</p>
                  <span>Just now</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-danger" href="#">
                  <img src={Avatar2} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Luke</strong>
                    </a>
                  </p>
                  <p>Cras tempor diam ...</p>
                  <span>33 min ago</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-warning" href="#">
                  <img src={Avatar3} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Evan</strong>
                    </a>
                  </p>
                  <p>In posuere tortor vel...</p>
                  <span>42 min ago</span>
                </div>
              </div>

              <div className="media py-10 px-0">
                <a className="avatar avatar-lg status-primary" href="#">
                  <img src={Avatar4} alt="..." />
                </a>
                <div className="media-body">
                  <p className="fs-16">
                    <a className="hover-primary" href="#">
                      <strong>Evan</strong>
                    </a>
                  </p>
                  <p>In posuere tortor vel...</p>
                  <span>42 min ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="control-sidebar-settings-tab">
            <div className="flexbox">
              <a href="javascript:void(0)" className="text-grey">
                <i className="ti-more"></i>
              </a>
              <p>Todo List</p>
              <a href="javascript:void(0)" className="text-end text-grey">
                <i className="ti-plus"></i>
              </a>
            </div>
            <ul className="todo-list mt-20">
              <li className="py-15 px-5 by-1">
                <input
                  type="checkbox"
                  id="basic_checkbox_1"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_1" className="mb-0 h-15"></label>
                <span className="text-line">Nulla vitae purus</span>
                <small className="badge bg-danger">
                  <i className="fa fa-clock-o"></i> 2 mins
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5">
                <input
                  type="checkbox"
                  id="basic_checkbox_2"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_2" className="mb-0 h-15"></label>
                <span className="text-line">Phasellus interdum</span>
                <small className="badge bg-info">
                  <i className="fa fa-clock-o"></i> 4 hours
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5 by-1">
                <input
                  type="checkbox"
                  id="basic_checkbox_3"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_3" className="mb-0 h-15"></label>
                <span className="text-line">Quisque sodales</span>
                <small className="badge bg-warning">
                  <i className="fa fa-clock-o"></i> 1 day
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5">
                <input
                  type="checkbox"
                  id="basic_checkbox_4"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_4" className="mb-0 h-15"></label>
                <span className="text-line">Proin nec mi porta</span>
                <small className="badge bg-success">
                  <i className="fa fa-clock-o"></i> 3 days
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5 by-1">
                <input
                  type="checkbox"
                  id="basic_checkbox_5"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_5" className="mb-0 h-15"></label>
                <span className="text-line">Maecenas scelerisque</span>
                <small className="badge bg-primary">
                  <i className="fa fa-clock-o"></i> 1 week
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5">
                <input
                  type="checkbox"
                  id="basic_checkbox_6"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_6" className="mb-0 h-15"></label>
                <span className="text-line">Vivamus nec orci</span>
                <small className="badge bg-info">
                  <i className="fa fa-clock-o"></i> 1 month
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5 by-1">
                <input
                  type="checkbox"
                  id="basic_checkbox_7"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_7" className="mb-0 h-15"></label>
                <span className="text-line">Nulla vitae purus</span>
                <small className="badge bg-danger">
                  <i className="fa fa-clock-o"></i> 2 mins
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5">
                <input
                  type="checkbox"
                  id="basic_checkbox_8"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_8" className="mb-0 h-15"></label>
                <span className="text-line">Phasellus interdum</span>
                <small className="badge bg-info">
                  <i className="fa fa-clock-o"></i> 4 hours
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5 by-1">
                <input
                  type="checkbox"
                  id="basic_checkbox_9"
                  className="filled-in"
                />
                <label htmlFor="basic_checkbox_9" className="mb-0 h-15"></label>
                <span className="text-line">Quisque sodales</span>
                <small className="badge bg-warning">
                  <i className="fa fa-clock-o"></i> 1 day
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
              <li className="py-15 px-5">
                <input
                  type="checkbox"
                  id="basic_checkbox_10"
                  className="filled-in"
                />
                <label
                  htmlFor="basic_checkbox_10"
                  className="mb-0 h-15"
                ></label>
                <span className="text-line">Proin nec mi porta</span>
                <small className="badge bg-success">
                  <i className="fa fa-clock-o"></i> 3 days
                </small>
                <div className="tools">
                  <i className="fa fa-edit"></i>
                  <i className="fa fa-trash-o"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div className="control-sidebar-bg"></div>
    </div>
  );
};

export default Dashboard;
