import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [state, setState] = React.useState({
    results: [],
    filtered: [],
    search: ''
  });
  
  React.useEffect(()=>{
    const fetchAPI = async () => {
      const res = await fetch('https://randomuser.me/api/?results=20')
      const data = await res.json();
      const mapped = data.results.map(p => ({
        firstName: p.name.first,
        lastName: p.name.last,
        email: p.email,
        img: p.picture.thumbnail,
        dob: p.dob.date
      }))
      setState(state => ({...state, results: mapped, filtered: mapped }))
    }
    fetchAPI()
  }, [])

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;