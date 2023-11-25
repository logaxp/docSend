
import './App.css';
import { ToastContainer } from 'react-toastify';
import backgroundImage from './assets/images/bg-image.png';
import AllRoutes from './component/routes/AllRoutes';


function App() {
  return (
    <div className="body-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
      />
        <AllRoutes />
    </div>
  );
}

export default App;
