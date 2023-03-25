import React from 'react'
import Image from 'next/image';

import Styles from './Loader.module.css';
import images from './../../Assets';
import { ST } from 'next/dist/shared/lib/utils';
const Loader = () => {
  return (
    <div className={Styles.Loader}>
      <div className={Styles.Loader_box}>
        <Image src={images.loader} alt="loader" width={100} height={100}/>
      </div>

    </div>
  )
}

export default Loader
