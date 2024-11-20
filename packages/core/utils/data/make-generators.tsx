export type GeneratorWithDefault<T, R> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
        ? ReturnType<T[K]> extends R
            ? // if it does, then return the function
              T[K]
            : never // otherwise, cause an compile error
        : never
} & {
    // require a no argument default function
    default: () => R
}

// type Diff<
//     T extends string | number | symbol,
//     U extends string | number | symbol
// > = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]

// export type GeneratorWithDefault<T, R> = {
//     [K in keyof T]: T[K] extends (...args: any[]) => any
//         ? ReturnType<T[K]> extends R
//             ? T[K]
//             : K extends string
//             ? `${K} property's return type is not assignable to props.. The following properties are unexpected: ${Diff<
//                   keyof ReturnType<T[K]>,
//                   keyof R
//               >}`
//             : never
//         : never
// } & {
//     default: () => R
// }
/**
 * Make a typed generator function with required default.
 *
 * Almost all components contain a data generator.
 *
 * It is a reasonable expectation that for any given component, there is a way
 * to render it with valid props via the data generator. In testing, or in Storybook.
 *
 * <MyComponent {...myComponentGenerators.default()/>
 *
 * Usage:
 * export const myComponentGenerators = makeTypedGeneratorFn<MyProps>()({
 *    default: () => ({
 *        myProp: 'myProp',
 *    })
 * })
 */
export const makeTypedGeneratorFn = <Props,>() => {
    return <O,>(obj: GeneratorWithDefault<O, Props>) => {
        return obj
    }
}
