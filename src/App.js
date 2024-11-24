import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './components/Pages/ListPage';
import CreatePage from './components/Pages/CreatePage';  // CreatePage 임포트
import UpdatePage from './components/Pages/UpdatePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} /> {/* /create 라우팅 설정 */}
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
