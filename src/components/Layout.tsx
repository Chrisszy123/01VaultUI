import React from 'react'
import Navbar from './Navbar'

const Layout = (props: any) => {
  return (
    <div>
      <div className='main'>
          <div className='gradient'/>
      </div>
      <main className='app'>
        <Navbar />
        {props.children}
      </main>
    </div>
  )
}

export default Layout