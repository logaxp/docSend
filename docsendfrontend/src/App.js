
import './App.css';
import { ToastContainer } from 'react-toastify';

import AllRoutes from './component/routes/AllRoutes';

function App() {
  return (
    <div className="App">
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
