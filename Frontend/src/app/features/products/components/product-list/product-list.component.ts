import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  productos: any[] = [
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 1',
      precio: 1000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 2',
      precio: 2000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 3',
      precio: 3000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 1',
      precio: 1000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 2',
      precio: 2000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 3',
      precio: 3000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 1',
      precio: 1000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 2',
      precio: 2000
    },
    {
      imagen: 'https://via.placeholder.com/150',
      nombre: 'Producto 3',
      precio: 3000
    },
  ];

}
