import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authActions";
import hhLogo from "../../assets/images/hh-logo.png";
import hhsLogo from "../../assets/images/hhs-logo.png";
// import LogoLetter from "../../assets/images/logo-letter.png";
// import LogoDark from "../../assets/images/logo-dark-text.png";
// import LogoLight from "../../assets/images/logo-light-text.png";
import Avatar1 from "../../assets/images/avatar/avatar-1.png";

function Header({ Icon,sideBarRefresh, setSideBarRefresh }) {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [isActive, setIsActive] = React.useState(false);
  const [isIconClicked, setIsIconClicked] = React.useState(false);
  const user = useSelector((state) => state.user?.user);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const toggleDivs = () => {
    setIsIconClicked(!isIconClicked);
  };

  const handleLogout = () => {
    if (user.roles.includes("SUPER-ADMIN")) {
      navigate.push("/nextgen/admin/login");
    } else {
      navigate.push("/");
    }
    dispatch(logout());
  };
  let homeUrl = "/";
  if (user && user.roles && user.roles.includes("SUPER-ADMIN")) {
    homeUrl = "/admin";
  }
  return (
    <header className="main-header">
      <div className="d-flex align-items-center logo-box justify-content-start">
        <div className="logo" onClick={()=>{setSideBarRefresh(true)}} style={{cursor:'pointer'}}>
        {isIconClicked ? (
          <div className="logo-sm wts-50">
          <span className="light-logo-sm">
          <img src={hhsLogo} alt="logo" />
          </span>
        </div>
        
      ) : (
        <div className="logo-lg wt-50">
          <span className="light-logo">
            <img src={hhLogo} alt="logo" />
          </span>
        </div>
      )}
          {/* <div className="logo-lg wt-50">
            <span className="light-logo">
            <img src={hhLogo} alt="logo" />
            </span>
          </div>
          <img src={hhsLogo} alt="logo" width={70} height={70}/> */}
        </div>
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
                onClick={toggleDivs}
              >
                <Icon.AlignLeft />
              </a>
            </li>
            {/* <li className="btn-group d-lg-inline-flex d-none">
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
            </li> */}
          </ul>
        </div>

        <div className="navbar-custom-menu r-side">
          <ul className="nav navbar-nav">
            {/* <li className="btn-group nav-item d-lg-inline-flex d-none">
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
                        <i className="fa fa-shopping-cart text-success"></i> In
                        gravida mauris et nisi
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
            </li> */}

            <li className="dropdown user user-menu" onClick={handleClick}>
              <a
                href="#"
                className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                data-bs-toggle="dropdown"
                title="User"
              >
                <div className="d-flex pt-5">
                  <div className="text-end me-10">
                    <p className="pt-5 fs-14 mb-0 fw-700 text-primary">
                      {user?.email}
                    </p>
                    <small className="fs-10 mb-0 text-uppercase text-mute">
                      {user?.roles[0]}
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
                  {/* <a className="dropdown-item" href="#">
                    <i className="ti-user text-muted me-2"></i> Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti-wallet text-muted me-2"></i> My Wallet
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti-settings text-muted me-2"></i> Settings
                  </a> */}
                  {/* <div className="dropdown-divider"></div> */}
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    <i className="ti-lock text-muted me-2"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
