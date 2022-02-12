import { useRouter } from "next/router";
import CenterLayout from "../components/centerLayout";
import LoginCard from "../components/loginCard";
import NavHeader from "../components/navHeader";
import { sendRequest } from "../helpers/axios";
import { useState, useEffect } from "react";

const Admin = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (props.user) {
      router.push("/adminDashboard");
    }
  });
  return (
    <>
      <NavHeader user={props.user} />
      <CenterLayout>
        {true && props.user === null && (
          <LoginCard userSetCB={props.userSetCB} />
        )}
      </CenterLayout>
    </>
  );
};
export default Admin;
