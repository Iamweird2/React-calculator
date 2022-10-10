import React, { useState, useEffect } from "react";
import {useRef } from "react"
import "./Header.css";

export default function Header({set, color}) {
  const circle = useRef()
  const [translate, setTranslate] = useState(null)

  useEffect(()=>{
    const currentCircle = localStorage.getItem("current-translate")
    if(currentCircle){
      setTranslate(currentCircle)
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
      return(
        set("dark"),
      localStorage.setItem("theme-color", "dark"),
      localStorage.setItem("current-translate", "translate2"),
      setTranslate("translate2")
      )
    }

  }, [])

  // const setColor = set
  // console.log(set);
 function go_to_1(){
   return (
     set(null),
  localStorage.setItem("theme-color", null),
  localStorage.setItem("current-translate", null),
  setTranslate("translate1")
  
  )}
  function go_to_2(){
    return (
      set("dark"),
      localStorage.setItem("theme-color", "dark"),
      localStorage.setItem("current-translate", "translate2"),
      setTranslate("translate2")
      )}
      function go_to_3(){
        return (
          localStorage.setItem("theme-color", "violet"),
          set("violet"),
          localStorage.setItem("current-translate", "translate3"),
          setTranslate("translate3")
   )}

  return (
    <div className="header">
      <div className="logo">calc</div>
      <div className="theme">
        <span className="theme-head"> THEME</span>

        <div className="switch">

          <div className="toggle-container">
            <div ref={circle} className={`toggle-circle ${translate}`}></div>
          </div>

          <div className="toggler">
          <div className="numbers">
            <span className="numbers-span" onClick={() => go_to_1()} >1</span>
            <span className="numbers-span" onClick={() => go_to_2()}>2</span>
            <span className="numbers-span"  onClick={ () => go_to_3()}>3</span>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
