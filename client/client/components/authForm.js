import { useState, useEffect } from "react";

import ToolCard from "./toolCard";
import axiosInstance from "../helpers/axios";

axiosInstance.defaults.withCredentials = "True";
const initialFields = {
  username: { value: "", valid: true },
  password: { value: "", valid: true },
};

const AuthForm = (props) => {
  const [isSignup, setSignup] = useState(false);
  var requestUrl = "/login";
  let fields = initialFields;
  if (isSignup) {
    requestUrl = "/register";
    fields = { ...fields, email: { value: "", valid: true } };
  }

  const [formFields, setFormFields] = useState(fields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: formFields.username.value,
      password: formFields.password.value,
      email: formFields.email?.value,
    };

    if (anyFieldsInvalid()) return;

    const res = await axiosInstance.post(requestUrl, user);
    if (res.data.status == "SUCCESS") props.userSetCB(user.username);
  };

  const handleFieldChange = (e) => {
    const ff = formFields;
    ff[e.target.id].value = e.target.value;
    ff = validateFormFields(ff);
    setFormFields((formFields) => ({
      ...ff,
    }));
  };

  const validateFormFields = (toValidate) => {
    for (const field in toValidate) {
      if (field == "username")
        toValidate[field].valid = toValidate[field].value.length > 2;
      if (field == "password")
        toValidate[field].valid = toValidate[field].value.length > 5;
      if (field == "email")
        toValidate[field].valid = toValidate[field].value.includes("@");
    }
    return toValidate;
  };

  const anyFieldsInvalid = () => {
    if (isSignup) {
      Object.entries(formFields).forEach(([key, value]) => {
        if (!value.valid) return true;
      });
    }
    return false;
  };

  const flipForm = () => {
    setSignup((isSignup) => !isSignup);
  };

  const errorMessage = (messageFor) => {
    if (!formFields[messageFor].valid) {
      switch (messageFor) {
        case "username":
          return "Username must be at least 3 characters";
        case "password":
          return "Password must be at least 6 characters";
        case "email":
          return "must be valid email";
        default:
      }
    }
    return "";
  };

  useEffect(() => {
    setFormFields(fields);
  }, [isSignup]);

  return (
    <ToolCard>
      <div className="flex-1">
        <div className="content-center">
          <h1 className="m-2 text-center text-xl ">
            {" "}
            {isSignup ? "Register" : "Login"}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex-0">
            {Object.entries(formFields).map((val, i) => (
              <div key={i + "div"} className="pt-2">
                <div key={i} className="flex-0 flex flex-row justify-center">
                  <label className="mr-8" htmlFor={val[0]}>
                    {val[0]}
                  </label>
                  <input
                    value={formFields[val[0].value]}
                    className="border-2"
                    id={val[0]}
                    type={val[0] === "password" ? "password" : "text"}
                    onChange={handleFieldChange}
                  ></input>
                </div>
                {isSignup && (
                  <span
                    className="flex-0 flex flex-row justify-center"
                    style={{ color: "red" }}
                  >
                    {errorMessage(val[0])}
                  </span>
                )}
              </div>
            ))}

            <div className="flex-0 pt-5 flex flex-row justify-center mb-2">
              <input className="" type="submit" value="Submit" />
            </div>
          </div>
        </form>
        <div className="flex-0 pt-5 flex flex-row justify-center mb-2">
          <button onClick={flipForm}>
            {" "}
            {isSignup ? "Already have an account?" : "Need to Register?"}{" "}
          </button>
        </div>
      </div>
    </ToolCard>
  );
};

export default AuthForm;
