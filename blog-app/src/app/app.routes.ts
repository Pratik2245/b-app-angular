import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { BlogList } from './blog/blog-list/blog-list';
import { CreateBlog } from './blog/create-blog/create-blog';
import { authGuard } from './guards/auth-guard';
import { BlogDetail } from './blog/blog-detail/blog-detail';

export const routes: Routes = [

    {
        path: '',
        component: Home
    },

    {
        path: 'login',
        component: Login
    },

    {
        path: 'register',
        component: Register,


    },
    {
        path: 'blogs',
        component: BlogList,
        canActivate: [authGuard]
    }, {
        path: "create-blog",
        component: CreateBlog,
        canActivate: [authGuard]
    }, {
        path: 'blog/:id',
        component: BlogDetail,
        canActivate: [authGuard]
    }

];