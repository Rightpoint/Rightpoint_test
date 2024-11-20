// export default {
//     component: BackgroundColor,
//     title: 'Components/BackgroundColor',
//     parameters: {
//         docs: {
//             description: {
//                 // component: ''
//             },
//         },
//         // chromatic: { disableSnapshot: true },
//     },
// } as ComponentMeta<typeof BackgroundColor>

// const BGExample = ({
//     backgroundColor = BackgroundColors.Black,
//     backgroundColorType = BackgroundColorTypes.Fade,
//     text = '',
// }: {
//     backgroundColor?: BackgroundColors
//     backgroundColorType?: BackgroundColorTypes
//     text?: string
// }) => {
//     return (
//         <div style={{ margin: '300px 0' }}>
//             <BackgroundColor color={backgroundColor} type={backgroundColorType}>
//                 <Hero
//                     title={text || 'BG Sensitive'}
//                     subtitle={fakerWithSeed.lorem.paragraphs(3)}
//                     contentProps={{
//                         src: 'https://source.unsplash.com/sf_1ZDA1YFw/800x600',
//                     }}
//                     contentWidth={HeroContentWidths.Medium}
//                     contentComponent={ImageWithAspect}
//                 />
//                 <p
//                     style={{
//                         textAlign: 'center',
//                         maxWidth: '800px',
//                         margin: '5em auto',
//                     }}
//                 >
//                     <typography.BodyL>
//                         Background color is {backgroundColor} and type is{' '}
//                         {backgroundColorType}.
//                         <br />
//                         <a
//                             style={{
//                                 color: cssVarUtils.withFallback(
//                                     cssVarNames.content.colorAccent,
//                                     cssVarNames.colors.accent
//                                 ),
//                             }}
//                         >
//                             A Link
//                         </a>
//                     </typography.BodyL>
//                 </p>
//             </BackgroundColor>
//         </div>
//     )
// }

// const TextPlaceholder = () => (
//     <div style={{ height: '50vh' }}>
//         <typography.BodyL>
//             <div
//                 style={{
//                     textAlign: 'center',
//                     maxWidth: '800px',
//                     margin: '5em auto',
//                 }}
//             >
//                 {fakerWithSeed.lorem.paragraph(3)}
//             </div>
//         </typography.BodyL>
//     </div>
// )

// export const Default = () => (
//     <Layout>
//         <TextPlaceholder />

//         <BGExample
//             text="Solid BG"
//             backgroundColor={BackgroundColors.Black}
//             backgroundColorType={BackgroundColorTypes.Solid}
//         />
//         <TextPlaceholder />
//         <TextPlaceholder />
//         <BGExample text="Fade BG" backgroundColor={BackgroundColors.Black} />
//         <TextPlaceholder />
//         <TextPlaceholder />
//         <TextPlaceholder />
//         <BGExample backgroundColor={BackgroundColors.Coral} />
//         <TextPlaceholder />
//         <TextPlaceholder />
//     </Layout>
// )

// export const WithNoBox = () => (
//     <Layout>
//         <BackgroundColor color={BackgroundColors.Coral} removeBox={true}>
//             Hello I should have no padding. This is useful when padding is
//             explicitly provided by parent.
//         </BackgroundColor>
//     </Layout>
// )

// export const HalfBackground = () => (
//     <Layout>
//         <BackgroundColor
//             color={BackgroundColors.Black}
//             type={BackgroundColorTypes.Solid}
//             half={true}
//         >
//             <div
//                 style={{
//                     width: 500,
//                     margin: '0 auto',
//                     textAlign: 'center',
//                 }}
//             >
//                 <typography.H1>BG should be half</typography.H1>

//                 <MultiMedia {...multiMediaGenerators.default()} />
//             </div>
//         </BackgroundColor>
//     </Layout>
// )

export {}
