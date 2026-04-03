import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import AudioPlayer from '../modules/AudioPlayer'
import SermonsHeader from '../modules/SermonsHeader'

const StrapiURL = process.env.REACT_APP_STRAPI_URL

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

/** Latest sermon date in a series — used to order “most recent series” first. */
const getSeriesLatestDate = (series) => {
    const sermons = series.attributes?.sermons?.data ?? []
    if (sermons.length === 0) return new Date(0)
    return new Date(
        Math.max(...sermons.map((s) => new Date(s.attributes.date).getTime()))
    )
}

const Sermons = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sermonsPerPage, setSermonsPerPage] = useState(20)
    const [selectedSpeaker, setSelectedSpeaker] = useState('All Speakers')

    const { loading: speakersLoading, error: speakersError, data: speakersData } = useQuery(SPEAKERS)
    const { loading: seriesLoading, error: seriesError, data: seriesData } = useQuery(SERIES)

    if (speakersError) {
        return (
            <>
                <SermonsHeader />
                <section className="page-loading">
                    <em className="loading-text">Error: {speakersError.message}</em>
                </section>
            </>
        )
    }
    if (seriesError) {
        return (
            <>
                <SermonsHeader />
                <section className="page-loading">
                    <em className="loading-text">Error: {seriesError.message}</em>
                </section>
            </>
        )
    }

    const speakersList = speakersData?.speakers?.data ?? []
    const seriesList = seriesData?.seriesp?.data ?? []
    const speakers = ['All Speakers', ...speakersList.map(speaker => speaker.attributes.name)]

    const allSermons = speakersLoading
        ? []
        : speakersList.flatMap(speaker =>
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
                    }
                },
            }))
        )

    const filteredSermons = selectedSpeaker === 'All Speakers'
        ? allSermons
        : allSermons.filter(sermon => sermon.attributes.speaker.data.attributes.name === selectedSpeaker)

    const sortedSermons = [...filteredSermons].sort((a, b) => {
        const dateA = new Date(a.attributes.date)
        const dateB = new Date(b.attributes.date)
        return dateB - dateA
    })

    const totalSermons = filteredSermons.length
    const totalPages = sermonsPerPage === 'All' ? 1 : Math.max(1, Math.ceil(totalSermons / sermonsPerPage))

    const currentSermons = speakersLoading
        ? []
        : sermonsPerPage === 'All'
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

    return (
        <>
            <SermonsHeader />
            <FeaturedSeries seriesData={seriesList} seriesLoading={seriesLoading} />
            <section className="container-medium">
                <p className='sermons-description'>
                    This is an audio archive of sermons preached at our Sunday gatherings. All sermons are available to stream or download for free.
                    Many of our sermons also come with a complementary study guide with thought provoking questions and footnotes for you or your
                    small group to follow along with. We trust God speaks as you listen.
                </p>
                <div className='filters-wrapper'>
                    <h2>All Sermons</h2>
                    <div className="filters">
                        <select
                            value={selectedSpeaker}
                            onChange={handleSpeakerChange}
                            disabled={speakersLoading}
                            aria-busy={speakersLoading}
                            aria-label="Filter by speaker"
                        >
                            {speakersLoading ? (
                                <option value="All Speakers">Loading speakers…</option>
                            ) : (
                                speakers.map(speaker => (
                                    <option key={speaker} value={speaker}>{speaker}</option>
                                ))
                            )}
                        </select>
                        <select
                            value={sermonsPerPage}
                            onChange={handleSermonsPerPageChange}
                            disabled={speakersLoading}
                            aria-label="Sermons per page"
                        >
                            {[10, 20, 50, 80, 'All'].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {speakersLoading ? (
                    <SermonsListSkeleton rows={sermonsPerPage === 'All' ? 20 : Math.min(sermonsPerPage, 20)} />
                ) : (
                    <AudioPlayer sermons={currentSermons} />
                )}
                {speakersLoading ? (
                    <div className="loading-skeleton sermons-loading-pagination" aria-hidden="true" />
                ) : (
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                )}
            </section>

            <section className="container-medium series-section">
                <h2>All Series</h2>
                <div className="series-list">
                    {seriesLoading ? (
                        <SeriesListSkeleton />
                    ) : (
                        [...seriesList]
                            .sort((a, b) => getSeriesLatestDate(b) - getSeriesLatestDate(a))
                            .map(series => (
                                <Link key={series.id} to={`/series/${series.id}`} className="series-item">
                                    {series.attributes.title}
                                </Link>
                            ))
                    )}
                </div>
            </section>
        </>
    )
}

const SermonsListSkeleton = ({ rows }) => (
    <div className="sermons sermons--skeleton" aria-hidden="true">
        {Array.from({ length: rows }).map((_, index) => (
            <div className="loading-skeleton sermons-loading-row" key={index} />
        ))}
    </div>
)

const SeriesListSkeleton = () => (
    <>
        {Array.from({ length: 12 }).map((_, index) => (
            <span className="series-item series-item--skeleton loading-skeleton" key={index} aria-hidden="true" />
        ))}
    </>
)

const FeaturedSeriesSkeletonCards = () => (
    <>
        {[0, 1, 2].map((i) => (
            <div className="featured-series-item featured-series-item--skeleton" key={i} aria-hidden="true">
                <div className="featured-series-skeleton-bg" />
                <div className="featured-series-date-wrapper">
                    <div className="loading-skeleton featured-series-skeleton-date" />
                </div>
                <div className="featured-series-title">
                    <div className="loading-skeleton featured-series-skeleton-title" />
                </div>
            </div>
        ))}
    </>
)

const useSeriesCount = () => {
    const getCount = () => (typeof window !== 'undefined' && window.innerWidth < 960) ? 1 : 3
    const [count, setCount] = useState(getCount)

    useEffect(() => {
        const handleResize = () => setCount(getCount())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return count
}

const FeaturedSeries = ({ seriesData, seriesLoading }) => {
    const seriesCount = useSeriesCount()

    if (seriesLoading) {
        return (
            <section className="container-medium">
                <em className="featured-series">FEATURED SERIES</em>
                <div className="featured-series-list">
                    <FeaturedSeriesSkeletonCards />
                </div>
            </section>
        )
    }

    if (!seriesData || !Array.isArray(seriesData)) {
        return null
    }

    const sortedSeries = seriesData
        .filter(series => series.attributes.sermons.data.length > 0)
        .sort((a, b) => getSeriesLatestDate(b) - getSeriesLatestDate(a))

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
