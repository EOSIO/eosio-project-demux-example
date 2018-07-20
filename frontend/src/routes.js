// Import Layouts
import Base from './Base'

// Import Pages
import Posts from './Posts'
import Post from './Post'
import NotFound from './NotFound'

// A route config is just a data object passed into <Route> component.
export default [
  { component: Base,
    routes: [
      {
        path: '/',
        component: Base,
        routes: [
          {
            path: '/',
            exact: true,
            component: Posts,
            name: 'Posts',
          },
          {
            path: '/posts/:id',
            component: Post,
            name: 'Post',
          },
          {
            component: NotFound,
            name: 'Not Found',
          },
        ],
      },
    ]
  },
]
