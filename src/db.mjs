const users = [
    {
        id: '1',
        name: 'Tarik',
        email: 'tarik@example.com',
    },
    {
        id: '2',
        name: 'Sarah',
        email: 'Sarah@example.com',
    },
    {
        id: '3',
        name: 'Jihane',
        email: 'jihane@example.com',
    },
]

const posts = [
    {
        id: '16516',
        title: 'First Article',
        content: 'In labore culpa excepteur ut non. Pariatur Lorem adipisicing eiusmod consectetur eiusmod reprehenderit. Deserunt in aliqua commodo enim nulla culpa. Enim aliquip irure laborum tempor ullamco esse nisi sint.',
        snippet: 'Amet ad sunt occaecat et ex quis.',
        published: false,
        author: '1'
    },
    {
        id: '16518',
        title: 'Second Article',
        content: 'In labore culpa excepteur ut non. Pariatur Lorem adipisicing eiusmod consectetur eiusmod reprehenderit. Deserunt in aliqua commodo enim nulla culpa. Enim aliquip irure laborum tempor ullamco esse nisi sint.',
        snippet: 'Amet ad sunt occaecat et ex quis.',
        published: true,
        author: '3'
    },
    {
        id: '16519',
        title: 'Third Article',
        content: 'In labore culpa excepteur ut non. Pariatur Lorem adipisicing eiusmod consectetur eiusmod reprehenderit. Deserunt in aliqua commodo enim nulla culpa. Enim aliquip irure laborum tempor ullamco esse nisi sint.',
        snippet: 'Sint est aliqua pariatur enim ea et.',
        published: true,
        author: '3'
    },
]

const comments = [
    {
        id: '101',
        text: 'Best article',
        author: '1',
        post: '16516'
    },
    {
        id: '102',
        text: 'Best article two',
        author: '1',
        post: '16516'
    },
    {
        id: '103',
        text: 'Best article three',
        author: '1',
        post: '16516'
    },
]

const db = {
    users,
    posts,
    comments
}

export { db as default }