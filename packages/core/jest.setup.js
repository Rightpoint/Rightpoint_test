// jest.setup.js
import '@testing-library/jest-dom/extend-expect'

jest.mock('swiper/css', jest.fn())
jest.mock('swiper/css/bundle', jest.fn())

export {}
