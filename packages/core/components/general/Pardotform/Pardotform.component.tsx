import { FC, useState } from 'react'
import { PardotStyles as s } from './Pardotform.styles'
import type { Document } from '@contentful/rich-text-types'
import { contentfulRichTextToReact } from '@rightpoint/core/components'
import { useRouter } from 'next/router'

export type PardotFormProps = {
    label: string
    value: Record<string, { states?: string[] }>
    internalName: string
    required: boolean
}

export type PardotFormEntryProp = {
    formHandler: string
    fields: PardotFormProps[]
    description: Document
}

export const PardotFormPage: FC<PardotFormEntryProp> = ({
    formHandler,
    fields,
    description,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<string>('') // To store selected country
    const [states, setStates] = useState<string[]>([]) // To store states for the selected country
    const [formData, setFormData] = useState<Record<string, string>>({}) // To store the form data
    const [submitStatus, setSubmitStatus] = useState<string>('') // To handle form submission status
    const router = useRouter()

    const sortObjectAlphabetically = (obj: Record<string, any>) => {
        return Object.fromEntries(
            Object.entries(obj).sort(([keyA], [keyB]) =>
                keyA.localeCompare(keyB)
            )
        )
    }

    const countryData = sortObjectAlphabetically(
        fields.find((field) => field.label === 'Country')?.value || {}
    )
    const stateData = sortObjectAlphabetically(
        fields.find((field) => field.label === 'State')?.value || {}
    )

    const handleCountryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const country = event.target.value
        setSelectedCountry(country)
        const countryStates = stateData[country]?.states || []
        setStates(countryStates)
        setFormData((prevData) => ({ ...prevData, country: country }))
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(
                '/api/pardot/submitForm?formID=https://go.rightpoint.com/l/141911/2021-08-11/9s6wv7',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )
            const data = await res.json()
            if (data && data.submitStatus) {
                router.push(`${router.asPath}/thank-you`)
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    return (
        <s.Container>
            <s.Body>{contentfulRichTextToReact(description)} </s.Body>

            <s.FormWrapper>
                <s.InfoLabel>Want more information?</s.InfoLabel>
                <s.InfoLabel>Fill out the form below.</s.InfoLabel>
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div key={index} className={field.internalName}>
                            {field.label === 'Country' ? (
                                <select
                                    name={field.internalName}
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    required={field.required}
                                >
                                    <option value="">Select a Country</option>
                                    {Object.keys(countryData).map(
                                        (country, idx) => (
                                            <option key={idx} value={country}>
                                                {country}
                                            </option>
                                        )
                                    )}
                                </select>
                            ) : field.label === 'State' ? (
                                <select
                                    name={field.internalName}
                                    onChange={handleInputChange}
                                    required={field.required}
                                >
                                    <option value="">Select a State</option>
                                    {states.map((state, idx) => (
                                        <option key={idx} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            ) : field.internalName === 'keepinformed' ? (
                                <div>
                                    <s.InfoMarketingCheckbox
                                        type="checkbox"
                                        id="marketing-consent"
                                    />
                                    <s.InfoMarketingLabel>
                                        {field.label}
                                    </s.InfoMarketingLabel>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    name={field.internalName}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    onChange={handleInputChange}
                                    value={formData[field.internalName] || ''}
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                    {submitStatus && (
                        <div className="status-message">{submitStatus}</div>
                    )}
                </form>
            </s.FormWrapper>
        </s.Container>
    )
}
