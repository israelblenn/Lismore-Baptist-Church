import download from "../assets/icon-download.svg"
import facebook from "../assets/icon-facebook.svg"
import scp from "../assets/20201115 - Safe Church Package V.1 (002)[63342].pdf"
import { NavLink } from 'react-router-dom'

const StrapiURL = process.env.REACT_APP_STRAPI_URL


const Footer = () => {

    const handleLoginClick = () => {
        window.location.href = StrapiURL + '/admin'
    }

    return (
        <section className="footer">
            <div className="footer-blur">
                <div className="container-medium">
                    <div className="footer-box">
                        <div className="leftcolumn-1">
                            <div className="footerlinks">
                                <NavLink id="home" to="/" className="footerlink">Home</NavLink>
                                <NavLink id="our-team" to="OurTeam" className="footerlink">Our Team</NavLink>
                                <NavLink id="sermons" to="Sermons" className="footerlink">Sermons</NavLink>
                                <NavLink id="partnerships" to="Partnerships" className="footerlink">Partnerships</NavLink>
                                <NavLink id="contact-us" to="ContactUs" className="footerlink">Contact Us</NavLink>
                            </div>
                            <div className="leftcolumn-2">
                                <div className="footerlinks">
                                    <div>
                                        <a href={scp} className="footerlink">
                                            Safe Churches Policy
                                            <img src={download} loading="lazy" alt="" className="downloadicon" />
                                        </a>
                                    </div>
                                    <em onClick={handleLoginClick} id="admin" className="footerlink">Admin</em>
                                </div>
                                <div className="facebook-link">
                                    <img src={facebook} loading="lazy" alt="" className="fbicon" />
                                    <a href="https://www.facebook.com/p/Lismore-Baptist-Church-100064686819248/" className="sociallink">Follow Lismore Baptist</a>
                                </div>
                            </div>
                        </div>
                        <div className="rightcolumn">
                            <div className="column-1">
                                <div>
                                    <p className="footer-p"><strong>Sunday 9:30am</strong> @<br />96 Uralba St, Lismore<br />NSW 2480</p>
                                </div>
                                <div className="contacts">
                                    <p className="footer-p">(02) 6622 4711</p>
                                    <a href="mailto:office@lismorebaptist.org.au" className="sociallink">office@lismorebaptist.org.au</a>
                                </div>
                            </div>
                            <a href={scp} className="footerlink mobile-sfp">
                                Safe Churches Policy
                                <img src={download} loading="lazy" alt="" className="downloadicon" />
                            </a>
                            <div className="column-2">
                                <h1>Following Jesus, loving others, and making disciples.</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-background"></div>
                <p className="copyright">Copyright &copy; 2023 Lismore Baptist Church <br /> Website by <a href="https://israelblennerhassett.com">Israel Blennerhassett</a></p>
            </div>
        </section>
    )
}

export default Footer