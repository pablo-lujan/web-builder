import React from 'react'
import { types } from 'react-bricks/frontend'
import blockNames from '../../blockNames'
import {
  containerWidthSideGroup,
  LayoutProps,
  neutralBackgroundSideGroup,
  paddingBordersSideGroup,
  sectionDefaults,
} from '../../LayoutSideProps'
import Container, { Padding, Size } from '../../shared/components/Container'
import Section, { Border } from '../../shared/components/Section'
import TitleSubtitle from '../../shared/components/TitleSubtitle'


interface TitleProps extends LayoutProps {
  title: string; // Added dynamic title
  subtitle: string; // Added dynamic subtitle
  backgroundColor: { color: string; className: string }
  backgroundImage?: types.IImageSource
  backgroundImageDark?: types.IImageSource
  paddingTop: Padding
  paddingBottom: Padding
  borderTop: Border
  borderBottom: Border
  width: Size
  bigCentered: boolean
  extraboldTitle: boolean
}

const Title: types.Brick<TitleProps> = ({
  title = 'Default Title',
  subtitle = 'Default Subtitle',
  bigCentered = false,
  extraboldTitle = false,
  backgroundColor = sectionDefaults.backgroundColor,
  borderTop =  sectionDefaults.borderTop,
  borderBottom =  sectionDefaults.borderBottom,
  paddingTop = sectionDefaults.paddingTop,
  paddingBottom  = sectionDefaults.paddingBottom,
  width = 'medium',
}) => {
  return (
    <Section
      backgroundColor={backgroundColor}
      borderTop={borderTop}
      borderBottom={borderBottom}
    >
      <Container
        size={width}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
      >
        <TitleSubtitle
          title={title} // Pass title
          subtitle={subtitle} // Pass subtitle
          bigCentered={bigCentered}
          extraboldTitle={extraboldTitle}
        />
      </Container>
    </Section>
  )
}


Title.schema = {
  name: blockNames.Title,
  label: 'Title',
  category: 'single column / blog',
  tags: ['title'],
  previewImageUrl: `/bricks-preview-images/${blockNames.Title}.png`,
  // Defaults when a new brick is added
  getDefaultProps: () => ({
    ...sectionDefaults,
    width: 'small',
    paddingTop: '0',
    paddingBottom: '0',
    title: 'Thick as a brick',
    subtitle: "All in all you're just another brick in the page",
    bigCentered: true,
    extraboldTitle: false,
  }),

  // Sidebar Edit controls for props
  sideEditProps: [
    neutralBackgroundSideGroup,
    paddingBordersSideGroup,
    containerWidthSideGroup,
    {
      groupName: 'Text',
      defaultOpen: true,
      props: [
        {
          name: 'bigCentered',
          label: 'Big centered',
          type: types.SideEditPropType.Boolean,
        },
        {
          name: 'extraboldTitle',
          label: 'Extra bold Title',
          type: types.SideEditPropType.Boolean,
        },
      ],
    },
  ],
}

export default Title
