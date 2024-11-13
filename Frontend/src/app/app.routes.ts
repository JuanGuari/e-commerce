import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ProductListComponent } from './features/products/product-list/product-list.component';

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
                path: 'product/:id',
                loadComponent: () => import('./features/products/product-detail/product-detail.component').
                    then(c => c.ProductDetailComponent),
                // canActivate: [AuthGuard] 
            },
            {
                path: 'order',
                loadComponent: () => import('./features/orders/order-view/order-view.component').
                    then(c => c.OrderViewComponent),
                canActivate: [AuthGuard] 
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
