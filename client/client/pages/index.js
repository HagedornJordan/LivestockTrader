import Head from "next/head";
import styles from "../styles/Home.module.css";
import CenterLayout from "../components/centerLayout";
import NavHeader from "../components/navHeader";
import LoginCard from "../components/loginCard";

const Home = (props) => {
  return (
    <>
      <NavHeader user={props.user} />
      <CenterLayout></CenterLayout>
    </>
  );
};

export default Home;
