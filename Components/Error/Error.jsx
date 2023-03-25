import React from 'react'

import Styles from './Error.module.css';
const Error = ({error}) => {
  return (
    <div className={Styles.Error}>
      <div className={Styles.Error_box}>
        <h1> Please fix this error and reload the browser</h1>
        {error}

      </div>

    </div>
  )
}

export default Error
