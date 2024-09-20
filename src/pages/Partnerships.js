import header from "../assets/header-partnerships.webp"
import BAoNSWaACT from "../assets/BAoNSWaACT.webp"
import BMA from "../assets/BMA.webp"
import { Link } from 'react-router-dom'

const Partnerships = () => {
    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <section className="header" style={{ backgroundImage: `url(${header})`, backgroundPosition: "50% 60%" }}>
                <div className="header-blur">
                    <div className="container-medium">
                        <h1 className="header-title">Partnerships</h1>
                    </div>
                </div>
            </section>

            <section className="partnerships-wrapper container-medium">

                <div className="partner">
                    <div className="partner-info">
                        <div>
                            <h2>Baptist Association of NSW <br className="break" />and ACT</h2>
                            <p>
                                Lismore Baptist Church and its ministries are members of the Baptist Association of NSW and ACT,
                                which is made up of over 350 churches and ministries. We are supported by, yet also contribute to
                                this dynamic and diverse associations of churches across our state. For more information, visit{'\u00A0'}
                                <a href="https://nswactbaptists.org.au/" target="_blank" rel="noopener noreferrer">nswactbaptists.org.au</a>
                            </p>
                        </div>
                        <button className="visit-button" onClick={() => openLink('https://nswactbaptists.org.au/')}>
                            <p>Visit Website</p>
                        </button>
                    </div>
                    <img loading="lazy" src={BAoNSWaACT} alt="Church members laying hands on man" />
                </div>

                <div className="partner">
                    <img loading="lazy" src={BMA} className="BMA-Before" alt="Kalkarindji" />
                    <div className="partner-info">
                        <div>
                            <h2>Baptist Mission Australia</h2>
                            <p>
                                We are partners with Baptist Mission Australia through a short term mission project in Kalkarindji in
                                the Northern Territory. For more information, visit <a href="https://www.baptistmissionaustralia.org/" target="_blank" rel="noopener noreferrer">baptistmissionaustralia.org</a>
                                {'\u00A0'}or <Link to="/ContactUs">contact us</Link>.
                            </p>
                        </div>
                        <button className="visit-button" onClick={() => openLink('https://www.baptistmissionaustralia.org/')}>
                            <p>Visit Website</p>
                        </button>
                    </div>
                    <img loading="lazy" src={BMA} className="BMA-After" alt="Kalkarindji" />
                </div>

            </section>
        </>
    )
}

export default Partnerships
