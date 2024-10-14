import style from "../Index.module.css";
import Logo from "../../../assets/images/POGO-Automatic-logo-lockup_Blue.png";
import hhlogo from "../../../assets/images/Home-Page-2-1-2.webp";
import bannerImg from "../../../assets/images/OP LP_TY page_Hand holding POGO monitor_image.png";
import Footer from "../Footer";

function PogoThankYou() {
  return (
    <section className={`${style.pogo_section}`}>
      <header>
        <nav className="navbar navbar-light py-0">
          <div className="container-fluid p-0">
            <div className={`${style.header_nav}`}>
              <div>
                <a className="navbar-brand" href="#">
                  <img src={Logo} alt="" className={`${style.pogo_logo}`} />
                </a>
              </div>
              <div>
                <a href="">
                  <img
                    src={hhlogo}
                    alt=""
                    className={`${style.health_heven_logo}`}
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className={`${style.wrapper}`}>
        <div id="section-1" style={{ height: "auto", paddingTop: "120px" }}>
          <div className="container-fluid p-0">
            <div className="row mt-5">
              <div className="col-md-6">
                <h1 className={`${style.banner_heading} mb-4`}>
                  Thank You For Your
                  <br />
                  Submission!
                </h1>

                <p className="mt-4 mb-4">
                  Be on the lookout, on behalf of your request, Health Haven
                  Pharmacy will <br /> contact your physician regarding your
                  prescription for POGO Automatic &reg;.
                </p>
                <p className="mt-4">
                  Within 3-5 business days we will get back to you about the
                  status of your <br /> request.
                </p>
              </div>
              <div className="col-md-6" style={{ marginTop: "6%" }}>
                <img
                  src={bannerImg}
                  width="280px"
                  className="float-end"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </section>
  );
}

export default PogoThankYou;
