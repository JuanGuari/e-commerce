# E-Commerce Backend
Sistema básico de gestión de productos y órdenes para un e-commerce

## Requisitos Previos
- Visual Studio 2022
- .NET SDK 8.0 o superior
- Microsoft SQL Server 2022

## Instalación
- Clonar el repositorio
https://github.com/JuanGuari/e-commerce.git

- Navegar al directorio del proyecto
```cd Backend'```

- Restaurar las dependencias
Ejecutar ```dotnet restore```

## Configuraciones

En el appsettings.json configurar:

```"conexionDB": "Configuración propia"```

Si se desea cambiar la clave es necesario respetar la longitud
```Jwt":```
 ```   "Key": "clave"```

## Ejecutar el proyecto
```dotnet run```

## Ejecutar las pruebas
```dotnet test```

## Arquitectura del proyecto:
- WebAPP: Capa de presentación que expone los endpoints de la API para interacción con el frontend.
- Application: Contiene la lógica de negocio y casos de uso de alto nivel, coordinando las operaciones entre Domain e Infrastructure.
- Domain: Núcleo de la aplicación, donde residen las entidades, objetos de valor y reglas de negocio.
- Infrastructure: Implementa el acceso a datos y servicios externos, manejando detalles técnicos.
- Core: Funcionalidades y utilidades compartidas, accesibles desde cualquier capa.


## Contribuciones

Nomenclatura commits: 
- feat: "mensaje" 
- fix:"" 
- improvement:""

#### Actualizar el README a medida que el proyecto evoluciona.

# Anexos

## Diagrama de base de datos
![alt text](<diagrama de clases.png>)
## Arquitectura en la que se baso este proyecto

![alt text](Arquitectura.jpg)

### By: Juan Pablo Guari