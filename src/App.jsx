import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';
import AuthRedirectHandler from './components/AuthRedirectHandler';
import './index.css';

function App() {
  return (
    <AuthRedirectHandler>
      <div className="app">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
        <GoToTopButton />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthRedirectHandler>
  );
}

export default App;
