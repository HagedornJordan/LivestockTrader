import NavHeader from "../../components/navHeader";
import Image from "next/image";
import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";

const Animal = (props) => {
  return (
    <>
      {" "}
      
      <NavHeader />
      
      <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full h-full m-2 p-2">
      <Flickity> 
            <Image
            width={350}
            height={350}

            quality={100}src={"http://localhost:3000/animalImage/" + props.animal.id} alt="pic"></Image>
            <Image width={350}
      height={350}

            quality={100}src={"http://localhost:3000/animalImage/2" } alt="pic"></Image>

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
  const animals = await [
    {
      id: 0,
      title: "Big boy",
      description: "This is a big boy",
      image: "/img/goat0.jpg",
    },
    {
      id: 1,
      title: "Medium boy",
      description: "This is a medium boy",
      image: "/img/goat1.jpg",
    },
    {
      id: 2,
      title: "Small boy",
      description: "This is a small boy",
      image: "/img/goat2.jpg",
    },
    {
      id: 3,
      title: "Fergus",
      description: "This is fergus",
      image: "/img/goat3.jpg",
    },
    {
      id: 4,
      title: "Jäger",
      description: "This is a Jäger",
      image: "/img/goat4.jpg",
    },
  ];

  // Get the paths we want to pre-render based on posts
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
