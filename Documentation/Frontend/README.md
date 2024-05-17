# Co2 Reduction (Co2 Runter) Frontend

The project is a redevelopment of the Co2 Runter website project, leveraging modern frontend technologies.

## Technologies

The project takes advantage of the following technologies:

- Vue 3: A progressive framework used for creating user interfaces.
- Vuetify: A Material Design Component Framework for Vue.js.
- Pinia: A library that handles state management for Vue.

## Project Structure

The project structure is organized as follows:

- `src`: Main directory containing the source code of our application.
  - `components`: Stores all Vue components.
  - `store`: Contains the Pinia store files.
  - `routes`: Stores Vue Router route definitions.
  - `types`: Contains TypeScript declarations and interfaces.
  - `plugins`: Contains custom Vue plugins.
  - `layouts`: Contains layout components that can be reused on multiple pages.
  - `constants`: Contains constants used throughout the application.
  - `composables`: Contains reusable functions, also known as Composables, for the Vue Composition API.
  - `assets`: Contains static resources such as images, fonts, and stylesheets.
- `public`: Contains static assets and the entry point HTML file.
- `node_modules`: Stores dependencies installed by npm.

## Design Decisions

- Vue 3 was chosen for being progressive in nature, i.e., it can be embedded into existing projects and scales well for large applications. Also, Vue 3's Composition API plays a crucial role in improving code composability and reusability.
- Vuetify was selected as the UI library as it offers a multitude of predefined stylish and functional components. This saves a lot of development time and ensures UI consistency across the entire application.
- Pinia was chosen for state management due to its excellent integration and optimization with Vue 3, simplicity, and intuitive API, making it an excellent choice for this use case.
- TypeScript was used to create a more strongly typed environment, which helps avoid errors and improve code intelligence.
- Vue Router was used to enable the creation of Single Page Applications (SPA). It allows navigation between pages without requiring a full page refresh, leading to an improved user experience.
- The project adopts a strict folder structure to enhance the clarity and comprehensibility of the code. Each folder has a specific purpose, and the code is organised accordingly.
- Using Composables in Vue 3 allows for better logic reuse and organisation, in comparison to the traditional Options API.
- Using npm enables robust and reliable package management, including managing dependencies and scripts.
