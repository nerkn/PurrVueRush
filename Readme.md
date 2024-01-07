# PurrVueRush

Categorized product with image app.

## Description

PurrVueRush is a modern web application built using Fastify, Prisma, and Vue. It features a powerful recursive category system and supports products with images, providing a flexible and user-friendly experience for managing and showcasing items.

**Key Features**

`Recursive Category System`: Easily organize your products with a hierarchical category structure that supports unlimited nesting. This allows for a logical and intuitive organization of your product catalog.

`Product Management with Images`: Upload and display product images, giving your users a visual representation of the items. Manage product details, including descriptions, prices, and other relevant information.

`Fast and Efficient Backend with Fastify`: The backend is powered by Fastify, a high-performance web framework for Node.js. This ensures speedy responses and a smooth user experience.

`Persistance with Prisma`: Utilize Prisma as the database ORM to interact with MySql seamlessly. Take advantage of its features for efficient data handling and manipulation.

`Responsive and Dynamic Frontend with Vue`: The frontend is built with Vue.js, providing a dynamic and responsive user interface. Benefit from Vue's reactivity and component-based architecture for a modern and interactive web experience.

`General Category Store`: Centralized category management is build with most recent state management with pinia.

## Technologies Used

- Fastify
- Prisma
- Zod
- MySql
- Vue 3.4
- Pinia
- Vanilla Css
- Docker-compose

## Features

- Recursive category system
- Products with images

## Installation Docker `recommended`

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nerkn/PurrVueRush.git
   cd PurrVueRush
   ```

2. **Run docker:**

   ```bash
   docker-compose up
   ```

3. **Access the PurrVueRush:**

   Open your browser and visit [http://localhost](http://localhost) .

## Installation Git clone

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nerkn/PurrVueRush.git
   cd your-app
   ```

2. **Install Dependencies:**

   ```bash
   # Install server dependencies
   cd fast
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Database Setup:**

   - Set up your database configuration in the `fast/.env` file.
   - Run migrations:

     ```bash
     cd fast
     npx prisma migrate dev
     ```

4. **Start the Server and Client:**

   - Start the Fastify server:

     ```bash
     cd fast
     npm run start
     ```

   - Start the Vue development server:

     ```bash
     cd frontend
     npm run serve
     ```

5. **Access the PurrVueRush:**

   Open your browser and visit [http://localhost:3053](http://localhost:3053) .

## Configuration

- PurrVueRush uses Mysql backend with generic sql setup so switching databases should not create problem.
- Prisma requires to have 2 databases, first is main, and second is for migrations, called shadow database.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).

## Architecture

Our application has been built using a monolithic architecture. While monolithic architectures have proven effective, It can be cumbursome if complexity increases. Microservices enable scalability, maintainability, and flexibility by breaking down the application into smaller, independently deployable services. It is advantageous for handling different functionalities in isolation, facilitating more straightforward updates and scaling of specific components without impacting the entire system. Another architectural consideration is the adoption of a slice architecture, organizing the system into horizontal slices, each responsible for specific features or business capabilities. Although these approaches bring valuable advantages, it's essential to assess whether the complexity they introduce aligns with the specific needs and scale of our application.

Clean architecture however, would be overkill in this scenario, particularly if the application's size and requirements are well-suited for a monolithic design.

## Acknowledgments

Thanks for MidJourney for providing test images.
Thanks for Unsplach for providing real images and hosting them.
