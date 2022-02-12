import React, { Component } from "react";
import Select from "react-select";
const animals = [
  { value: "goat", label: "Goat" },
  { value: "cow", label: "Cow" },
  { value: "sheep", label: "Sheep" },
];
const inputs = ["breed", "title", "description", "age"];
import axiosInstance from "../helpers/axios";
import { useState, useEffect } from "react";
import { formatWithValidation } from "next/dist/shared/lib/utils";

const initial = Object.freeze({
  animal: "",
  breed: "",
  title: "",
  description: "",
  age: "",
});
const AddAnimalForm = () => {
  const [formFields, setFormFields] = useState(initial);

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .request({
        url: "http://localhost:3000/addAnimal",
        method: "post",
        //withCredentials: true,
        data: {
          animal: formFields.animal,
          breed: formFields.breed,
          title: formFields.title,
          description: formFields.description,
          age: formFields.age,
        },
      })
      .then((res) => {
        if (res.data.status == "SUCCESS");
      });
  };
  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  };
  const handleSelectChange = (selected) => {
    setFormFields({
      ...formFields,
      ["animal"]: selected.label,
    });
  };
  return (
    <div className="flex flex-row flex-wrap justify-evenly">
      <div className="m-auto">
        <h1> Add new animal</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="animal">Animal</label>
            <Select options={animals} onChange={handleSelectChange}></Select>
          </div>
          {inputs.map((input) => {
            return (
              <div className="w-full" key={input + "container"}>
                <label key={input + "label"} htmlFor={input}>
                  {" "}
                  {input}{" "}
                </label>
                <input
                  key={input + "input"}
                  id={input}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <input className="" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};
export default AddAnimalForm;
