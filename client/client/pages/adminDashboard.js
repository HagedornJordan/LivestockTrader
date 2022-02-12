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

  return (
    <>
      <NavHeader user={props.user} />
      <AddAnimalForm />
    </>
  );
};

export default AdminDashboard;
