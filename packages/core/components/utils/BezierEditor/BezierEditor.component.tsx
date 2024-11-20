import {
    ComponentType,
    createContext,
    FunctionComponent,
    useCallback,
    useContext,
    useState,
} from 'react'
import BezierEditorLib from 'bezier-easing-editor'
import { Composition } from 'atomic-layout'
import { debounce, defaults } from 'lodash'
import { motion } from 'framer-motion'

const BezierEditor = ({ defaultValue, onChange, title = '' }) => {
    const default_ = defaultValue || [0, 0, 1, 1]
    const [bezier, setBezier] = useState(default_)

    const getDebounced = useCallback(
        () =>
            debounce((fn) => {
                fn()
            }, 250),
        []
    )
    return (
        <div>
            <BezierEditorLib
                defaultValue={default_}
                onChange={(v) => {
                    getDebounced()(() => {
                        setBezier(v)
                        onChange(v)
                    })
                }}
                style={{
                    zIndex: 10,
                }}
                className="bezier"
                curveColor="#0af"
                gridColor="#eee"
                handleColor="#000"
                progressColor="#0af"
            >
                <text x={16} y={14} fill="#000">
                    {title}
                </text>
            </BezierEditorLib>
            <div
                style={{
                    paddingLeft: 20,
                    fontSize: 14,
                }}
            >
                <pre>{bezier.map((v) => v.toFixed(2)).join(', ')}</pre>
            </div>
        </div>
    )
}

export const BezierEditorContext = createContext({})

export const useBezierEditorContextDefaults = <T,>(defaultContext: T) => {
    const context = useContext(BezierEditorContext) as T
    return defaults(context, defaultContext)
}

type ContextKeys<ContextsOptions, V = any> = {
    [key in keyof ContextsOptions]: V
}
type ValuesToProps<ContextOptions> = (
    /** context values */
    arg: ContextKeys<ContextOptions, any>,
    /** optional props passed to component */
    props?: object
) => object
type ContextOptionValue = {
    title?: string
    defaultValue?: any
}
type CreateOptions<ContextOptions> = {
    fixedPosition?: boolean
    contexts: {
        [key in keyof ContextOptions]: ContextOptionValue
    }
    valuesToProps?: ValuesToProps<ContextOptions>
    handleChange?: (arg: { key: string; value: number[] }) => void
}
type GetFunctionArg<T> = T extends (arg: infer Arg) => any ? Arg : never

export const withBezierEditor = <C extends object, ContextOptions>(
    Component: ComponentType<C>,
    {
        contexts,
        fixedPosition = true,
        valuesToProps,
        handleChange,
    }: CreateOptions<ContextOptions>
) => {
    const Wrapped = (props: C) => {
        // let's get the type dynamically so we don't have to maintain it
        const defaults = {} as GetFunctionArg<typeof valuesToProps>
        Object.keys(contexts).forEach((key) => {
            defaults[key] = contexts[key].defaultValue || [0, 0, 1, 1]
        })
        const [contextValue, setContextValue] = useState(defaults)
        const [isMinimized, setIsMinimized] = useState(false)

        return (
            <BezierEditorContext.Provider
                value={{
                    ...contextValue,
                }}
            >
                <Component
                    {...props}
                    /**
                     * Pass values directly as props instead of context
                     */
                    {...(valuesToProps
                        ? valuesToProps(contextValue, props)
                        : {})}
                />

                {fixedPosition && (
                    <button
                        style={{
                            position: 'fixed',
                            bottom: 5,
                            right: 5,
                            zIndex: 101,
                        }}
                        onClick={() => {
                            setIsMinimized(!isMinimized)
                        }}
                    >
                        {isMinimized ? 'Open' : 'Close'} Bezier Editor
                    </button>
                )}

                <motion.div
                    style={
                        fixedPosition
                            ? {
                                  position: 'fixed',
                                  bottom: 0,
                                  right: 0,
                                  ...(isMinimized
                                      ? {
                                            translateY: '100%',
                                        }
                                      : {}),
                                  zIndex: 100,
                                  maxHeight: '90vh',
                                  overflowY: 'scroll',
                              }
                            : {}
                    }
                >
                    <Composition
                        templateCols="repeat( auto-fit, minmax(250px, 1fr) )"
                        gap={20}
                        margin={20}
                    >
                        {/* render one editor per context  */}
                        {Object.keys(contexts).map((key) => {
                            const { defaultValue, title = key } = contexts[key]
                            return (
                                <BezierEditor
                                    key={key}
                                    onChange={(value) => {
                                        setContextValue({
                                            ...contextValue,
                                            [key]: value,
                                        })
                                        handleChange &&
                                            handleChange({ key, value })
                                    }}
                                    title={title}
                                    defaultValue={defaultValue}
                                />
                            )
                        })}
                    </Composition>
                </motion.div>
            </BezierEditorContext.Provider>
        )
    }
    return Wrapped
}

type HOCFunc = (...args) => any

const HOC = <T extends HOCFunc, O>(Component: T, options: O) => {
    const Wrapper = (props) => {}
    return Wrapper
}

const MyComponent = () => {}

const MyWrapped = HOC(MyComponent, {
    options: 123,
})
