import React from 'react';
import Header from './components/Header/Header' ;
import './index.css'; 

function App() {
  return (
    <div className="app">
      {/* Шапка сайта */}
      <Header />
      
      {/* Основное содержимое */}
      <main className="main-content">
        {/* Другие секции можно добавлять здесь */}
      </main>
      
      {/* Подвал можно добавить позже */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;