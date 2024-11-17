

# One Store Dashboard

A modern admin dashboard for e-commerce management built with **React**, **Vite**, **TypeScript**, **Material UI (MUI)**, **Redux**, and **Redux Toolkit**. This project provides a clean and responsive user interface for managing store data, viewing analytics, and handling various admin tasks.

## Live Demo

You can view the live demo of the One Store Dashboard here:  
[One Store Dashboard Live Demo](https://one-store-dashboard.vercel.app/)

## Features

- **React** for building reusable UI components.
- **Vite** for fast development and optimized bundling.
- **TypeScript** for static typing and improved development experience.
- **Material UI (MUI)** for a comprehensive set of pre-designed UI components.
- **Redux** and **Redux Toolkit** for state management across the application.
- **Responsive Design** optimized for mobile, tablet, and desktop devices.
- Customizable charts, tables, and components for e-commerce store management.

## Folder Structure

```
├── components/            # Reusable UI components (Buttons, Cards, Forms, etc.)
├── pages/                 # Different pages of the dashboard (Home, Settings, etc.)
├── store/                 # Redux store, actions, reducers (with Redux Toolkit)
├── src/                   # Main source files for components, pages, etc.
├── vite.config.ts         # Vite configuration
├── package.json           # Project dependencies and scripts
├── .gitignore             # Git ignore file
├── .env.example           # Example environment variables file
└── README.md              # Project README (this file)
```

## Installation

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/mdmominul-310/one-store-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd one-store-dashboard
   ```

3. Set up the environment variables:
   - Copy the `.env.example` file and rename it to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and configure any necessary environment variables. These may include API endpoints, authentication tokens, or other configuration settings.

4. Install dependencies:
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

5. Run the development server:
   Using npm:
   ```bash
   npm run dev
   ```
   Or using yarn:
   ```bash
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the app.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation, fast build tool for modern web development.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Material UI (MUI)**: A popular React UI framework for building sleek and customizable UIs.
- **Redux Toolkit**: A set of tools to simplify Redux development, including state management, slices, and thunks.
- **React Router**: For navigation and routing between different pages of the dashboard.
- **Axios**: For making HTTP requests to interact with backend APIs (if applicable).
- **Chart.js**: For displaying customizable charts and graphs (if applicable).

## Redux Store

This dashboard utilizes **Redux Toolkit** for managing the global state. The `store/` directory contains:
- **Slices**: Manage different pieces of state such as user data, dashboard statistics, and settings.
- **Reducers**: Handle state changes in response to actions.

You can find the configuration for the Redux store in the `store/` folder, where each slice is typically defined in its own file.

### Example Redux Slice (`store/dashboardSlice.ts`):

```ts
import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  userCount: number;
  totalSales: number;
}

const initialState: DashboardState = {
  userCount: 0,
  totalSales: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUserCount(state, action) {
      state.userCount = action.payload;
    },
    setTotalSales(state, action) {
      state.totalSales = action.payload;
    },
  },
});

export const { setUserCount, setTotalSales } = dashboardSlice.actions;

export default dashboardSlice.reducer;
```

## Material UI (MUI)

The app uses **Material UI (MUI)** components to build out the dashboard layout, tables, charts, and UI elements. You can customize MUI components with a theme or use built-in components like `Button`, `Card`, `Typography`, `Table`, etc., for rapid UI development.

You can find the theme configuration (if applicable) in the `src/theme/` folder, which allows you to tweak colors, typography, and other UI settings globally.

## Contributing

If you’d like to contribute to the project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

We welcome contributions and will review pull requests as soon as possible!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next-generation, fast build tool for modern web development
- [Material UI](https://mui.com/) - A design system and UI framework for React
- [Redux Toolkit](https://redux-toolkit.js.org/) - Simplified Redux state management
- [Chart.js](https://www.chartjs.org/) - For creating beautiful and responsive charts
- [Vercel](https://vercel.com/) - For hosting the live application

---

