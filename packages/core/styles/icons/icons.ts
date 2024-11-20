import { Arrow } from './Arrow'
import { Logo } from './Logo'
import { LogoMark } from './LogoMark'
import { Menu } from './Menu'
import { SmallArrow } from './SmallArrow'
import { Facebook } from './social/Facebook'
import { Instagram } from './social/Instagram'
import { LinkedIn } from './social/LinkedIn'
import { Twitter } from './social/Twitter'

// const IconWrapper: FC<ReactElement> = (Component) => {
//     const WrappedComponent = useCallback(() => Component, [Component])
//     // have an opportunity to provide icon specific overrides to control the icon colors
//     return WrappedComponent as ReactElement
// }

export const icons = {
    Arrow,
    Logo,
    LogoMark,
    Twitter,
    LinkedIn,
    Instagram,
    Facebook,
    SmallArrow,
    Menu,
}
