import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';
import css from './App.module.css';

import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage.jsx'));
const AddCarPage = lazy(() => import('../../pages/AddCarPage/AddCarPage.jsx'));
const PhotoCapturePage = lazy(() => import('../../pages/PhotoCapturePage/PhotoCapturePage.jsx'));
const DiagnosticPage = lazy(() => import('../../pages/DiagnosticPage/DiagnosticPage.jsx'));
const RepairPage = lazy(() => import('../../pages/RepairPage/RepairPage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));


export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/add-car" element={<AddCarPage />} />
          <Route path="/car/:carId/photos" element={<PhotoCapturePage />} />
          <Route path="/car/:carId/diagnostics" element={<DiagnosticPage />} />
          <Route path="/car/:carId/repair" element={<RepairPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
