import { Navigate, Route, Router, Routes } from 'react-router-dom';
import DiagnosticPage from '../../pages/DiagnosticPage/DiagnosticPage.jsx';
import LoginPage from '../../pages/LoginPage/LoginPage.jsx';
import MainPage from '../../pages/MainPage/MainPage.jsx';
import PhotoCapturePage from '../../pages/PhotoCapturePage/PhotoCapturePage.jsx';
import Layout from '../Layout/Layout.jsx';
import css from './App.module.css';
import TopPart from '../topPart/topPart.jsx';
import CalendarPart from '../MainScreenSection/CalendarPart/CalendarPart.jsx';
import SubcategoriesPart from '../DiagnosticScreen/SubcategoriesPart/SubcategoriesPart.jsx';

const array1 = [
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
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '35000',
  },
  {
    time: '12:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '3000',
  },
  {
    time: '12:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2020 VW Polo',
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
    salary: '8482',
  },
];

const array2 = [
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

export default function App() {
  const wage = array2.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const possibleSum = array1.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const amountPossible = wage + possibleSum;

  return (
    <Layout>
      <TopPart wage={wage} amountPossible={amountPossible} />
      <CalendarPart />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/main"
          element={<MainPage array1={array1} array2={array2} wage={wage} />}
        />
        <Route path="/car/:carId/photos" element={<PhotoCapturePage />} />
        <Route path="/car/:carId/diagnostics" element={<DiagnosticPage />}>
          {/* <Route
            path="diagnostics-subcategories"
            element={<SubcategoriesPart />}
          />
          <Route path="diagnostics-spares" element={''} /> */}
        </Route>
      </Routes>
    </Layout>
  );
}
