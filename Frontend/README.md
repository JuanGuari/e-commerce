# E-Commerce Frontend

Sistema básico de gestión de productos y órdenes para un e-commerce

## Requisitos Previos

- Node.js (versión 20.11.1)
- Angular CLI (versión 18)

## Instalación

- Clonar el repositorio
  https://github.com/JuanGuari/e-commerce.git

- Navegar al directorio del proyecto
  `cd Frontend'`

- Restaurar las dependencias
  Ejecutar `npm i`

## Estructura del proyecto
- **/app/auth**: Contiene componentes y servicios de autenticación, incluyendo guards para proteger rutas.
- **/app/core**: Servicios y componentes reutilizables en toda la aplicación, como interceptores HTTP y modelos compartidos.
- **/app/features**: Contiene funcionalidades principales, como `products` y `orders`.
- **/app/shared**: Componentes reutilizables en toda la aplicación.
- **/app/layouts**: Contiene componentes de layout, como headers, footers, sidebars y otros elementos de diseño que se utilizan en varias páginas o secciones de la aplicación.
- **/app/pages**: Contiene las páginas principales de la aplicación, como la página de inicio, la página de productos y otras vistas importantes. Cada página suele agrupar componentes específicos para esa vista.
- **/assets**: Archivos estáticos.
- **/environments**: Configuración para entornos de desarrollo y producción.



## Configuraciones

Se debe configurar la url de la api en los archivos environments

## Ejecutar el proyecto
```ng serve```

## Contribuciones

Nomenclatura commits: 
- feat: "mensaje" 
- fix:"" 
- improvement:""

#### Actualizar el README a medida que el proyecto evoluciona.