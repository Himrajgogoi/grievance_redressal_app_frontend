import React from 'react'
import styles from "../styles/Common.module.css";
import Cookies from 'js-cookie';
import Departments from './departments';

function TitleComponent(props) {

  const [department, setDepartment] = React.useState(null);

  React.useEffect(()=>{
    if(Cookies.get("Department")){
      setDepartment(Cookies.get("Department"))
    }
  },[])

  return (
    <h2 className={styles.header}>{props.title}{department && ` of ${department === "0"?"Root": Departments[Number(department)-1]} Department`}</h2>
  )
}

export default TitleComponent