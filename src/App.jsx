import React from 'react';
import Header from './components/Header/Header' ;
import GridGlows from './components/GridGlows/GridGlows';
import Hero from './components/Hero/Hero';
import './index.css'; 

function App() {
  return (
    <div className="app">
      {/* Шапка сайта */}
      <Header />
      
      {/* Анимированные блики на фоне */}
      <GridGlows spawnRate={0.012} />

      {/* Основное содержимое */}
      <main className="main-content">
        <Hero />
        {/* Другие секции можно добавлять здесь */}
      </main>
      
      {/* Подвал можно добавить позже */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;