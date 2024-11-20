import { navbarActions } from '@rightpoint/core/redux'
import { useDispatch } from 'react-redux'

export const useNavbarPopupToggleDispatch = () => {
    const dispatch = useDispatch()
    return () => dispatch(navbarActions.toggle())
}
