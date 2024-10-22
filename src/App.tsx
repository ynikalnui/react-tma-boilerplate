import { Routes, Route, Outlet, Router } from "react-router-dom";
import { useMemo } from "react";
import { initNavigator } from "@telegram-apps/sdk-react";
import { useIntegration } from '@telegram-apps/react-router-integration'
import HomePage from "./views/HomePage";
import Footer from "./components/_global/footer";
import Header from "./components/_global/header";

export default function App() {
  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);
  
  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />}/>
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
      <main className="app">
          <Header />

          <div className="app__content">
            <Outlet />
          </div>

          <Footer />
      </main>
  )
}