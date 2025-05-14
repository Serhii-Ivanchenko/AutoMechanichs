import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';
import css from './App.module.css';
import TopPart from '../TopPart/TopPart.jsx';
import CalendarPart from '../MainScreenSection/CalendarPart/CalendarPart.jsx';
import SubcategoriesPart from '../DiagnosticScreen/SubcategoriesPart/SubcategoriesPart.jsx';
import { lazy, Suspense, useEffect, useState } from 'react';
import LoaderSvg from '../Loader/LoaderSvg.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectLoading,
} from '../../redux/auth/selectors.js';
import { refreshUser } from '../../redux/auth/operations.js';
import RestrictedRoute from '../RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute.jsx';
import { getAllCars } from '../../redux/cars/operations.js';
// import { selectChosenDay } from '../../redux/cars/selectors.js';

const array1 = [
  {
    time: '00:10',
    carModel: '2001 MITSUBISHI OUTLANDER',
    problem: 'Стукає сперeду справа',
    salary: '123456',
    sparesStatus: '',
    status: 'diagnostic',
  },
  {
    time: '00:20',
    carModel: '2001 MITSUBISHI OUTLANDER',
    problem: 'Стукає сперeду справа',
    salary: '1234',
    sparesStatus: 'received',
    status: 'repair',
  },
  {
    time: '18:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '35000',
    sparesStatus: 'ordered',
    status: 'repair',
  },
  {
    time: '20:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '3000',
    sparesStatus: 'ordered',
    status: 'diagnostic',
  },
  {
    time: '21:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
    sparesStatus: '',
    status: 'diagnostic',
  },
  {
    time: '09:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
    sparesStatus: 'received',
    status: 'diagnostic',
  },
  {
    time: '08:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
    sparesStatus: 'ordered',
    status: 'repair',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '8482',
    sparesStatus: 'received',
    status: 'diagnostic',
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
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const [isAuthChecked, setIsAuthChecked] = useState(false);
  const location = useLocation();
  console.log('isLoggedIn', isLoggedIn);
  console.log('isRefreshing', isRefreshing);
  // console.log('isAuthChecked', isAuthChecked);
  console.log('isLoading', isLoading);

  useEffect(() => {
    const refreshUserData = async () => {
      await dispatch(refreshUser());
      // setIsAuthChecked(true);
    };
    refreshUserData();
  }, [dispatch]);

  // const day = useSelector(selectChosenDay);
  // console.log('day', day);

  // useEffect(() => {
  //   const data = {
  //     date: day,
  //     mechanic_id: 1,
  //   };
  //   console.log('data', data);

  //   dispatch(getAllCars(data));
  // }, [dispatch, day]);

  const wage = array2.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const possibleSum = array1.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const amountPossible = wage + possibleSum;

  return (
    <Layout>
      {isLoading || isRefreshing ? (
        // || !isAuthChecked
        <LoaderSvg />
      ) : (
        <Suspense fallback={<LoaderSvg />}>
          {location.pathname !== '/login' &&
            location.pathname !== '/' &&
            !isLoading &&
            !isRefreshing && (
              <TopPart wage={wage} amountPossible={amountPossible} />
            )}
          {location.pathname === '/main' && !isLoading && !isRefreshing && (
            <CalendarPart />
          )}
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to={'/main'} replace /> : <LoginPage />
              }
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LoginPage />} />}
            />
            <Route
              path="/main"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={
                    <MainPage array1={array1} array2={array2} wage={wage} />
                  }
                />
              }
            />
            <Route
              path="/add-car"
              element={
                <PrivateRoute redirectTo="/login" component={<AddCarPage />} />
              }
            />
            <Route
              path="/car/:carId/photos"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<PhotoCapturePage />}
                />
              }
            />
            <Route
              path="/car/:carId/diagnostics"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<DiagnosticPage />}
                />
              }
            />
            <Route
              path="/car/:carId/repair"
              element={
                <PrivateRoute redirectTo="/login" component={<RepairPage />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route
            path="diagnostics-subcategories"
            element={<SubcategoriesPart />}
          />
          <Route path="diagnostics-spares" element={''} /> */}
          </Routes>
        </Suspense>
      )}
    </Layout>
  );
}
