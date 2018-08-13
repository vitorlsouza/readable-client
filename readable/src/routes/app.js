import Categories from '../pages/Categories';
import Posts from '../pages/Posts';
import Category from '../pages/Category';
import Home from '../pages/Home';
import NewPost from '../pages/NewPost';
import Post from '../pages/Post';


const appRoutes = [
    { path: "/categories", name: "Categories", icon: "pe-7s-note2", component: Categories },
    { path: "/posts", name: "Posts", icon: "pe-7s-news-paper", component: Posts },
    { path: "/newPost", name: "New Post", icon: "pe-7s-news-paper", component: NewPost },
    { path: "/:category", name: "Category", icon: "pe-7s-news-paper", component: Category },
    { path: "/:category/:post_id", name: "Post", icon: "pe-7s-news-paper", component: Post },
    { path: "/", name: "Home", icon: "pe-7s-news-paper", component: Home },
];

export default appRoutes;
