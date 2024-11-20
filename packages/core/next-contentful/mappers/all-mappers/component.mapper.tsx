import { BaseMapper, type ConstructorParams } from './base.mapper'
import type { ComponentMapperConfig } from '../../configs/config.types'
import type { ComponentMapperInterface } from './mapper.interface'
import type { RootComponentProps } from '@rightpoint/core/components'
import type { Entry } from 'contentful'

/**
 * The component mapper is used to render contentful components.
 */
export class ComponentMapper<
        E extends Entry<any>,
        P extends Record<string, any>
    >
    extends BaseMapper<E, P>
    implements ComponentMapperInterface<P>
{
    entry?: E

    entryId?: string
    config: ComponentMapperConfig<E, P>

    constructor({
        config,
        manager,
        entryOrId,
    }: ConstructorParams<ComponentMapperConfig<E, P>>) {
        super({ config, manager, entryOrId })
    }
    /**
     * This payload is used to render via the Component renderer component.
     *
     * It contains extra data about the component such as
     * __contentTypeId and __entryId which is used to
     * render the component.
     */
    public async getComponentPropsWithMeta() {
        return {
            componentProps: await this.getProps(),
            rootProps: await this.getRootProps(),
            mapperProps: await this.getMapperProps(),
        }
    }
    async getRootProps(): Promise<RootComponentProps> {
        if (this.config.entryToRootProps) {
            const props = await this.config.entryToRootProps({
                entry: this.entry,
            } as any)
            return this.sanitizeJsonResponse({
                ...props,
            })
        }
        return null
    }
    async getProps(): Promise<P> {
        if (this.config.entryToProps) {
            const props = await this.config.entryToProps({
                entry: this.entry,
                manager: this.manager,
            })
            if (!props) {
                return null
            }
            return this.sanitizeJsonResponse({
                ...props,
                // this provides preview data
                // if any child implements PreviewWrapper
                mapperProps: this.getMapperProps(),
            })
        }
        return null
    }
}
