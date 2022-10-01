import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {About} from './components/About'
import Users from './components/Users'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
