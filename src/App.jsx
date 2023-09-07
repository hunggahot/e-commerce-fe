import './App.scss';
import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './routers/CustomerRouters';
import AdminRouters from './routers/AdminRouters';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />} />
        <Route path="/admin/*" element={<AdminRouters />} />
      </Routes>
    </div>
  );
}

export default App;
