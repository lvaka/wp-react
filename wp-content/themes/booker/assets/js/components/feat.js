import React from 'react'

const Feat = props => {
  const full = props.media_details.sizes.full
  const large = props.media_details.sizes.large
  const medium = props.media_details.sizes.medium
  const mediumLarge = props.media_details.sizes.medium_large
  const thumbnail = props.media_details.sizes.full
  const alt = props.alt_text
  const srcset = [
    `${thumbnail.source_url} ${thumbnail.width}w`,
    `${mediumLarge.source_url} ${mediumLarge.width}w`,
    `${medium.source_url} ${medium.width}w`,
    `${large.source_url} ${large.width}w`,
    `${full.source_url} ${full.width}w`
  ]

  return (
    <img
      className='img-fluid'
      src={medium.source_url}
      width='300'
      height='300'
      alt={alt}
      loading='lazy'
      srcSet={srcset.join(', ')}
    />
  )
}
export default Feat
