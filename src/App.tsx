import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Instruction from './components/Instruction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/instruction" element={<Instruction />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
