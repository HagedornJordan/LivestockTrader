import CenterLayout from "../components/centerLayout";
import NavHeader from "../components/navHeader";
import { sendRequest } from "../helpers/axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddAnimalForm from "../components/addAnimalForm";

const AdminDashboard = (props) => {
  console.log(props);
  const router = useRouter();

  useEffect(() => {
    if (!props.user) {
      router.push("/admin");
    }
  });

  const onAnimalAdded = () =>{
    console.log("hereee");
    router.replace(router.asPath);
  }

  return (
    <>
      <NavHeader user={props.user} />
      <div className="flex flex-row flex-wrap content-start">
      <AddAnimalForm onSubmit={onAnimalAdded}/>
      <div> 
        {props.animals && props.animals.map(animal=>{
          return (<p key={animal.id} className="ring-1 p-3 m-2"> {animal.id} , {animal.type}, {animal.breed} </p>)
        })}
      </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE.toString() + "/animals");
  console.log(response);
  const data = await response.json()
  return { props: { animals: data } }
  
}


export default AdminDashboard;
