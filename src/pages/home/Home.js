import React from 'react'
import {Menu1, Navbar} from '../../components'
import {Header,Footer} from '../../containers'

const Home = () => {
  return (
    <div className="App">
    <div className='gradient__bg'>
      <Navbar/>
      <Header/>
      <Footer/>
      {/* <Menu1/> */}
    </div>
  </div>
  )
}

export default Home
