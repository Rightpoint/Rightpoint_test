import { NextApiHandler } from 'next'

const exitPreview: NextApiHandler = (req, res) => {
    // Clears the preview mode cookies.
    res.clearPreviewData()
    res.redirect('/')
}

export default exitPreview
