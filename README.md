# Food Delivery Orders - Dashboard Analítico

Dashboard interactivo desarrollado con **React**, **TypeScript** y **Firebase Realtime Database** para visualizar y analizar métricas operativas de pedidos de comida a domicilio (volumen de pedidos, tiempos de entrega, cancelaciones, satisfacción del cliente, métodos de pago y condiciones de clima y tráfico).

**Demo en vivo:** [https://romeroabraham.github.io/Proyecto03-Dashboard/](https://romeroabraham.github.io/Proyecto03-Dashboard/)

---

## Autores
* **María Belén Alay Méndez**
* **Abraham Smith Romero Rondón**  
*Escuela Superior Politécnica del Litoral (ESPOL) – Desarrollo de Aplicaciones Web y Móviles (SOFG1006)*

---

## Tecnologías utilizadas

* **React + TypeScript:** Construcción de la interfaz modular y tipado estático de propiedades e interfaces.
* **Vite:** Entorno de desarrollo y empaquetado para producción.
* **Material UI (MUI):** Diseño responsivo mediante sistema de cuadrícula (`Grid`), tarjetas, tablas y menú móvil (`Drawer`).
* **MUI X Charts:** Visualización de gráficos estadísticos interactivos (`LineChart`).
* **Firebase Realtime Database:** Almacenamiento en la nube y consulta asíncrona de los registros.
* **GitHub Pages (`gh-pages`):** Despliegue y alojamiento de la aplicación web.

---

## Dataset

* **Fuente:** [Food Delivery Orders & ETA Logistics Dataset (Kaggle)](https://www.kaggle.com/datasets/razanihababdellatif/food-delivery-orders-and-eta-logistics-dataset)
* **Formato original:** CSV (`50.000` registros y `37` variables).
* **Licencia:** Creative Commons Attribution 4.0 (CC BY 4.0).

El archivo original se transformó a formato JSON mediante [CSVJSON](https://csvjson.com/). Para optimizar los tiempos de carga y respuesta en el navegador, se importó en Firebase una muestra representativa de **500 registros** conservando la estructura original de sus 37 campos.

---

## Funcionalidades del dashboard

* **Filtros dinámicos:** Filtrado en tiempo real por ciudad (`City_A`, `City_B`, `City_C`, `City_D`) y rango de fechas.
* **Indicadores clave (KPIs):** Total de pedidos filtrados, tiempo promedio de entrega y porcentaje de cancelaciones.
* **Satisfacción del cliente:** Indicador semicircular calculado a partir de las calificaciones de los usuarios.
* **Distribución de métodos de pago:** Comparativa porcentual destacando el método más utilizado.
* **Pedidos por hora:** Gráfico de área/líneas con desplazamiento horizontal adaptado para dispositivos móviles.
* **Desempeño de las entregas:** Distribución por rangos de tiempo de entrega e indicadores de clima y tráfico más frecuentes.
* **Detalle de pedidos:** Tabla interactiva con desplazamiento vertical y horizontal para consultar ID, ciudad, distancia, tiempo y estado.

---

## Estructura del proyecto

```text
Proyecto03-Dashboard/
├── data/                  # Dataset original en CSV y archivo transformado en JSON
├── public/                # Recursos estáticos
└── src/
    ├── components/        # Componentes reutilizables (Header, SidebarNav, KpiCard, AnalyticsWidgets, OrdersDataTable)
    ├── firebase/          # Configuración e inicialización de Firebase
    ├── hooks/             # Hook personalizado useFetchData (useState + useEffect)
    ├── services/          # Servicio de consulta a Firebase Realtime Database
    ├── types/             # Interfaces TypeScript (Order)
    └── App.tsx            # Contenedor principal, estado de filtros y cálculo de métricas