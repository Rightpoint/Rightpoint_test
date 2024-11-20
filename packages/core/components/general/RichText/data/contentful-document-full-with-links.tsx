export const contentfulDocumentFullWithLinks = {
    nodeType: 'document',
    data: {},
    content: [
        {
            nodeType: 'heading-1',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Building the technical foundation',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
                    marks: [],
                    data: {},
                },
                {
                    nodeType: 'text',
                    value: 'Ut enim ad minim veniam',
                    marks: [{ type: 'bold' }],
                    data: {},
                },
                {
                    nodeType: 'text',
                    value: ', quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ',
                    marks: [],
                    data: {},
                },
                {
                    nodeType: 'text',
                    value: 'dolore eu fugiat n',
                    marks: [{ type: 'underline' }],
                    data: {},
                },
                {
                    nodeType: 'text',
                    value: 'ulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'heading-2',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'The second heading',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'unordered-list',
            data: {},
            content: [
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Lorem ipsum dolor sit amet, consectetur',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Sed do eiusmod tempor incididunt ',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Ut labore et dolore magna aliqua',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            nodeType: 'blockquote',
            data: {},
            content: [
                {
                    nodeType: 'paragraph',
                    data: {},
                    content: [
                        {
                            nodeType: 'text',
                            value: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ',
                            marks: [],
                            data: {},
                        },
                        {
                            nodeType: 'text',
                            value: 'dolore eu fugiat n',
                            marks: [{ type: 'underline' }],
                            data: {},
                        },
                        {
                            nodeType: 'text',
                            value: 'ulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            marks: [],
                            data: {},
                        },
                    ],
                },
            ],
        },
        {
            nodeType: 'heading-1',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Sometimes, we want ordered lists too',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'ordered-list',
            data: {},
            content: [
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Because it has a number preceding it',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Because it can be referenced by item number',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [{ nodeType: 'text', value: '', marks: [], data: {} }],
        },
        { nodeType: 'hr', data: {}, content: [] },
        {
            nodeType: 'heading-1',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: "Now, let's make sure links work.",
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Linking to entries requires URL resolution unique to the page type linked, and should be robust vs input error.',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'heading-2',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Links differ by page type',
                    marks: [{ type: 'bold' }],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'For example, the Cadillac page type is a Work Detail page, and would have a particular URL signature. ',
                    marks: [],
                    data: {},
                },
                {
                    nodeType: 'text',
                    value: ', Cadillac.',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: "The target entry will have a URL prefix, and with Contentful Compose 2, the slug field isn't guaranteed.",
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'heading-2',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'In other scenarios, the link may be a heading or other element',
                    marks: [{ type: 'bold' }],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'heading-2',
            data: {},
            content: [
                { nodeType: 'text', value: 'Heading 2', marks: [], data: {} },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [{ nodeType: 'text', value: '', marks: [], data: {} }],
        },
        {
            nodeType: 'heading-2',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'The links might also point to invalid entries',
                    marks: [{ type: 'bold' }],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Since the links are to arbitrary Contentful content types, we must make sure they are robust.',
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'unordered-list',
            data: {},
            content: [
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'They may link to missing entries over time',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'They may link to invalid entries due to bad validation or failed migration after validation change.',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Linking to invalid entries is especially likely due to each Rich Text field requiring validation setup.',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            nodeType: 'heading-2',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: "More tests. Make sure links work and don't fail on invalid",
                    marks: [],
                    data: {},
                },
            ],
        },
        {
            nodeType: 'unordered-list',
            data: {},
            content: [
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: '',
                                    marks: [],
                                    data: {},
                                },
                                {
                                    nodeType: 'entry-hyperlink',
                                    data: {
                                        target: {
                                            metadata: { tags: [] },
                                            sys: {
                                                space: {
                                                    sys: {
                                                        type: 'Link',
                                                        linkType: 'Space',
                                                        id: '82nyha70yb5v',
                                                    },
                                                },
                                                id: 'standardPage-2oCkswGRGzA0DcfuCNN1Ck',
                                                type: 'Entry',
                                                createdAt:
                                                    '2022-06-21T20:36:15.729Z',
                                                updatedAt:
                                                    '2022-06-21T21:14:13.144Z',
                                                environment: {
                                                    sys: {
                                                        id: 'compose-migrate',
                                                        type: 'Link',
                                                        linkType: 'Environment',
                                                    },
                                                },
                                                revision: 3,
                                                contentType: {
                                                    sys: {
                                                        type: 'Link',
                                                        linkType: 'ContentType',
                                                        id: 'standardPage',
                                                    },
                                                },
                                                locale: 'en-US',
                                            },
                                            fields: {
                                                internalName: 'Homepage',
                                                pageTitle: 'Homepage',
                                                slug: '/',
                                            },
                                        },
                                    },
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: 'Link in a list item',
                                            marks: [],
                                            data: {},
                                        },
                                    ],
                                },
                                {
                                    nodeType: 'text',
                                    value: '',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },

                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'text',
                                    value: '',
                                    marks: [],
                                    data: {},
                                },
                                {
                                    nodeType: 'entry-hyperlink',
                                    data: {
                                        target: {
                                            metadata: { tags: [] },
                                            sys: {
                                                space: {
                                                    sys: {
                                                        type: 'Link',
                                                        linkType: 'Space',
                                                        id: '82nyha70yb5v',
                                                    },
                                                },
                                                id: '1hQZABgaZgqfnEMiif0jXb',
                                                type: 'Entry',
                                                createdAt:
                                                    '2022-06-25T16:05:35.577Z',
                                                updatedAt:
                                                    '2022-06-25T16:08:08.947Z',
                                                environment: {
                                                    sys: {
                                                        id: 'compose-migrate',
                                                        type: 'Link',
                                                        linkType: 'Environment',
                                                    },
                                                },
                                                revision: 2,
                                                contentType: {
                                                    sys: {
                                                        type: 'Link',
                                                        linkType: 'ContentType',
                                                        id: 'componentWorkDetailText',
                                                    },
                                                },
                                                locale: 'en-US',
                                            },
                                            fields: {
                                                internalName:
                                                    'Work/Cadillac/Contributions',
                                                title: 'Our Contributions',
                                            },
                                        },
                                    },
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: 'Invalid link to a component, which will not resolve',
                                            marks: [],
                                            data: {},
                                        },
                                    ],
                                },
                                {
                                    nodeType: 'text',
                                    value: '',
                                    marks: [],
                                    data: {},
                                },
                            ],
                        },
                    ],
                },
                {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                        {
                            nodeType: 'paragraph',
                            data: {},
                            content: [
                                {
                                    nodeType: 'hyperlink',
                                    data: { uri: '//google.com' },
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: 'Manual link, not by entry',
                                            marks: [],
                                            data: {},
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            nodeType: 'paragraph',
            data: {},
            content: [{ nodeType: 'text', value: '', marks: [], data: {} }],
        },
    ],
}
