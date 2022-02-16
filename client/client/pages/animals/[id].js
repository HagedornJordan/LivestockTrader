import NavHeader from "../../components/navHeader";
import Image from "next/image";
import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";
import { useState, useEffect } from "react";


const Animal = (props) => {
  const [numImages, setNumImages] = useState(null);
  useEffect(async() => {
    const data = await fetch(process.env.NEXT_PUBLIC_API_BASE.toString() + "/numberOfImages/" + props.animal.id);
    const res = await data.json()
    console.log(res)
    setNumImages(res.numFiles)
  }, []);
  
  return (
    <>
      {" "}
      <NavHeader />
      <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full h-full m-2 p-2">
        {console.log(numImages)}
      <Flickity> 
        {[...Array(numImages)].map((e, i) => <Image
        key={i}
            width={350}
            height={350}

            quality={100}src={process.env.NEXT_PUBLIC_API_BASE.toString() + "/animalImage/" + props.animal.id + "/" + i} alt="pic"></Image>)                      
        }
            </Flickity>
          <h1 className="self-center"> {props.animal.id}</h1>
          <h1 className="self-center"> ♂️ </h1>


        </div>

      </div>
    </>
  );
};
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE.toString() + "/animals");
  const animals = await res.json();
  const paths = animals.map((animal) => ({   
    params: { id: animal.id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const animal = { id: params.id };
  // Pass post data to the page via props
  return { props: { animal } };
}


export default Animal;
