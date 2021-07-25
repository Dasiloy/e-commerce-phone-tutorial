import React from "react";
import {Link} from 'react-router-dom'

export default function Error() {
  return (
    <section className='error-page section'>
      <div className="error-container">
        <h3>oops! its a dead end</h3>
        <Link className='btn btn -primary' to='/'>Back home</Link>
      </div>
    </section>
  )
}
