import NavHeader from "../components/navHeader";
import AnimalCard from "../components/animalCard";
import { sendRequest } from "../helpers/axios";
import axiosInstance from "../helpers/axios";

const ForSale = (props) => {
  
  return (
    <>
      <NavHeader />
      {props.animals && <div className="flex flex-row flex-wrap justify-evenly content-between gap-y-5 gap-x-2 ">
        {props.animals.map((animal) => {
          return <AnimalCard key={animal.id} animal={animal} />;
        })}
      </div>
}
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE.toString() + "/animals");
  console.log(response);
  const data = await response.json()
  return { props: { animals: data } }
}

export default ForSale;
