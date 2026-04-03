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
        programs(sort: "publishedAt:desc") {
            data {
                attributes {
                    title
                    description
                    column
                }
            }
        }
    }
`

const Home = () => {
     
    const { loading, error, data } = useQuery(GET_DATA)

    if (loading) {
        return (
            <div className="home home--loading" aria-hidden="true">
                <section className="hero">
                    <div className="backdropblur">
                        <div className="container-wide">
                            <div className="hero-edge" />
                            <div className="container-medium flex">
                                <div className="hero-content">
                                    <div className="home-loading-hero-top">
                                        <div className="loading-skeleton home-loading-title" />
                                        <div className="home-loading-gatherings">
                                            <div className="home-loading-indent" />
                                            <div className="home-loading-timetable">
                                                <div className="loading-skeleton home-loading-line" />
                                                <div className="loading-skeleton home-loading-line" />
                                                <div className="loading-skeleton home-loading-line home-loading-line--short" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="loading-skeleton home-loading-hero-quote" />
                                </div>
                                <div className="corner1" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-medium">
                    <section className="programs">
                        <div className="program-column">
                            <div className="home-loading-program">
                                <div className="loading-skeleton home-loading-h2" />
                                <div className="loading-skeleton home-loading-line" />
                                <div className="loading-skeleton home-loading-line" />
                                <div className="loading-skeleton home-loading-line home-loading-line--medium" />
                            </div>
                            <div className="home-loading-program">
                                <div className="loading-skeleton home-loading-h2" />
                                <div className="loading-skeleton home-loading-line" />
                                <div className="loading-skeleton home-loading-line home-loading-line--short" />
                            </div>
                        </div>
                        <div className="programs-breaker" />
                        <div className="program-column">
                            <div className="home-loading-program">
                                <div className="loading-skeleton home-loading-h2" />
                                <div className="loading-skeleton home-loading-line" />
                                <div className="loading-skeleton home-loading-line" />
                                <div className="loading-skeleton home-loading-line" />
                                <div className="loading-skeleton home-loading-line home-loading-line--medium" />
                            </div>
                        </div>
                    </section>
                </div>

                <section className="waw-banner">
                    <div className="backdropblur">
                        <div className="container-wide">
                            <div className="waw-edge" />
                            <div className="container-medium flex">
                                <div className="waw-header">
                                    <div className="loading-skeleton home-loading-waw-title" />
                                </div>
                                <div className="corner2" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="main">
                    <div className="container-medium">
                        <section className="waw-section home-loading-purpose">
                            <div className="purpose-statement">
                                <div className="loading-skeleton home-loading-statement" />
                                <div className="loading-skeleton home-loading-statement home-loading-statement--short" />
                            </div>
                            <div className="loading-skeleton home-loading-waw-img" />
                        </section>

                        <section className="values-section home-loading-values">
                            <div className="values-statement">
                                <div className="loading-skeleton home-loading-values-heading" />
                                <div className="loading-skeleton home-loading-line home-loading-line--center" />
                                <div className="loading-skeleton home-loading-line home-loading-line--center home-loading-line--narrow" />
                            </div>
                            <div className="values-wrapper">
                                <div className="home-loading-values-grid">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="home-loading-value-card">
                                            <div className="loading-skeleton home-loading-value-num" />
                                            <div className="loading-skeleton home-loading-value-heading" />
                                            <div className="loading-skeleton home-loading-line" />
                                            <div className="loading-skeleton home-loading-line home-loading-line--short" />
                                        </div>
                                    ))}
                                </div>
                                <div className="value-icons">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="value-icon">
                                            <div className="loading-skeleton home-loading-value-icon" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="waw-section home-loading-vision">
                            <div className="loading-skeleton home-loading-waw-img" />
                            <div className="vision-statement">
                                <div className="loading-skeleton home-loading-statement" />
                                <div className="loading-skeleton home-loading-statement home-loading-statement--short" />
                            </div>
                        </section>

                        <section className="ellipsis home-loading-ellipsis">
                            <div className="loading-skeleton home-loading-ellipsis-mark" />
                        </section>

                        <section className="home-loading-network">
                            <div className="network-title">
                                <div className="loading-skeleton home-loading-network-h1" />
                                <div className="loading-skeleton home-loading-line home-loading-line--narrow" />
                            </div>
                            <div className="networks">
                                <div className="network">
                                    <div className="network-left">
                                        <div>
                                            <div className="loading-skeleton home-loading-network-name" />
                                            <div className="loading-skeleton home-loading-line" />
                                            <div className="loading-skeleton home-loading-line" />
                                            <div className="loading-skeleton home-loading-line home-loading-line--medium" />
                                        </div>
                                        <div>
                                            <div className="loading-skeleton home-loading-line home-loading-line--short" />
                                        </div>
                                    </div>
                                    <div className="network-right">
                                        <div className="loading-skeleton home-loading-map" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <section className="page-loading">
                <em className="loading-text">Error: {error.message}</em>
            </section>
        )
    }
  
    const networks = data.networks.data
    const programs = data.programs.data

    const column1Programs = programs.filter((program) => program.attributes.column === "COLUMN_1")
    const column2Programs = programs.filter((program) => program.attributes.column === "COLUMN_2")
    
    const renderRichText = (nodes) => {
        return nodes.map((node, index) => {
            switch (node.type) {
                case "paragraph":
                    return (
                        <p key={index}>
                            {renderRichText(node.children)}
                        </p>
                    );
                case "text":
                    if (node.text.includes("<Link") || node.text.includes("<a")) {
                        const html = node.text.replace(
                            /<Link to="(.*?)">(.*?)<\/Link>/g,
                            `<a href="$1">$2</a>`
                        );
                        return (
                            <span
                                key={index}
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        );
                    }
                    return node.text;
                default:
                    return null;
            }
        });
    };


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

            {/* PROGRAMS */}
            <div className="container-medium">
                <section className="programs">
                    <div className="program-column">
                        {column1Programs.map((program, index) => (
                            <div key={index} className="program">
                                <h2>{program.attributes.title}</h2>
                                <div className="paragraphgap">
                                    {renderRichText(program.attributes.description)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="programs-breaker"></div>
                    <div className="program-column">
                        {column2Programs.map((program, index) => (
                            <div key={index} className="program">
                                <h2>{program.attributes.title}</h2>
                                <div className="paragraphgap">
                                    {renderRichText(program.attributes.description)}
                                </div>
                            </div>
                        ))}
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
                                <h1 className="whoarewe">Who Are <span className="wemask">We?</span></h1>
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
                            width={544}
                            height={320}
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
                                    <img src={bible} loading="lazy" alt="" className="bibleicon" width={200} height={200} />
                                </div>
                                <div className="value-icon">
                                    <img src={participation} loading="lazy" alt="" className="participationicon" width={200} height={200} />
                                </div>
                                <div className="value-icon">
                                    <img src={freedom} loading="lazy" alt="" className="freedomicon" width={200} height={200} />
                                </div>
                                <div className="value-icon">
                                    <img src={prayer} loading="lazy" alt="" className="prayericon" width={200} height={200} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vision */}
                    <section className="waw-section">
                        <img
                            src={vision}
                            loading="lazy"
                            alt="young man in conversation eating watermelon"
                            className="waw-img vision-img"
                            width={544}
                            height={320}
                        />
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
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
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