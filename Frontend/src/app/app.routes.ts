import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: ProductListComponent
            },
            {
                path: 'products/:id',
                loadComponent: () => import('./features/products/components/product-detail/product-detail.component').
                    then(c => c.ProductDetailComponent)
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
