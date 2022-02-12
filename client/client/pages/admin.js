import CenterLayout from "../components/centerLayout";
import LoginCard from "../components/loginCard";
import NavHeader from "../components/navHeader";
import { sendRequest } from "../helpers/axios";
const Admin = (props) => {
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
