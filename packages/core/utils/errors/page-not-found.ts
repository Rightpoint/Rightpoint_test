/**
 * Throw this error when a page isn't found from a mapper.
 */
export class PageNotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'PageNotFoundError'
    }
}
