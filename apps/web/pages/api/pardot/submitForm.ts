// pages/api/submitForm.ts

import type { NextApiRequest, NextApiResponse } from 'next'

const submitDataToPardot = async (
    formData: Record<string, string>,
    pardotFormHandlerURL: string
) => {
    let isSuccess = false

    if (pardotFormHandlerURL) {
        try {
            // Prepare the data to be posted (URL-encoded)
            const dataToBePosted = getFilledData(formData)

            // Send POST request to Pardot using fetch
            const response = await fetch(pardotFormHandlerURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: dataToBePosted,
            })
            if (response.ok) {
                isSuccess = true
            } else {
                isSuccess = false
            }
        } catch (error) {
            console.error('SubmitDataToPardot error - ', error)
        }
    }
    return isSuccess
}

// Function to format form data as URL-encoded string
const getFilledData = (formData: Record<string, string>) => {
    return Object.keys(formData)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    formData[key]
                )}`
        )
        .join('&')
}

// Handle the POST request to submit the form data
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const formData = req.body
        const formID = req.query.formID

        const submitStatus = await submitDataToPardot(
            formData,
            formID as string
        )

        res.status(200).json({ submitStatus })
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}
