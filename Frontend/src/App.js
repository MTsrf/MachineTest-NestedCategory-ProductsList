import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import AddProduct from './Pages/AddProduct';
import ProductsPage from './Pages/ProductsPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductsPage />} />\
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/category' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
