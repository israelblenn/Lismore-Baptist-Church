import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import SermonsHeader from '../modules/SermonsHeader'
import AudioPlayer from '../modules/AudioPlayer'
import back from '../assets/back.svg'

const StrapiURL = process.env.REACT_APP_STRAPI_URL

const GET_SERIES = gql`
  query GetSeries($id: ID!) {
    series(id: $id) {
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
                recording {
                  data {
                    attributes {
                      url
                    }
                  }
                }
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

const Series = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_SERIES, {
    variables: { id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const series = data.series.data

  const sortedSermons = [...series.attributes.sermons.data].sort((a, b) => {
    const dateA = new Date(a.attributes.date)
    const dateB = new Date(b.attributes.date)
    return dateB - dateA
  })

  return (
    <>
      <SermonsHeader />
      <div className="container-medium">
        <Link className='backlink' to={'/sermons'}>
          <img src={back} alt="Back" /> All Sermons & Series
        </Link>
        <div className='series-info'>
          <div className='series-text'>
            <h2 className='series-title'>{series.attributes.title}</h2>
            <p>{series.attributes.description}</p>
          </div>
          <div
            className='cover'
            style={{
              backgroundImage: `url(${StrapiURL}${series.attributes.cover?.data?.attributes?.url})`
            }}
          />
        </div>
        <AudioPlayer sermons={sortedSermons} />
        <div className='series-end'>
          <Link className='end-backlink' to={'/sermons'}>
            Back to All Sermons and Series
          </Link>
        </div>
      </div>
    </>
  )
}

export default Series
