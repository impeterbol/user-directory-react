import React from 'react';
import logo from './logo.svg';
import './App.css';

// const people = [
//   "1User",
//   "12User",
//   "14User",
//   "15User",
//   "16User",
//   "17User",
//   "18User"
// ];


// function App() {
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [searchResults, setSearchResults] = React.useState([]);
//   const handleChange = event => {
//     setSearchTerm(event.target.value);
//   };


function App() {
  const [state, setState] = React.useState({
    results: [],
    filtered: [],
    search: ''
  });

  // React.useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  // api call
  React.useEffect(()=>{
    const fetchAPI = async () => {
      const res = await fetch('https://randomuser.me/api/?results=20')
      const data = await res.json();
      console.log(data);
      const mapped = data.results.map(p => ({
        firstName: p.name.first,
        lastName: p.name.last,
        email: p.email,
        img: p.picture.thumbnail,
        dob: p.dob.date,
        idP: p.id.value
      }))
      setState(state => ({...state, results: mapped, filtered: mapped }))
    }
    fetchAPI()
  }, [])



  React.useEffect(()=>{
    console.time("some")
    setState(state => ({
      ...state,
      // filtered: state.results.filter(p => Object.values(p).some(p => p.toLowerCase().includes(state.search.toLowerCase())))
      // this method on line 41 is slowe a bit than method on 43-44 and is faster than method on 49-53; all 3 methods are the same
      filtered: state.results.filter(p => {
        return Object.values(p).join("").toLowerCase().includes(state.search.toLowerCase())
      })
    }))
    console.timeEnd("some")
    // console.dir(console)
        // filtered: state.results.filter(p => {
        //   let isFirst = p.firstName.toLowerCase().includes(state.search.toLowerCase())
        //   let isLast = p.lastName.toLowerCase().includes(state.search.toLowerCase())
        //   return isFirst || isLast
        // })
  }, [state.search])




  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value
    })
  };


  // React.useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);


  // }, [searchTerm]);


  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        name="search"
        value={state.search}
        onChange={handleChange}
      />

  
      <ul>
        {state.filtered.map(p => (
          <li key={p.idP}>{p.firstName} {p.lastName} {p.email} {p.dob}</li>
        ))}
      </ul>

 
    </div>



  );
}

//   return (
//     <div className="App">
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={handleChange}
//       />
//       <ul>
//         {searchResults.map(item => (
//           <li>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;