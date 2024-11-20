/**
 * Link
 */
export { Link, type LinkProps } from './links/Link/Link.component'
export {
    linkMapperOldConfig as linkMapperConfig,
    linkMapperNewConfig,
} from './links/Link/Link.contentful'

/**
 * Image
 */
export {
    ImageWithAspect,
    Image,
    PureImage,
} from './general/Image/Image.component'
export { ImageStyles } from './general/Image/Image.styles'
export type { ImageProps } from './general/Image/Image.component'
export {
    imageMapperConfig,
    type ImageEntry,
} from './general/Image/Image.contentful'

/**
 * Multi Media
 */
export {
    MultiMedia,
    MultiMediaTypes,
    type MultiMediaProps,
} from './general/MultiMedia/MultiMedia.component'
export { MultiMediaContextProvider } from './general/MultiMedia/MultiMedia.context'
export {
    multiMediaMapperConfig,
    type MultiMediaEntry,
} from './general/MultiMedia/MultiMedia.contentful'

/**
 * Video
 */
export { Video, VideoContext } from './general/Video/Video.component'
export { type VideoProps } from './general/Video/Video.component'

/**
 * Aspect Wrapper
 */
export {
    AspectWrapper,
    AspectSizer,
} from './utils/AspectWrapper/AspectWrapper.component'
export { AspectWrapperRatios } from './utils/AspectWrapper/AspectWrapper.context'
export { AspectWrapperStyles } from './utils/AspectWrapper/AspectWrapper.styles'

/**
 * Hero
 */
export { Hero, HeroContentWidths } from './general/Hero/Hero.component'
export type { HeroProps } from './general/Hero/Hero.component'
export {
    type HeroEntry,
    heroMapperConfig,
} from './general/Hero/Hero.contentful'

/**
 * HeroBanner
 */
export { heroBannerMapperConfig } from './v2/HeroBanner/HeroBanner.contentful'

/**
 * Big Link List
 */
export { BigLinkList } from './general/BigLinkList/BigLinkList.component'
export type {
    BigLinkListProps,
    BigLinkListItemProps,
} from './general/BigLinkList/BigLinkList.component'
export { bigLinkListMapperConfig } from './general/BigLinkList/BigLinkList.contentful'

/**
 * Scroller
 */
export { ScrollerFreeMode } from './general/Scroller/ScrollerFreeMode/ScrollerFreeMode.component'
export { ScrollerAutoScroll } from './general/Scroller/ScrollerAutoScroll/ScrollerAutoScroll.component'

/**
 * Layout
 */
export { LayoutWithNavbar, Layout } from './layout/Layout/Layout.component'
export { Navbar } from './layout/Navbar/Navbar.component'

/**
 * Navigation
 */
export {
    Navigation,
    type NavigationProps,
} from './general/Navigation/Navigation.component'
export { navigationMapperConfig } from './general/Navigation/Navigation.contentful'

/**
 * Navigation Bar
 */
export { navigationBarMapperConfig } from './general/NavigationBar/NavigationBar.contentful'

/**
 * Background Color
 */
export { BackgroundColor } from './general/BackgroundColor/BackgroundColor.component'
export { BackgroundColorStyles } from './general/BackgroundColor/BackgroundColor.styles'

/**
 * Grid
 */
export { GridLayout, Grid, GridItem } from './general/Grid/Grid.component'
export { GridLayouts } from './general/Grid/Grid.types'

/**
 * Simple Grid
 */
export { SimpleGrid } from './general/SimpleGrid/SimpleGrid.component'
export { simpleGridMapperConfig } from './general/SimpleGrid/SimpleGrid.contentful'

/**
 * Animations
 * ----------
 */
export { ParallaxOnEnter } from './general/ParallaxOnScroll/ParallaxOnScroll.component'
export { Toolbar } from './debug/Toolbar/Toolbar.component'
export {
    useScrollAnimation,
    AnimationTypes,
} from './general/Animation/Animation.component'

/**
 * What We Deliver
 */
export { whatWeDeliverMapperConfig } from './general/WhatWeDeliver/WhatWeDeliver.contentful'

/**
 * Page Header
 */
export { PageHeader } from './v2/PageHeader/PageHeader.component'
export { pageHeaderMapperConfig } from './v2/PageHeader/PageHeader.contentful'

/**
 * Basic Header
 */
export { Header, type HeaderProps } from './v2/Header/Header.component'
export { headerMapperConfig } from './v2/Header/Header.contentful'

/**
 * Root Component
 */
export {
    RootComponentWrapper as RootComponent,
    type RootComponentWrapperProps as RootComponentProps,
} from './layout/RootComponent/RootComponent.component'
export { ContainerWidths, ContainerBox } from './layout/RootComponent/container'
export {
    BackgroundColors,
    ContentColors,
    getContentColorStyles,
} from './layout/RootComponent/background-color'
export { backgroundTypeUtils } from './layout/RootComponent/background-color-type-utils'

/**
 * Work Detail
 * -----------
 */

/**
 * Work Detail Text
 */
export {
    workDetailTextMapperConfig,
    type WorkDetailTextEntry,
} from './general/WorkDetailText/WorkDetailText.contentful'

