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
        headers: {
          "Content-Type": "multipart/form-data",
        },
        //withCredentials: true,
        data: {
          animal: formFields.animal,
          breed: formFields.breed,
          title: formFields.title,
          description: formFields.description,
          age: formFields.age,
          image: "",
        },
      })
      .then((res) => {
        if (res.data.status == "SUCCESS");
      });
  };
  const handleChange = (e) => {
    console.log(e);
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
            ></Select>
          </div>
          {inputs.map((input) => {
            return (
              <div className="pt-2" key={input + "container"}>
                <label key={input + "label"} htmlFor={input}>
                  {" "}
                  {input}{" "}
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
          <input id="images" type="file" multiple></input>
          <div className="text-center">
            <input className="border-2" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAnimalForm;
