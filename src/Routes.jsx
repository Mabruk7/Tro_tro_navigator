import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import RouteSearchMapInterface from './pages/route-search-map-interface';
import UserRegistration from './pages/user-registration';
import RouteDetailsNavigation from './pages/route-details-navigation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<RouteDetailsNavigation />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/route-search-map-interface" element={<RouteSearchMapInterface />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/route-details-navigation" element={<RouteDetailsNavigation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
