export const zIndexes = {
    /**
     * The sticky navbar _must_ be higher than the navbar popup
     */
    stickyNavbar: 50,
    navbarPopupModal: 25,
    navbarPopup: 20,

    /**
     * The generic modal should be higher than the navbar popup
     */
    modal: 80,

    stickyNavigationBar: 20,
    /**
     * The cursor should be above everything
     */
    cursor: 100,
    footer: 0, // new modal portal requires this to be 0. if you change this, make sure to test the navbar popup modal

    /**
     * @deprecated - old navbar
     */
    navbarPreviewIframe: 60,

    /**
     * @deprecated - old bg color component
     */
    backgroundColorContent: 7,

    /**
     * @deprecated - old bg component
     */
    backgroundOccluder: 5,
}
