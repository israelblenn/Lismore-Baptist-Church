import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import AudioPlayer from '../modules/AudioPlayer'
import SermonsHeader from '../modules/SermonsHeader'

const StrapiURL = process.env.REACT_APP_STRAPI_URL

const SERMONS = gql`
    query GetSermons($limit: Int, $start: Int) {
        sermons(pagination: { limit: $limit, start: $start }) {
            data {
                id
                attributes {
                    title
                    speaker {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                    scripture
                    date
                    series {
                        data {
                            id
                            attributes {
                                title
                            }
                        }
                    }
                    recording
                    guide {
                        data {
                            attributes {
                                name
                                url
                            }
                        }
                    }
                }
            }
            meta {
                pagination {
                    total
                }
            }
        }
    }
`


const SPEAKERS = gql`
    query GetSpeakers {
        speakers {
            data {
                id
                attributes {
                    name
                    sermons {
                        data {
                            id
                            attributes {
                                title
                                speaker {
                                    data {
                                        id
                                        attributes {
                                            name
                                        }
                                    }
                                }
                                scripture
                                date
                                series {
                                    data {
                                        id
                                        attributes {
                                            title
                                        }
                                    }
                                }
                                recording
                                guide {
                                    data {
                                        attributes {
                                            name
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const SERIES = gql`
    query GetSeries {
        seriesp {
            data {
                id
                attributes {
                    title
                    description
                    cover {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    sermons {
                        data {
                            id
                            attributes {
                                title
                                speaker {
                                    data {
                                        attributes {
                                            name
                                        }
                                    }
                                }
                                date
                            }
                        }
                    }
                }
            }
        }
    }
`

const Sermons = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sermonsPerPage, setSermonsPerPage] = useState(20)
    const [selectedSpeaker, setSelectedSpeaker] = useState('All Speakers')

    const { loading: sermonsLoading, error: sermonsError, refetch: refetchSermons } = useQuery(SERMONS, {
        variables: {
            limit: sermonsPerPage === 'All' ? 1000 : sermonsPerPage,
            start: (currentPage - 1) * (sermonsPerPage === 'All' ? 1000 : sermonsPerPage),
        },
        notifyOnNetworkStatusChange: true,
    })

    console.log('GraphQL Response:', sermonsLoading)


    const { loading: speakersLoading, error: speakersError, data: speakersData } = useQuery(SPEAKERS)
    const { loading: seriesLoading, error: seriesError, data: seriesData } = useQuery(SERIES)

    useEffect(() => {
        refetchSermons()
    }, [currentPage, sermonsPerPage, selectedSpeaker, refetchSermons])

    if (sermonsLoading || speakersLoading || seriesLoading) return <em className="loading-text">loading content...</em>
    if (sermonsError) return <em className="loading-text">Error: {sermonsError.message}</em>
    if (speakersError) return <em className="loading-text">Error: {speakersError.message}</em>
    if (seriesError) return <em className="loading-text">Error: {seriesError.message}</em>

    // Get unique speakers from speakersData
    const speakers = ['All Speakers', ...speakersData.speakers.data.map(speaker => speaker.attributes.name)]

    // Get all sermons
    const allSermons = speakersData.speakers.data.flatMap(speaker =>
        speaker.attributes.sermons.data.map(sermon => ({
            ...sermon,
            attributes: {
                ...sermon.attributes,
                speaker: {
                    data: {
                        attributes: {
                            name: speaker.attributes.name
                        }
                    }
                },
            }
        }))
    )

    
    

    // Filter sermons by selected speaker
    const filteredSermons = selectedSpeaker === 'All Speakers'
        ? allSermons
        : allSermons.filter(sermon => sermon.attributes.speaker.data.attributes.name === selectedSpeaker)

    // Sort the sermons by date in descending order
    const sortedSermons = [...filteredSermons].sort((a, b) => {
        const dateA = new Date(a.attributes.date)
        const dateB = new Date(b.attributes.date)
        return dateB - dateA
    })

    // Calculate the total number of pages
    const totalSermons = filteredSermons.length
    const totalPages = sermonsPerPage === 'All' ? 1 : Math.ceil(totalSermons / sermonsPerPage)

    // Get the sermons for the current page
    const currentSermons = sermonsPerPage === 'All'
        ? sortedSermons
        : sortedSermons.slice((currentPage - 1) * sermonsPerPage, currentPage * sermonsPerPage)

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // Function to handle sermons per page change
    const handleSermonsPerPageChange = (event) => {
        setSermonsPerPage(event.target.value === 'All' ? 'All' : Number(event.target.value))
        setCurrentPage(1) // Reset to the first page
    }

    // Function to handle speaker change
    const handleSpeakerChange = (event) => {
        setSelectedSpeaker(event.target.value)
        setCurrentPage(1) // Reset to the first page
    }

    console.log(currentSermons);
    

    return (
        <>
            <SermonsHeader />
            <FeaturedSeries seriesData={seriesData.seriesp.data} />
            <section className="container-medium">
                <p className='sermons-description'>
                    This is an audio archive of sermons preached at our Sunday gatherings. All sermons are available to stream or download for free.
                    Many of our sermons also come with a complementary study guide with thought provoking questions and footnotes for you or your
                    small group to follow along with. We trust God speaks as you listen.
                </p>
                <div className='filters-wrapper'>
                    <h2>All Sermons</h2>
                    <div className="filters">
                        <select value={selectedSpeaker} onChange={handleSpeakerChange}>
                            {speakers.map(speaker => (
                                <option key={speaker} value={speaker}>{speaker}</option>
                            ))}
                        </select>
                        <select value={sermonsPerPage} onChange={handleSermonsPerPageChange}>
                            {[10, 20, 50, 80, 'All'].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <AudioPlayer sermons={currentSermons} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </section>

            <section className="container-medium series-section">
                <h2>All Series</h2>
                <div className="series-list">
                    {seriesData.seriesp.data.map(series => (
                        <a key={series.id} href={`/series/${series.id}`} className="series-item">
                            {series.attributes.title}
                        </a>
                    ))}
                </div>
            </section>
        </>
    )
}

const FeaturedSeries = ({ seriesData }) => {

    let seriesCount = 3

    if (window.innerWidth < 960) {
        seriesCount = 1
    }

    if (!seriesData || !Array.isArray(seriesData)) {
        return null
    }

    const sortedSeries = seriesData
        .filter(series => series.attributes.sermons.data.length > 0)
        .sort((a, b) => {
            const dateA = new Date(a.attributes.sermons.data[0].attributes.date)
            const dateB = new Date(b.attributes.sermons.data[0].attributes.date)
            return dateB - dateA
        })

    const featuredSeries = sortedSeries.slice(0, seriesCount)

    return (
        <section className="container-medium">
            <em className='featured-series'>FEATURED SERIES</em>
            <div className="featured-series-list">
                {featuredSeries.map(series => {
                    const coverUrl = series.attributes.cover?.data?.attributes?.url; // Null-safe chaining
                    const latestSermon = [...(series.attributes.sermons?.data || [])]
                        .sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date))[0];
                    
                    if (!latestSermon) return null; // Skip if no sermons
    
                    const latestSermonDate = new Date(latestSermon.attributes.date);
                    const isNew = (new Date() - latestSermonDate) / (1000 * 60 * 60 * 24) <= 7;
    
                    return (
                        <Link to={`/series/${series.id}`} key={series.id} className="featured-series-item">
                            <div
                                className='background-filter'
                                style={{
                                    backgroundImage: coverUrl ? `url(${StrapiURL}${coverUrl})` : undefined
                                }}
                            />
                            <div className='featured-series-date-wrapper'>
                                <div className="featured-series-date">{latestSermonDate.toLocaleDateString('en-GB')}</div>
                                {isNew && <div className="new-tag">NEW</div>}
                            </div>
                            <div className="featured-series-title">
                                <h3><strong>{series.attributes.title}</strong></h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const maxPagesToShow = 10
    let startPage, endPage

    if (totalPages <= maxPagesToShow) {
        startPage = 1
        endPage = totalPages
    } else {
        if (currentPage <= Math.floor(maxPagesToShow / 2)) {
            startPage = 1
            endPage = maxPagesToShow
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - (maxPagesToShow - 1)
            endPage = totalPages
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2)
            endPage = currentPage + Math.floor(maxPagesToShow / 2)
        }
    }

    const pageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination">
            <div className='pagination-navigation'>
                <button className="nav-skip" onClick={() => onPageChange(1)}>
                    <em>First</em>
                </button>
                <button className="nav-adjacent" onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
                    <em>Prev</em>
                </button>
                <div className='page-numbers'>
                    {pageNumbers.map(number => (
                        <button key={number} className={`page-number ${number === currentPage ? 'active' : ''}`} onClick={() => onPageChange(number)}>
                            <em>{number}</em>
                        </button>
                    ))}
                </div>
                <button className="nav-adjacent" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
                    <em>Next</em>
                </button>
                <button className="nav-skip" onClick={() => onPageChange(totalPages)}>
                    <em>Last</em>
                </button>
            </div>
            <span className='page-count'>Page {currentPage} of {totalPages}</span>
        </div>
    )
}

export default Sermons
