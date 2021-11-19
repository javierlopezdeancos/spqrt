import React from 'react';
import logo  from './logo.png';
import './App.css';
import { OrganizationChart } from './organization/OrganizationChart.component';
import { OrganizationProvider } from './organization/organization.context';

function App() {
  return (
    <div className="spqrt-app">
      <header className="spqrt-header">
        <img src={logo} alt="Logo" width="200px"/>
        <h1>Quintili Vare, legiones redde!!</h1>
      </header>
      <main className="spqrt-main">
          <OrganizationProvider>
            <OrganizationChart />
          </OrganizationProvider>
      </main>
    </div>
  );
}

export default App;
