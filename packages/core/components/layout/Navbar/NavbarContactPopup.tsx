import {
    useAppSelector,
    navbarSelectors,
    useAppDispatch,
    navbarActions,
} from '@rightpoint/core/redux'
import { pardotUrls } from '@rightpoint/core/variables'
import { usePardotModal } from '../../general/Pardot/usePardotModal'

/**
 * The Navbar contact popup is redux powered and hard coded because
 * passing linkProps.pardotProps to a Link conflicts state with the multiple
 * layers of re-rendering happening in the Navbar at multiple levels.
 */
export const NavbarContactPopup = () => {
    const dispatch = useAppDispatch()
    const { PardotModal, pardotModalProps, pardotModalController } =
        usePardotModal({
            pardotProps: {
                embedUrl: pardotUrls.CONTACT_FORM,
            },
        })
    const isOpen = useAppSelector(navbarSelectors.isContactModalOpen)
    return (
        <>
            <PardotModal
                {...pardotModalProps}
                /**
                 * Use Redux to control the contact modal
                 */
                handleRequestClose={() => {
                    dispatch(navbarActions.closeContactModal())
                }}
                isModalOpen={isOpen}
            />
        </>
    )
}
