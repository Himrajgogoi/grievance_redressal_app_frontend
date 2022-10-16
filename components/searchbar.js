import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Departments from "./departments";

function SearchBar({setSearch, issues}) {

const [word, setWord] = useState("");

  //for search pattern creation
  const makepattern = (word) => {
    let splitted = word.split("");
    let pattern = "";
    splitted.forEach((letter) => {
      pattern += letter + ".*";
    });
    return pattern + "";
  };

  // here we do the actual search with the where,description and department names
  const search = (item) => {
    if(item === ""){
        window.location.reload();
    }
    else{
        let pattern = makepattern(item.toLowerCase());
        let re = new RegExp(pattern, "i");
        setSearch(
          issues.filter((element) => {
            let found = re.exec(element.where) || re.exec(element.description) || re.exec(Departments[element.department]);
            return found ? true : false;
          })
        );
    }
   
  };


  return  (<form>
  <TextField
    id="search-bar"
    onInput={(e) => {
      setWord(e.target.value);
    }}
    label="Search for an issue"
    variant="outlined"
    placeholder="Search..."
    size="small"
  />
  <IconButton type="button" aria-label="search" onClick={()=>search(word)}>
    <SearchIcon style={{ fill: "blue" }} />
  </IconButton>
 
</form>)
}

export default SearchBar;
