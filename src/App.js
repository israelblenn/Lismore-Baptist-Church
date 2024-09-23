// Modules
import Navbar from './modules/Navi'
import Footer from './modules/Footer'
import ScrollToTop from './modules/ScrollToTop'

// Pages
import Home from './pages/Home'
import OurTeam from './pages/OurTeam'
import Sermons from './pages/Sermons'
import Series from './pages/Series'
import Partnerships from './pages/Partnerships'
import ContactUs from './pages/ContactUs'
import NotFound from './pages/404'

// Styles
import './fonts/webfontkit/stylesheet.css'
import './styles/App.css'
import './styles/Navbar.css'
import './styles/Footer.css'
import './styles/Home.css'
import './styles/Sermons.css'
import './styles/Series.css'
import './styles/AudioPlayer.css'
import './styles/OurTeam.css'
import './styles/Partnerships.css'
import './styles/ContactUs.css'

// Router
import { Route, Routes } from 'react-router-dom'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OurTeam" element={<OurTeam />} />
          <Route path="/Sermons" element={<Sermons />} />
          <Route path="/series/:id" element={<Series />} />
          <Route path="/Partnerships" element={<Partnerships />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ApolloProvider>
  )
}

export default App
