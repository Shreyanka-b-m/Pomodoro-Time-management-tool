import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar/Navbar';
import Description from './components/Description/Description';
import SelectTab from './components/SelectTab/SelectTab';
import TimeCard from './components/TimerContainer/TimeCard';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Navbar />
        <Description />
        <SelectTab />
        <TimeCard />
      </div>
    </Provider>
  );
};

export default App;