import { Link } from "react-router-dom"
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';


import purpose from "../assets/purpose.webp"
import bible from "../assets/icon-bible.png"
import participation from "../assets/icon-participation.png"
import freedom from "../assets/icon-freedom.png"
import prayer from "../assets/icon-prayer.png"
import vision from "../assets/vision.webp"

const GET_DATA = gql`
    query {
        ctaTimeTable {
            data {
                attributes {
                    Content
                }
            }
        }
        networks {
            data{
                attributes{
                    name
                    description
                    cta
                    email
                    location
                    map
                    mapLocationMetadata
                }
            }
        }
    }
`

const Home = () => {
    
    const { loading, error, data } = useQuery(GET_DATA)

    if (loading) return <em className="loading-text">loading content...</em>
    if (error) return <em className="loading-text">Error: {error.message}</em>
  
    const networks = data.networks.data

    return (
        <div className="home">
            {/* HERO */}
            <section className="hero">
                <div className="backdropblur">
                    <div className="container-wide">
                        <div className="hero-edge"></div>
                        <div className="container-medium flex">
                            <div className="hero-content">
                                <h1 className="cta">What are you doing this Sunday?</h1>
                                <div className="gatherings">
                                    <div className="indentGuide"></div>
                                    <ReactMarkdown className="timetable">{data.ctaTimeTable.data.attributes.Content}</ReactMarkdown>
                                </div>
                                <h3><i className="hero-vision">“A diverse network of worshipping communities passionate about sharing Jesus”</i></h3>
                            </div>
                            <div className="corner1"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* KID'S CHURCH / GROWTH GROUPS */}
            <div className="container-medium">
                <section className="programs">
                    <div className="program growthGroups">
                        <h2>Growth Groups</h2>
                        <p className="paragraphgap">
                            While Sundays are a big part of our life together at Lismore Baptist Church, it’s
                            our Growth Groups that are at the heart of taking things deeper. In our Growth
                            Groups we often study the same passage that is preached the Sunday. This
                            gives everyone an opportunity to engage and ask questions in an informal
                            setting.
                            <br /><br />
                            Growth Groups also provide a great opportunity to get to know each other
                            better, pray for each other, and build lasting spiritual friendships. Growth
                            Groups meet weekly, on different days and nights of the week, some at the
                            church building & others in homes. There are groups for younger people, other
                            groups for older folk. Some groups eat dinner together and go late, others aim
                            to finish early. With numerous groups, there’s an option to suit everyone.
                            <br /><br />
                            If you would like more information about Growth Groups please <Link to="/ContactUs">Contact Us</Link>
                        </p>
                    </div>
                    <div className="programs-breaker"></div>
                    <div className="program">
                        <h2>Kid&rsquo;s Church</h2>
                        <p className="paragraphgap">
                            Our kids are encouraged to join in the first bracket of worship songs of the
                            gathering and will then be invited to head out to the hall with the Kids Church
                            leaders. The program will then run until the end of the gathering when parents
                            and carers sign the kids out and everyone can enjoy morning tea together. This
                            fun and exciting program runs during school term and is facilitated by a team of
                            wonderful trained leaders.
                            <br /><br />
                            If you would like more information about Kids Church please <Link to="/ContactUs">Contact Us</Link>
                        </p>
                    </div>
                    <div className="program alpha">
                        <h2>Alpha</h2>
                        <p className="paragraphgap">
                            Alpha is a series of interactive sessions that create a safe and honest space, where
                            people can explore life, faith and meaning. We run these sessions twice a year. If
                            you would like more information about Alpha please <Link to="/ContactUs">Contact Us</Link> or visit <a href="https://www.alpha.org.au/">alpha.org.au</a>
                        </p>
                    </div>
                </section>
            </div>

            {/* WHO ARE WE */}
            <section className="waw-banner">
                <div className="backdropblur">
                    <div className="container-wide">
                        <div className="waw-edge"></div>
                        <div className="container-medium flex">
                            <div className="waw-header">
                                <h1 className="whoarewe">Who Are <h1 className="wemask">We?</h1></h1>
                            </div>
                            <div className="corner2"></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="main">
                <div className="container-medium">

                    {/* Purpose */}
                    <section className="waw-section">
                        <div className="purpose-statement">
                            <h1 className="statement"><mark><i>Our purpose?</i>&nbsp;  To follow Jesus, love others, and make disciples.</mark></h1>
                        </div>
                        <img
                            src={purpose}
                            loading="lazy"
                            alt="churchgoers in conversation"
                            className="waw-img"
                        />
                    </section>

                    {/* Values */}
                    <section className="values-section">
                        <div className="values-statement">
                            <h1 className="statement"><i>Our values?</i></h1>
                            <p className="values-blurb">
                                We celebrate the <strong>4 core values</strong> below that are especially important to us and that we think really captures who we are as a church:
                            </p>
                        </div>
                        <div className="values-wrapper">
                            <div className="values">
                                <div className="value">
                                    <h1 className="value-number _1-rotation">1</h1>
                                    <h1 className="value-heading">Bible</h1>
                                    <p className="value-p">Letting God shape us individually and together through his word.</p>
                                </div>
                                <div className="value">
                                    <h1 className="value-number _2-rotation">2</h1>
                                    <h1 className="value-heading">Participation</h1>
                                    <p className="value-p">Where everyone is valued and everyone has a part to play.</p>
                                </div>
                                <div className="value">
                                    <h1 className="value-number _3-rotation">3</h1>
                                    <h1 className="value-heading">Freedom</h1>
                                    <p className="value-p freedom">Freedom under Christ to take risks and try new things.</p>
                                </div>
                                <div className="value">
                                    <h1 className="value-number _4-rotation">4</h1>
                                    <h1 className="value-heading">Prayer</h1>
                                    <p className="value-p">In everything we do, we know it all depends on God.</p>
                                </div>
                            </div>
                            <div className="value-icons">
                                <div className="value-icon">
                                    <img src={bible} loading="lazy" alt="" className="bibleicon" />
                                </div>
                                <div className="value-icon">
                                    <img src={participation} loading="lazy" alt="" className="participationicon" />
                                </div>
                                <div className="value-icon">
                                    <img src={freedom} loading="lazy" alt="" className="freedomicon" />
                                </div>
                                <div className="value-icon">
                                    <img src={prayer} loading="lazy" alt="" className="prayericon" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vision */}
                    <section className="waw-section">
                        <img src={vision} loading="lazy" alt="young man in conversation eating watermelon" className="waw-img vision-img" />
                        <div className="vision-statement">
                            <h1 className="statement"><mark><i>Our Vision? </i>A diverse network of worshipping communities passionate about sharing Jesus.</mark></h1>
                        </div>
                    </section>

                    <section className="ellipsis">
                        <h1>...</h1>
                    </section>

                    {/* NETWORK */}
                    <section>
                        <div className="network-title">
                            <h1>Our Network</h1>
                            <p className="network-blurb">Lismore Baptist is dedicated to fostering and supporting a network of growing ministries in the northern rivers region.</p>
                        </div>
                        <div className="networks">
                            {networks.map((network, index) => {
                                return (
                                <div key={index} className="network">
                                    <div className="network-left">
                                        <div>
                                            <h1 className="network-name">{network.attributes.name}</h1>
                                            <p className="paragraphnetwork">
                                                {network.attributes.description}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="network-cta">{network.attributes.cta}</p>
                                            <a href={`mailto:${network.attributes.email}`} className="network-email">{network.attributes.email}</a>
                                        </div>
                                    </div>
                                    <div className="network-right">
                                        <iframe
                                            className="map"
                                            src={network.attributes.map}
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade"
                                            title={network.attributes.mapLocationMetadata}
                                        />
                                        <p><i>{network.attributes.location}</i></p>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )

}

export default Home