/**
 * Work Detail Media
 */
export type { WorkDetailMediaProps } from './general/WorkDetailMedia/WorkDetailMedia.component'
export {
    workDetailMediaMapperConfig,
    type WorkDetailMediaEntry,
} from './general/WorkDetailMedia/WorkDetailMedia.contentful'

/**
 * Work Detail Impact
 */
export {
    workDetailImpactMapperConfig,
    type WorkDetailImpactEntry,
} from './general/WorkDetailImpact/WorkDetailImpact.contentful'

/**
 * Rich Text
 * * not the Contentful Long Rich Text Component
 */
export {
    RichText,
    type RichTextProps,
} from './general/RichText/RichText.component'

/**
 * Long Rich Text (used in Blog Posts)
 */
export {
    longRichTextMapperConfig,
    type LongRichTextEntry,
} from './general/LongRichText/LongRichText.contentful'

export { Cursor } from './general/Cursor/Cursor.component'

/**
 * Simple Content
 */
export {
    simpleContentMapperConfig,
    type SimpleContentEntry,
} from './v2/SimpleContent/SimpleContent.contentful'

/**
 * Simple Content
 */
export {
    simpleCtaMapperConfig,
    type SimpleCtaEntry,
} from './v2/SimpleCta/SimpleCta.contentful'

/**
 * Quote
 */
export { Quote, type QuoteProps } from './general/Quote/Quote.component'
export {
    quoteMapperConfig,
    type QuoteEntry,
} from './general/Quote/Quote.contentful'

/**
 * Share
 */
export { Share } from './general/Share/Share.component'

/**
 * Pardot
 */
export {
    pardotMapperConfig,
    PardotDynamic,
    type PardotEntry,
} from './general/Pardot/Pardot.contentful'
export type { PardotProps } from './general/Pardot/Pardot.component'

/**
 * Card
 */
export {
    Card,
    CardVariants,
    type CardProps,
} from './general/Card/Card.component'
export type { CardTagProps } from './general/Card/card-variants/CardTags'

/**
 * Button
 */
export { Button, ButtonLink } from './general/Button/Button.component'
export type {
    ButtonLinkProps,
    ButtonProps,
} from './general/Button/Button.component'

/**
 * Contentful Rich Text Renderers
 */
export { contentfulRichTextDummyGenerators } from './general/RichText/contentful-rich-text-dummy-generator'
export { contentfulRichTextDocumentToJsonSafe } from './general/RichText/contentful-rich-text-to-json-safe'
export { contentfulRichTextToReact } from './general/RichText/contentful-rich-text-to-react'

/**
 * Fallback Loading
 */
export { FallbackLoading } from './general/FallbackLoading/FallbackLoading.component'

/**
 * Mid Article CTA
 */
export { midArticleCtaMapperConfig } from './general/MidArticleCta/MidArticleCta.contentful'

/**
 * Person
 */
export { Person, type PersonProps } from './general/Person/Person.component'
export { personsPropsToCreditString } from './general/Person/persons-to-credit-string'
export {
    personMapperConfig,
    personPageMapperConfig as personPageMapperConfig,
    type PersonEntry,
} from './general/Person/Person.contentful'

/**
 * Dynamic Component
 */
export { dynamicComponentMapperConfig } from './dynamic/DynamicComponent/DynamicComponent.contentful'

/**
 * Debug Components (tests tree shaking)
 */
export { DebugLargePayload } from './debug/DebugLargePayload/DebugLargePayload.component'
export {
    debugLargePayloadMapperConfig,
    DebugLargePayloadDynamicNoSSR,
    DebugLargePayloadDynamic,
} from './debug/DebugLargePayload/DebugLargePayload.contentful'

/**
 * Cards List
 */
export {
    CardsList,
    CardsListLayouts,
    type CardsListProps,
} from './general/CardsList/CardsList.component'
export { cardsListMapperConfig } from './general/CardsList/CardsList.contentful'

export { horizontalCardsMapperConfig } from './v2/HorizontalCards/HorizontalCards.contentful'

/**
 * Jobs List
 */
export { JobsList } from './dynamic/DynamicComponent/dynamic-components/JobsList/JobsList.component'

/**
 * Thought Header
 */
export { ThoughtHeader } from './v2/ThoughtHeader/ThoughtHeader.component'

/**
 * Vertical Tabs
 */
export { verticalTabsMapperConfig } from './v2/VerticalTabs/VerticalTabs.contentful'

/**
 * Scrolling Text
 */
export { ScrollingText } from './v2/ScrollingText/ScrollingText.component'

/**
 * Solutions Lottie Animation
 */
export { SolutionsAnimationDynamic } from './dynamic/DynamicComponent/dynamic-components/SolutionsAnimation/SolutionsAnimation.component.dynamic'

/**
 * Component Group
 */
export { componentGroupMapperConfig } from './layout/ComponentGroup/ComponentGroup.contentful'

/**
 * Tabs Nav
 */
export { TabsNav } from './v2/TabsNav/TabsNav.component'

/**
 * Links List
 */
export { inPageLinkListMapperConfig } from './v2/InPageLinkList/InPageLinkList.contentful'
