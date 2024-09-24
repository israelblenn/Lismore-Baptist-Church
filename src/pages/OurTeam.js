import { useQuery, gql } from '@apollo/client'
import header from "../assets/header-ourTeam.webp"

const StrapiURL = process.env.REACT_APP_STRAPI_URL

const GET_TEAM_MEMBERS = gql`
  query {
    teamMembers {
      data {
        attributes {
          name
          role
          biography
          picture {
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

const OurTeam = () => {
  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS)

  if (loading) return <em className="loading-text">loading content...</em>
  if (error) return <em className="loading-text">Error: {error.message}</em>

  const teamMembers = data.teamMembers.data

  return (
    <>
      <section className="header" style={{ backgroundImage: `url(${header})`, backgroundPosition: "50% 25%" }}>
        <div className="header-blur">
          <div className="container-medium">
            <h1 className="header-title">Our Team</h1>
          </div>
        </div>
      </section>

      <div className="container-medium">
        <section className="profiles">
          {teamMembers.map((member, index) => {
            const memberAttributes = member.attributes || {}
            const pictureUrl = memberAttributes.picture?.data?.attributes?.url || ''

            return (
              <div className="pastor-profile" key={index}>
                <img
                  className="headshot"
                  loading="lazy"
                  src={`${StrapiURL}${pictureUrl}`}
                  alt={`Pastor ${memberAttributes.name || 'Unknown'}`}
                />
                <div className="profile-text">
                  <h2>{memberAttributes.name || 'Unnamed'}</h2>
                  <h4>{memberAttributes.role || 'No Role Specified'}</h4>
                  <p>{memberAttributes.biography || 'No biography available.'}</p>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}

export default OurTeam
