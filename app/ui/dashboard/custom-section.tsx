'use client';
import { main } from "@/app/lib/brian_dashboard";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CustomSectionType {
  id? : string;
  title : string;
    body : string;
    i? : number;
}

export const CustomSection = ({ id, title, body, i } : CustomSectionType) => {
  const [hovering, setHovering] = useState(false);
  const handleHover = (e : any) => setHovering(t => !t);

  useEffect(() => {
    main();
  }, [])
  

  return (
    <div id={id}>
      <h2 
        className="text-2xl font-bold text-gray-800 hover:underline cursor-pointer transition duration-300"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        // props => variables, funciones
      >  
        <a href={`#${id}`} className="header-link">{hovering && '#'} {title}</a>          
      </h2>
      <div>
        {body}
      </div>
      <div id={`viz${i}`}></div>
    </div>
  )
}
