import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Editor from './pages/Editor';
import 'antd/dist/antd.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
