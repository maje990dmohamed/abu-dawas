import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import LoggedInLayout from "../components/layouts/LoggedInLayout";

const RoutesHandler = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<LoggedInLayout />}>
          {routes.map(({ id, query, component: Component }) => (
            <Route key={id} path={query} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesHandler;
