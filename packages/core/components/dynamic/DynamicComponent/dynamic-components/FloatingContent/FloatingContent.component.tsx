import { random, sortBy, times } from 'lodash'
import { Children, FC, ReactNode, useEffect, useState } from 'react'
import { FloatingContentStyles as s } from './FloatingContent.styles'

export interface FloatingContentItemProps {
    children: ReactNode
}

const FloatingContentItem: FC<FloatingContentItemProps> = ({ children }) => {
    const [styles, setStyles] = useState({})
    useEffect(() => {
        setStyles({
            top: Math.floor(Math.random() * 100) + '%',
            left: Math.floor(Math.random() * 100) + '%',
        })
    }, [])

    return <s.Item style={styles}>{children}</s.Item>
}

export interface FloatingContentProps {
    children: ReactNode
}

class Quad {
    xRange: number[]
    yRange: number[]
    item: Item
    constructor(xRange, yRange, item) {
        this.xRange = xRange
        this.yRange = yRange
        this.item = item
    }
    getAbsoluteMidPoint(range) {
        // we must find divide the difference in the range
        const distance = range[1] - range[0]
        // 1-.5 = .5
        const midpoint = distance / 2
        // .5/2 = .25
        // add this to the start number, to get the real middle.
        const absoluteMiddle = range[0] + midpoint
        return absoluteMiddle
    }
    isLeft() {
        if (this.item.x < this.getAbsoluteMidPoint(this.xRange)) {
            return true
        }
        return false
    }
    isTop() {
        if (this.item.y < this.getAbsoluteMidPoint(this.yRange)) {
            return true
        }
        return false
    }
    getQuadString() {
        const left = this.isLeft() ? 'left' : 'right'
        const top = this.isTop() ? 'top' : 'bottom'
        return `${left}-${top}`
    }
    getItemQuadRanges() {
        // return quad ranges given the item
        let xRange
        let yRange
        // TODO: have to account for out of range.
        if (this.isTop()) {
            yRange = [this.yRange[0], this.getAbsoluteMidPoint(this.yRange)]
        } else {
            yRange = [this.getAbsoluteMidPoint(this.yRange), this.yRange[1]]
        }
        if (this.isLeft()) {
            const xEnd = this.getAbsoluteMidPoint(this.xRange) // == .5
            xRange = [this.xRange[0], xEnd]
        } else {
            const xStart = this.getAbsoluteMidPoint(this.xRange) // == .5
            xRange = [xStart, this.xRange[1]]
        }
        return {
            xRange,
            yRange,
        }
    }
    getQuadAtDepth(targetDepth = 2, currentDepth = 0, quad = this as Quad) {
        // this will get us something like top-right, in 0-1 scope
        if (currentDepth < targetDepth) {
            // keep going
            const { xRange, yRange } = quad.getItemQuadRanges()
            const newQuad = new Quad(xRange, yRange, this.item)
            console.log(
                `Getting quad at ${currentDepth}: ${quad.getQuadString()}`
            )
            this.getQuadAtDepth(targetDepth, currentDepth + 1, newQuad)
        }
    }
}

type Item = {
    x?: number
    y?: number
}

class QuadManager {
    items: Item[]
    item: Item
    constructor(items: Item[]) {
        this.items = items
    }
    get placed() {
        return this.items.filter((item) => item.x && item.y)
    }
    findLeastOccupiedQuad(
        depth = 1,
        range = [0, 1]
    ): null | {
        name: string
        quadRange: { xRange: number[]; yRange: number[] }
    } {
        if (!this.placed.length) {
            return null
        }

        /**
         * for each placed item, init the quad detector for each item.
         */
        const quads = this.placed.map((item) => {
            return new Quad(range, range, item)
        })

        // todo: need to init this
        const counter = {
            'left-top': {
                count: 0,
                quadRange: {
                    xRange: [range[0], range[1] / 2],
                    yRange: [range[0], range[1] / 2],
                },
            },
            'right-top': {
                count: 0,
                quadRange: {
                    xRange: [0.5, 1],
                    yRange: [0, 0.5],
                },
            },
            'right-bottom': {
                count: 0,
                quadRange: {
                    xRange: [0.5, 1],
                    yRange: [0.5, 1],
                },
            },
            'left-bottom': {
                count: 0,
                quadRange: {
                    xRange: [0, 0.5],
                    yRange: [0.5, 1],
                },
            },
        }
        quads.map((quad) => {
            if (counter[quad.getQuadString()]) {
                counter[quad.getQuadString()].count += 1
            } else {
                counter[quad.getQuadString()] = {
                    count: 1,
                    quadRange: quad.getItemQuadRanges(),
                }
            }
        })
        console.log('Counter', counter)

        const sorted = Object.entries(counter)
            .map(([key, counter]) => ({
                name: key,
                ...(counter as any),
            }))
            .sort((a: any, b: any) => a.count - b.count)
        const mostEmptyQuad = sorted[0]
        console.log('Least occupied quad', mostEmptyQuad, sorted)
        // now we know to place it in this quad.
        // bu
        return mostEmptyQuad as any
    }
    findLeastOccupiedQuadAtDepth(depth = 1) {
        if (!this.placed.length) {
            return null
        }
    }

    placeItem(item) {
        // take one item, and place it.
        let xRange, yRange
        if (this.findLeastOccupiedQuad()) {
            const { name, quadRange } = this.findLeastOccupiedQuad()
            xRange = quadRange.xRange
            yRange = quadRange.yRange
        } else {
            xRange = [0, 0.5]
            yRange = [0, 0.5]
            console.log('Place item no quad.. forcing top left')
        }
        item.x = random(xRange[0], xRange[1])
        item.y = random(yRange[0], yRange[1])
        return item
    }

    placeAllItems() {
        return this.items.map((item) => {
            return this.placeItem(item)
        })
    }
}

export const FloatingContent: FC<FloatingContentProps> = ({ children }) => {
    const [placedItems, setItems] = useState([])

    return (
        <s.FloatingContent>
            <button
                onClick={() => {
                    const items = times(10, () => ({
                        text: 'Hello',
                        x: null,
                        y: null,
                    }))
                    setItems(new QuadManager(items).placeAllItems())
                }}
            >
                Shuffle
            </button>
            {placedItems.map((item, index) =>
                item ? (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: item.y * 100 + '%',
                            left: item.x * 100 + '%',
                        }}
                    >
                        Placed
                    </div>
                ) : (
                    <>No item...</>
                )
            )}
            {/* 
            {items.map((item) => (
                <FloatingContentItem key={item.text}>
                    {item.text}
                </FloatingContentItem>
            ))} */}
        </s.FloatingContent>
    )
}
