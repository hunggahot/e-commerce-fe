import './App.scss';
import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './routers/CustomerRouters';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />} />
      </Routes>
    </div>
  );
}

export default App;
