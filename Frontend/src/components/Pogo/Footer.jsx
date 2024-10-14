import footerLogo from "../../assets/images/8-1.webp";
import style from "./Index.module.css";

const Footer = () => {
  return (
    <div id="footer-section" style={{ borderTop: "3px solid #27AAE1" }}>
      <footer className={`${style.footer_section}`}>
        <div className="container-fluid">
          <div className="health_heaven_footer_logo">
            <img
              src={footerLogo}
              alt=""
              className={`${style.health_heaven_footer_logo_inner_image}`}
            />
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2 className={`${style.footer_title}`}>Company</h2>
              <ul className={`${style.footer_list}`}>
                <li>
                  <a
                    href="https://curvy-move-be8.notion.site/Privacy-Notice-f85fe944ab8945a0922a57e6fff8686b"
                    target="_blank"
                    className={`${style.about_list}`}
                    rel="noreferrer"
                  >
                    About Health Haven
                  </a>
                </li>
              </ul>
              <a
                href="https://curvy-move-be8.notion.site/privacy-Notice-f85fe944ab8945a0922a57e6fff8686b"
                target="_blank"
                className={`${style.footer_link}`}
                rel="noreferrer"
              >
                Privacy Notice
              </a>
            </div>

            <div className="col-md-4">
              <h2 className={`${style.footer_title}`}>Health Haven RX</h2>
              <h2 className={`${style.footer_subtitle}`}>Headquarters:</h2>
              <ul className={`${style.footer_list}`}>
                <li>
                  24 School Street, 2nd Floor Boston, <br /> MA 02108
                </li>
              </ul>
              <h2 className={`${style.footer_subtitle}`}>Pharmacy:</h2>
              <ul className={`${style.footer_list}`}>
                <li>
                  1 Chestnut Street Suite <br /> 200/3Y Nashua, NH 03060
                </li>
              </ul>
            </div>
            <div className="col-md-3 offset-md-1">
              <h2 className={`${style.footer_title}`}>Company</h2>
              <ul className={`${style.footer_list}`}>
                <li>
                  Email:{" "}
                  <a
                    className={`${style.footer_link}`}
                    href="mailto:info@healthhavenrx.com"
                  >
                    Info@healthhavenrx.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p className={`${style.copyright}`}>
                © 2024 Health Haven Rx INC.
              </p>
            </div>
            <div className="col-md-6 ">
              <p className={`${style.pl_text} float-end`}>PL000414 Rev A</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
