module.exports = (migration) => {
    const getComposePage = () => migration.editContentType('page')
    const page = getComposePage()
    page.editField('content').validations([
        {
            linkContentType: [
                'defaultLayoutContent',
                'pageBlogPost',
                'pageGeneral',
            ],
        },
        {
            relationshipType: ['Composition'],
        },
    ])
}
