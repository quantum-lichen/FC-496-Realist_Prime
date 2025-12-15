import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Architecture } from './components/Architecture';
import { SimulationLab } from './components/SimulationLab';
import { Documentation } from './components/Documentation';
import { NavItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavItem>(NavItem.OVERVIEW);

  const renderView = () => {
    switch (currentView) {
      case NavItem.OVERVIEW:
        return <Hero onNavigate={setCurrentView} />;
      case NavItem.ARCHITECTURE:
        return <Architecture />;
      case NavItem.SIMULATION:
        return <SimulationLab />;
      case NavItem.DOCS:
        return <Documentation />;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;