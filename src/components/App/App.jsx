import { Navigate, Route, Router, Routes } from 'react-router-dom';
import DiagnosticPage from '../../pages/DiagnosticPage/DiagnosticPage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import MainPage from '../../pages/MainPage/MainPage.jsx';
import PhotoCapturePage from '../../pages/PhotoCapturePage/PhotoCapturePage.jsx';
import Layout from '../Layout/Layout.jsx';
import css from './App.module.css';

export default function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/car/:carId/photos" element={<PhotoCapturePage />} />
          <Route path="/car/:carId/diagnostics" element={<DiagnosticPage />} />
        </Routes>
    </Layout>
  );
}
