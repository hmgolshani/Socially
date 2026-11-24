import { Route, Routes } from "react-router";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import NotificationPage from "@/pages/NotificationPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Layout from "@/components/layouts/Layout.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="profile/:username" element={<ProfilePage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;