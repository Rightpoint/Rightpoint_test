import styled from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'

export const PardotStyles = {
    Container: styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two-column layout */
        gap: 2rem; /* Adds space between the grid columns */
        padding: 2rem; /* Space around the content */
        padding-right: 100px;
        padding-left: 100px;
        @media (max-width: 768px) {
            padding: 10px;
            display: block;
        }
    `,

    Body: styled(typography.FoundersB100Static)``,

    Description: styled.div`
        background-color: #fff; /* White background for contrast */
        padding: 2rem;
        border-radius: 8px; /* Rounded corners for a modern look */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow */
        font-size: 1rem;
        color: #333; /* Dark gray text */

        @media (max-width: 768px) {
            grid-column: span 12; /* Full width on mobile */
        }
    `,

    FormWrapper: styled.div`
        padding: 2rem;
        border-radius: 33px;
        background: #fff;
        box-shadow: 3px 3px 46.6px -1px rgba(0, 0, 0, 0.25);
        @media (max-width: 768px) {
            grid-column: span 12; /* Full width on mobile */
        }

        form {
            margin-top: 10px;
            label {
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: #333;
                font-size: 1rem;
            }
            .firstname {
                padding-right: 10px;
            }
            .lastname {
                padding-left: 10px;
            }
            .firstname,
            .lastname {
                width: 50%;
                float: left;
            }

            input[type='text'],
            select {
                width: 100%;
                padding: 0.85rem;
                margin-bottom: 1.5rem;
                transition: border-color 0.2s, box-shadow 0.2s;
                border-radius: 35px;
                border: 1px solid #212121;
                background: #fff;
                font-family: 'Founders Grotesk';
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 120%; /* 19.2px */
                letter-spacing: -0.32px;
                &:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }
            }

            button[type='submit'] {
                width: 100%;
                padding: 0.75rem 1.5rem;
                font-size: 16px;
                color: #fff;
                background-color: #007bff; /* Primary blue background */
                cursor: pointer;
                transition: background-color 0.2s ease-in-out; /* Smooth transition on hover */
                border-radius: 25px;
                border: 1px solid #212121;
                background: #212121;
                margin-top: 10px;
            }
        }
    `,

    InfoLabel: styled.span`
        color: var(--Rightpoint-Charcoal, #212121);
        font-family: 'Founders Grotesk';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%; /* 24px */
        letter-spacing: -0.4px;
        display: block;
    `,

    InfoMarketingLabel: styled.span`
        color: var(--Rightpoint-Charcoal, #212121);
        font-family: 'Founders Grotesk';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%; /* 19.2px */
        letter-spacing: -0.32px;
    `,

    InfoMarketingCheckbox: styled.input`
        border: 1px solid var(--Rightpoint-Charcoal, #212121);
        background: #fff;
    `,
}
