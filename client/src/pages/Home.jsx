import React from 'react'
import Featured from '../components/Featured'
import Slide from '../components/Slide'
import {cards, projects} from "../data"
import CatCard from '../components/catCard'
import ProjectCard from '../components/ProjectCard'
import Works from '../components/Works'

const Home = () => {
  return (
    <div>
      <Featured />
     <Slide slidesToShow={5} arrowsScroll={5}>
       {cards.map(card => (
         <CatCard key={card.id} item={card} />
       ))}
     </Slide>
     <Works />
     <Slide slidesToShow={4} arrowsScroll={4}>
       {projects.map((card) => (
         <ProjectCard key={card.id} card={card} />
       ))}
     </Slide>
    </div>
  )
}

export default Home