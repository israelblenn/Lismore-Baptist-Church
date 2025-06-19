import header from "../assets/header-partnerships.webp"
import { useQuery, gql } from '@apollo/client'

const StrapiURL = process.env.REACT_APP_STRAPI_URL

const GET_PARTNERSHIPS = gql`
    query {
        partnerships(sort: "publishedAt:desc") {
        data {
            id
            attributes {
                Title
                Description 
                Website    
                Image {    
                    data {
                        attributes {
                            url
                        }
                    }
                }
            }
        }
        }
    }
`

const Partnerships = () => {
    const { loading, error, data } = useQuery(GET_PARTNERSHIPS)

    if (loading) return <em className="loading-text">loading content...</em>
    if (error) {
        console.error('Full error details:', error);
        return <em className="loading-text">Error: {error.message}</em>;
    }

    const partnerships = data.partnerships.data
    
    console.log(partnerships);
    

    const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    
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
        <>
            <section className="header" style={{ backgroundImage: `url(${header})`, backgroundPosition: "50% 60%" }}>
                <div className="header-blur">
                    <div className="container-medium">
                        <h1 className="header-title">Partnerships</h1>
                    </div>
                </div>
            </section>

            <section className="partnerships-wrapper container-medium">
                {partnerships.map((partnership, index) => {
                    const partnershipAttributes = partnership.attributes || {}
                    const imageUrl = partnershipAttributes.Image?.data?.attributes?.url || ''

                    return (
                        <div className={`partner ${index % 2 === 1 ? 'reversed' : ''}`} key={index}>
                            <div className="partner-info">
                                <div>
                                    <h2>{partnershipAttributes.Title || 'Unnamed'}</h2>
                                    <p>{renderRichText(partnershipAttributes.Description || 'Unnamed')}</p>
                                </div>
                                <button className="visit-button" onClick={() => openLink(`${partnershipAttributes.Website}`)}>
                                    <p>Visit Website</p>
                                </button>
                            </div>
                            <img loading="lazy" className="partnership-image" src={`${StrapiURL}${imageUrl}`} alt={`Pastor ${partnershipAttributes.Title || 'Unknown'}`} />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default Partnerships