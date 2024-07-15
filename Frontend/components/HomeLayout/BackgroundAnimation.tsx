import React from 'react'

import PictureFrame from './PictureFrame'

import { imageFrameProps } from '@/lib/constants'

const BackgroundAnimation = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-green-200 opacity-50 overflow-hidden'>
        {imageFrameProps.map((image, index) => (
          <PictureFrame image={image} key={image.src}>
            <img
              src={image.src}
              alt={`wallpaper${index + 1}`}
              style={{ width: image.width, height: image.height }}
            />
          </PictureFrame>
        ))}
    </div>
  )
}

export default BackgroundAnimation
