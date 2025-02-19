    import playIcon from '../assets/play.svg'
    import pauseIcon from '../assets/pause.svg'
    import { useEffect, useRef, useState, useMemo, useCallback } from "react"
    import { Link } from "react-router-dom"

    const StrapiURL = process.env.REACT_APP_STRAPI_URL

    const TIMEOUT_ERROR = "ERROR: Audio took too long to buffer, please check your internet connection. Contact Lismore Baptist if issue persists."

    const Modal = ({ show, onClose, guides }) => {
        if (!show) return null

        return (
            <div className="modal-overlay">
                <div className="overlay" onClick={onClose}></div>
                <div className="modal">
                    <h2>Files</h2>
                    <ul>
                        {guides.map((guide, index) => (
                            <li key={index}>
                                <a href={`${StrapiURL}${guide.attributes.url}`} target="_blank" rel="noopener noreferrer">
                                    {guide.attributes.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        )
    }

    const Player = ({ sermon, isExpanded, onExpand, isPlaying, onTogglePlay }) => {
        const [icon, setIcon] = useState(playIcon)
        const [progress, setProgress] = useState(0)
        const [currentTime, setCurrentTime] = useState(0)
        const [buffer, setBuffer] = useState(0)
        const [bufferingVisibility, setBufferingVisibility] = useState("hidden")
        const [playPending, setPlayPending] = useState(false)
        const [isNew, setIsNew] = useState(false)
        const [showModal, setShowModal] = useState(false)
        const audioElem = useRef()

        const sermonDate = useMemo(() => new Date(sermon.attributes.date), [sermon.attributes.date])
        const formattedDate = sermonDate.toLocaleDateString('en-GB')

        useEffect(() => {
            const diffTime = new Date() - sermonDate
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
            setIsNew(diffDays <= 7)
        }, [sermonDate])

        const onTimeUpdate = useCallback(() => {
            const duration = audioElem.current.duration
            const ct = audioElem.current.currentTime

            if (isPlaying && playPending) {
                audioElem.current.play()
                setPlayPending(false)
            }

            if (!isPlaying) {
                audioElem.current.pause()
            }

            const bufferedAmount = audioElem.current.buffered.length > 0
                ? Math.floor(audioElem.current.buffered.end(audioElem.current.buffered.length - 1))
                : 0

            setProgress((ct / duration) * 100)
            setCurrentTime(ct)
            setBuffer((bufferedAmount / duration) * 100)
        }, [isPlaying, playPending])

        const onEnded = useCallback(() => {
            onTogglePlay(null)
        }, [onTogglePlay])

        useEffect(() => {
            const audioElement = audioElem.current
            audioElement.addEventListener("timeupdate", onTimeUpdate)
            audioElement.addEventListener("waiting", onWaiting)
            audioElement.addEventListener("ended", onEnded)

            return () => {
                audioElement.removeEventListener("timeupdate", onTimeUpdate)
                audioElement.removeEventListener("waiting", onWaiting)
                audioElement.removeEventListener("ended", onEnded)
            }
        }, [onEnded, onTimeUpdate])

        useEffect(() => {
            setIcon(isPlaying ? pauseIcon : playIcon)
            if (isPlaying) {
                audioElem.current.play().catch(error => {
                    console.log('Audio play was interrupted:', error)
                    setPlayPending(true)
                })
            } else {
                audioElem.current.pause()
            }
        }, [isPlaying])

        const togglePlay = (e) => {
            e.stopPropagation()
            if (!isExpanded && !isPlaying) {
                onExpand(sermon.id)
            }
            onTogglePlay(sermon.id)
        }

        const alterProgress = (e) => {
            const newProgress = parseFloat(e.target.value)
            setProgress(newProgress)
            const newCurrentTime = (newProgress / 100) * audioElem.current.duration
            audioElem.current.currentTime = newCurrentTime
        }

        const onWaiting = () => {
            setBufferingVisibility("visible")
            const startTime = Date.now()

            const checkFlag = () => {
                if (audioElem.current && audioElem.current.readyState > audioElem.current.HAVE_CURRENT_DATA) {
                    setBufferingVisibility("hidden")
                } else if (Date.now() > startTime + 120000) {
                    console.log(TIMEOUT_ERROR)
                    alert(TIMEOUT_ERROR)
                    setBufferingVisibility("hidden")
                } else {
                    window.setTimeout(checkFlag, 100)
                }
            }
            checkFlag()
        }

        const sToTime = (t) => {
            const padZero = (v) => (v < 10 ? "0" + v : v)
            if (t < 3600) {
                return `${padZero(parseInt((t / 60) % 60))}:${padZero(parseInt(t % 60))}`
            } else {
                return `${padZero(parseInt((t / (60 * 60)) % 24))}:${padZero(parseInt((t / 60) % 60))}:${padZero(parseInt(t % 60))}`
            }
        }

        const handleContainerClick = (e) => {
            if (!e.target.closest('#play-icon') && !e.target.closest('#seek-slider') && !e.target.closest('.sermonBtn') && !e.target.closest('.modal-overlay')) {
                onExpand(isExpanded ? null : sermon.id)
            }
        }

        const openRecording = () => {
            window.open(sermon.attributes.recording)
        }

        const openGuide = (e) => {
            e.stopPropagation()
            const guides = sermon.attributes.guide.data
            if (guides.length === 1) {
                window.open(`${StrapiURL}${guides[0].attributes.url}`, '_blank')
            } else if (guides.length > 1) {
                setShowModal(true)
            }
        }

        const renderSermonAttributes = () => {
            const { speaker, scripture, series } = sermon.attributes
            const seriesId = series?.data?.id
            const seriesTitle = series?.data?.attributes?.title

            const attributes = [
                speaker?.data?.attributes?.name && (<small key="speaker">Speaker: <strong>{speaker.data.attributes.name}</strong></small>),
                seriesTitle && seriesId && (<small key="series">Series: <strong><Link to={`/series/${seriesId}`}>{seriesTitle}</Link></strong></small>),
                scripture && (<small key="scripture"> Scripture: <strong>{scripture}</strong> </small>),
            ].filter(Boolean)

            return attributes.reduce((acc, attr, index) => {
                if (index > 0) acc.push(<div className="infoDivider" key={`divider-${index}`} />)
                acc.push(attr)
                return acc
            }, [])
        }


        const convertDropboxLink = (url) => {
            try {
              const urlObj = new URL(url);
              if (urlObj.hostname === 'www.dropbox.com') {
                urlObj.hostname = 'dl.dropboxusercontent.com';
                urlObj.searchParams.set('dl', '1');
              }
              return urlObj.toString();
            } catch (error) {
              console.error('Invalid Dropbox URL:', error);
              return url;
            }
          };  
        

        return (
            <div className="sermon" onClick={handleContainerClick} style={{ height: isExpanded ? "128px" : "64px" }}>
                <div className="sermonButtons">
                    <button id="play-icon" onClick={togglePlay} style={{ backgroundImage: `url(${icon})` }}>
                        <div className="play-icon-hover"></div>
                    </button>
                    <button className="sermonBtn downloadSermon" onClick={openRecording} />
                    {sermon.attributes.guide.data.length > 0 && (<button className="sermonBtn viewGuide" onClick={openGuide} />)}
                </div>
                <div className="sermonMain">
                    <div className="sermonInfo">
                        <div className="sermonInfoRow">
                            <h5>{sermon.attributes.title}</h5>
                            {isNew && <div className="new-tag">NEW</div>}
                        </div>
                        <div className="sermonInfoRow">
                            <div className="sermonAttributes">{renderSermonAttributes()}</div>
                            <small className='date'>{formattedDate}</small>
                        </div>
                    </div>
                    <div className="scrubber">
                        <div id="audio-player-container">
                            <audio 
                                ref={audioElem} 
                                crossOrigin="anonymous"
                                onTimeUpdate={onTimeUpdate} 
                                onWaiting={onWaiting} 
                                onEnded={onEnded} 
                                src={convertDropboxLink(sermon.attributes.recording)} 
                                preload="metadata"
                            />                            
                            <small id="current-time" className="time">{sToTime(currentTime)}</small>
                            <input type="range" id="seek-slider" min="0" max="100" step="0.001" value={progress} onChange={alterProgress} style={{ "--buffered-width": `${buffer}%`, "--seek-before-width": `${progress}%`, padding: 0 }} />
                            <div className="bufferingWrapper" style={{ "--buffering-visibility": bufferingVisibility, "--seek-after-width": `${100 - progress - (1 - progress / 100)}%` }}>
                                <div className="bufferingClipper">
                                    <div className="buffering" />
                                </div>
                            </div>
                            <small id="duration" className="time">{sToTime(audioElem.current?.duration || 0)}</small>
                        </div>
                    </div>
                </div>
                <Modal show={showModal} onClose={() => setShowModal(false)} guides={sermon.attributes.guide.data} />
            </div>
        )
    }

    const AudioPlayer = ({ sermons }) => {
        const [expandedPlayer, setExpandedPlayer] = useState(null)
        const [playingPlayer, setPlayingPlayer] = useState(null)

        const handleExpand = (id) => {
            setExpandedPlayer((prev) => (prev === id ? null : id))
        }

        const handleTogglePlay = (id) => {
            setPlayingPlayer((prev) => (prev === id ? null : id))
        }

        return (
            <>
                <img src={pauseIcon} style={{ display: "none" }} alt="preloading pause icon" />
                <div className="sermons">
                    {sermons.map((sermon) => (<Player key={sermon.id} sermon={sermon} isExpanded={expandedPlayer === sermon.id} onExpand={handleExpand} isPlaying={playingPlayer === sermon.id} onTogglePlay={handleTogglePlay} />))}
                </div>
            </>
        )
    }

    export default AudioPlayer
