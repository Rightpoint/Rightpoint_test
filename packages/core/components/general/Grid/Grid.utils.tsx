/**
 * Helper to render grid areas quickly if no modification needed to map
 */
interface GridRenderAreas {
    (arg: { areas: string[]; children: any })
}
export const gridRenderAreas: GridRenderAreas = ({
    areas: areasToMap,
    children,
}) => {
    return (areas) =>
        areasToMap.map((area, i) => {
            const Area = areas[area.toUpperCase()]
            return <Area key={i}>{children[i]}</Area>
        })
}
