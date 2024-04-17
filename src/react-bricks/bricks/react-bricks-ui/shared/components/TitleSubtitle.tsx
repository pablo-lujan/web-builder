import classNames from 'classnames'
import React from 'react'
import { Text } from 'react-bricks/frontend'
import { textColors } from '../../colors'

interface TitleSubtitleProps {
  title?: string
  subtitle?: string
  bigCentered?: boolean
  extraboldTitle?: boolean
  className?: string
  editable?: boolean
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title= '',
  subtitle= '',
  bigCentered = false,
  extraboldTitle = false,
  className = '',
  editable = false,
}) => {
  const titleClass = classNames(
    'text-2xl leading-7',
    extraboldTitle ? 'font-extrabold' : 'font-bold',
    textColors.GRAY_900,
    { 'lg:text-[32px] lg:leading-9 text-center': bigCentered }
  )

  const subtitleClass = classNames(
    { 'sm:text-lg leading-7': bigCentered },
    textColors.GRAY_600,
    bigCentered ? 'mt-3 text-center' : 'mt-2'
  )
  return (
    <div className={className}>
      {editable ? (
        <>
          <Text
            propName="title"
            placeholder="Title..."
            renderBlock={({ children }) => (
              <h2
                className={classNames(
                  'text-2xl leading-7',
                  extraboldTitle ? 'font-extrabold' : 'font-bold',
                  textColors.GRAY_900,
                  { 'lg:text-[32px] lg:leading-9 text-center': bigCentered }
                )}
              >
                {children}
              </h2>
            )}
          />
          <Text
            propName="subtitle"
            placeholder="Subtitle..."
            renderBlock={({ children }) => (
              <p
                className={classNames(
                  { 'sm:text-lg leading-7': bigCentered },
                  textColors.GRAY_600,
                  bigCentered ? 'mt-3 text-center' : 'mt-2'
                )}
              >
                {children}
              </p>
            )}
          />
        </>
      ) : (
        <>
          <h2 className={titleClass}>{title}</h2>
          <p className={subtitleClass}>{subtitle}</p>
        </>
      )}
    </div> 
  )
}

export default TitleSubtitle
