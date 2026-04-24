import {Blog} from "../blog/types/blog";
import {Post} from "../post/types/post";

export const db = {
    blogs: <Blog[]>[
        {
            id: '1',
            name: 'blog1',
            description: 'asasdfgag',
            websiteUrl: 'blog@gmail.com'
        }
    ],
    posts: <Post[]>[]
}