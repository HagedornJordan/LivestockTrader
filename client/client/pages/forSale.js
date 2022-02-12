import NavHeader from "../components/navHeader";
import AnimalCard from "../components/animalCard";
import { sendRequest } from "../helpers/axios";
const ForSale = (props) => {
  return (
    <>
      <NavHeader />
      <div className="flex flex-row flex-wrap justify-evenly content-between gap-y-5 gap-x-2 ">
        {props.goats.map((goat) => {
          return <AnimalCard animal={goat} />;
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const goats = await [
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
  return {
    props: {
      goats,
    },
  };
}

export default ForSale;
