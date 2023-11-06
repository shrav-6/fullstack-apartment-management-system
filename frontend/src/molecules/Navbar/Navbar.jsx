import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FuzzySearch from 'react-fuzzy';

export default function Navbar() {
  const list = [
    {
      id: 1,
      description: "abc, ABC"
    },
    {
      id: 1,
      description: "Xyz, xyz"
    }
  ];
  const { pathname } = useLocation();
  // const SearchBar = ({query}) => (
  //   <form>
  //     <TextField>
  //       onInput{(input) => {
  //         setQuery(input.target.value);
  //       }}
  //       placeholder="Search .."
  //     </TextField>
  //     <IconButton type = "submit">
  //       <SearchIcon style={{fill: "blue"}} />
  //     </IconButton>
  //   </form>
  // )
  // const filterData = (query, dataList) => {
  //   if (query === "") {
  //     return dataList;
  //   } else {
  //     return dataList.filter((data) => {data.description.includes(query)});
  //   }
  // }

  const openApartmentListing = () => {
    console.log("Listing to be opened!");
  } 

  if (pathname === '/' || pathname === '/signup' || pathname === '/signin') {
    return (
      <nav className="nav">
        <Link to="/" className="title">
          SHELTER
        </Link>
      </nav>
    );
  }
  return (
    <nav className="nav">
      <Link to="/home" className="title">
        <span className="navbar-title">SHELTER</span>
      </Link>

      <FuzzySearch
        list = {list}
        keys = {["description"]}
        width = {430}
        // onSelect = {(newListing) => {
        //   setSelectedItem(newSelectedItem)
        // }}

        resultsTemplate={(state) => {
          return state.results.map((val, i) => {
            setState ({
              list: state.results
            });
          });
        }}

        // resultsTemplate={(props, state, styles, openApartmentListing) => {
        //   return state.results.map((val, i) => {
        //     const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
        //     return (
        //       <div
        //         key={i}
        //         style={style}
        //         onClick={() => openApartmentListing(i)}
        //       >
        //         {val.title}
        //         <span style={{ float: 'right', opacity: 0.5 }}>by {val.description}</span>
        //       </div>
        //     );
        //   });
        // }}
      />

      <ul>
        <li className={pathname === '/home' ? 'active' : ''}>
          <Link to="/home">Home</Link>
        </li>

        <li className={pathname === '/about-us' ? 'active' : ''}>
          <Link to="/about-us">About Us</Link>
        </li>

        <li className={pathname === '/notices' ? 'active' : ''}>
          <Link to="/notices">Notices</Link>
        </li>

        <li className={pathname === '/signin' ? 'active' : ''}>
          <Link to="/signin">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
