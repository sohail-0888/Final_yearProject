import React from 'react'
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import CarDisplay from '../../components/carDisplay/CarDisplay';
import { useState } from 'react';

export default function Home() {
     const [category, setCategory]  = useState("All");
  return (
    <div>
       <Header/>
       <ExploreMenu category={category} setCategory={setCategory}/>
       <CarDisplay category={category}/>
    </div>
  )
}
