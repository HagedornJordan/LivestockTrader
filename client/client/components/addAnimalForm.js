import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

const animals = [
  { value: "goat", label: "Goat" },
  { value: "cow", label: "Cow" },
  { value: "sheep", label: "Sheep" }
];
const inputs = ["breed", "title", "description", "age", "sex"];
import axiosInstance from "../helpers/axios";
import { useState, useEffect } from "react";
import { formatWithValidation } from "next/dist/shared/lib/utils";

const initial = Object.freeze({
  animal: "",
  breed: "",
  title: "",
  description: "",
  age: "",
  sex: ""
});
const AddAnimalForm = () => {
  const [formFields, setFormFields] = useState(initial);
  const [formFiles, setFormFiles] = useState([]);

  const handleSubmit = async event => {
    console.log(formFiles);
    event.preventDefault();
    const headerConfig = { "Content-Type": "multipart/form-data" };
    let fd = new FormData();
    for (let [fieldName, fieldValue] of Object.entries(formFields)) {
      fd.append(fieldName, fieldValue);
    }
    for (let file of formFiles) {
      fd.append("images", file);
    }

    axios.post("http://localhost:3000/addAnimal", fd, headerConfig);
  };

  const handleChange = e => {
    console.log(e);
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value
    });
  };

  const handleFilesChange = e => {
    setFormFiles([...formFiles, e.target.files[0]]);
  };
  const handleSelectChange = selected => {
    setFormFields({
      ...formFields,
      ["animal"]: selected.label
    });
  };
  return (
    <div className="flex flex-col flex-wrap content-start">
      <div className="ml-5 m-auto border">
        <h1> Add new animal</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="animal">Animal</label>
            <Select
              id="animal"
              options={animals}
              onChange={handleSelectChange}
            />
          </div>
          {inputs.map(input => {
            return (
              <div className="pt-2" key={input + "container"}>
                <label key={input + "label"} htmlFor={input}>
                  {" "}{input}{" "}
                </label>
                <input
                  className="w-full border"
                  key={input + "input"}
                  id={input}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <div>
            <label htmlFor="images">Images</label>
          </div>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            onChange={handleFilesChange}
          />
          <div className="text-center">
            <input className="border-2" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAnimalForm;
