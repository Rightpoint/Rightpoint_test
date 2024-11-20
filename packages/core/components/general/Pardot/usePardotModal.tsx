import { useCallback, useMemo, useState } from 'react'
import { PardotModal, PardotModalProps, PardotProps } from './Pardot.component'

/**
 * Returns a Pardot Modal, props to pass to it, and a controller to open/close it.
 *
 * This renders a lot, but use the flamegraph profiler to detect true perf issues.
 *
 * Usage:
 * const { PardotModal, pardotModalProps, pardotModalController } = usePardotModal({pardotProps})
 * <PardotModal {...pardotModalProps} />
 * <div onClick={() => pardotModalController.setIsOpen(true)}>Open</div>
 */
export const usePardotModal: ({
    pardotProps,
}: {
    pardotProps: PardotProps
}) => {
    PardotModal: typeof PardotModal
    pardotModalProps: PardotModalProps
    pardotModalController: {
        set: (value: boolean) => void
        open: () => void
        close: () => void
    }
} = ({ pardotProps }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return {
        PardotModal,
        pardotModalProps: {
            ...pardotProps,
            isModalOpen,
            handleRequestClose: () => {
                setIsModalOpen(false)
            },
        },
        pardotModalController: {
            set: (value: boolean) => setIsModalOpen(value),
            open: () => setIsModalOpen(true),
            close: () => setIsModalOpen(false),
        },
    }
}
