import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';
import css from './App.module.css';
import TopPart from '../topPart/topPart.jsx';
import CalendarPart from '../MainScreenSection/CalendarPart/CalendarPart.jsx';
import SubcategoriesPart from '../DiagnosticScreen/SubcategoriesPart/SubcategoriesPart.jsx';

const array1 = [
  {
    time: '00:10',
    carModel: '2001 MITSUBISHI OUTLANDER',
    problem: 'Стукає сперeду справа',
    salary: '123456',
    sparesStatus: '',
  },
  {
    time: '00:20',
    carModel: '2001 MITSUBISHI OUTLANDER',
    problem: 'Стукає сперeду справа',
    salary: '1234',
    sparesStatus: 'received',
  },
  {
    time: '12:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '35000',
    sparesStatus: 'ordered',
  },
  {
    time: '12:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '3000',
    sparesStatus: 'ordered',
  },
  {
    time: '12:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
    sparesStatus: '',
  },
  {
    time: '12:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
    sparesStatus: 'received',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
    sparesStatus: 'ordered',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '8482',
    sparesStatus: 'received',
  },
];

const array2 = [
  {
    time: '12:00',
    carModel: '2001 VOLKSWAGEN PASSAT',
    problem: 'Стукає сперeду справа',
    salary: '12400',
  },
  {
    time: '12:00',
    carModel: '2001 MITSUBISHI OUTLANDER',
    problem: 'Проблеми з автоматичною коробкою передач',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
];

import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage.jsx'));
const AddCarPage = lazy(() => import('../../pages/AddCarPage/AddCarPage.jsx'));
const PhotoCapturePage = lazy(() =>
  import('../../pages/PhotoCapturePage/PhotoCapturePage.jsx')
);
const DiagnosticPage = lazy(() =>
  import('../../pages/DiagnosticPage/DiagnosticPage.jsx')
);
const RepairPage = lazy(() => import('../../pages/RepairPage/RepairPage.jsx'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage.jsx')
);

export default function App() {
  const location = useLocation();
  const wage = array2.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const possibleSum = array1.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const amountPossible = wage + possibleSum;

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        {location.pathname !== '/login' && location.pathname !== '/' && (
          <TopPart wage={wage} amountPossible={amountPossible} />
        )}
        {location.pathname !== '/login' && location.pathname !== '/' && (
          <CalendarPart />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/main"
            element={<MainPage array1={array1} array2={array2} wage={wage} />}
          />
          <Route path="/add-car" element={<AddCarPage />} />
          <Route path="/car/:carId/photos" element={<PhotoCapturePage />} />
          <Route path="/car/:carId/diagnostics" element={<DiagnosticPage />} />
          <Route path="/car/:carId/repair" element={<RepairPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route
            path="diagnostics-subcategories"
            element={<SubcategoriesPart />}
          />
          <Route path="diagnostics-spares" element={''} /> */}
        </Routes>
      </Suspense>
    </Layout>
  );
}
