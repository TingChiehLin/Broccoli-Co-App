"use client";

import { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from "react";

import Button from "../components/Button";
import Input from "../components/Input";

import { FaSpinner } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";

type fieldValidator = (currentValues: requestForm) => string;

interface FieldConfig {
  value: string;
  error: string;
  validator: fieldValidator;
}

interface requestForm {
  enteredFullName: FieldConfig;
  enteredEmail: FieldConfig;
  enteredConfirmEmail: FieldConfig;
}

const Home = () => {
  const [isOpenModal, setisOpenModal] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSuccessful, setisSuccessful] = useState<boolean>(false);
  const [emailFormatIsValid, setemailFormatIsValid] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const validateFullname = (currentValues: requestForm) => {
    const fullname = currentValues["enteredFullName"].value;
    if (fullname.trim().toLowerCase() === "") {
      return "Fullname must not be empty";
    }

    return "";
  };

  const validateEmail = (currentValues: requestForm) => {
    const email = currentValues["enteredEmail"].value;
    if (email.trim().toLowerCase() === "") {
      return "Email must not be empty";
    }

    const isValidEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!isValidEmail) {
      return "Email must not be in the form user@domain.com";
    }

    return "";
  };

  const validateEmailConfirmation = (currentValues: requestForm) => {
    const email = currentValues["enteredEmail"].value;
    const emailConfirmation = currentValues["enteredConfirmEmail"].value;

    if (emailConfirmation.trim().toLowerCase() === "") {
      return "Email confirmation must not be empty";
    }

    if (email.trim().toLowerCase() !== emailConfirmation.trim().toLowerCase()) {
      return "Email confirmation must be the same as the email address";
    }

    return "";
  };

  const [values, setValues] = useState<requestForm>({
    enteredFullName: {
      value: "",
      error: "",
      validator: validateFullname,
    },
    enteredEmail: {
      value: "",
      error: "",
      validator: validateEmail,
    },
    enteredConfirmEmail: {
      value: "",
      error: "",
      validator: validateEmailConfirmation,
    },
  });

  // const enterFullNameIsValid =
  //   values["enteredFullName"].trim().toLowerCase() !== "";
  // const fullNameIsInvalid = !enterFullNameIsValid && blurs["enteredFullName"];
  // const enteredEmailIsValid =
  //   values["enteredEmail"].includes("@") && values["enteredEmail"].length >= 3;
  // const emailIsInvalid = !enteredEmailIsValid && blurs["enteredEmail"];
  // const enteredCEIsInvalid =
  //   values["enteredConfirmEmail"].trim() === values["enteredEmail"].trim();
  // const ceEmailIsInvalid = !enteredCEIsInvalid && blurs["enteredConfirmEmail"];

  const url = "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth";

  // useEffect(() => {
  //   if (enterFullNameIsValid && enteredEmailIsValid && enteredCEIsInvalid) {
  //     setisFormIsValid(true);
  //   } else {
  //     setisFormIsValid(false);
  //   }
  // }, [enterFullNameIsValid, enteredEmailIsValid, enteredCEIsInvalid]);

  const onChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: {
        ...(values[e.target.name as keyof requestForm] as FieldConfig),
        value: e.target.value,
      },
    });
  };

  const onBlurHnadler = (e: FocusEvent<HTMLInputElement>) => {
    setValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: {
        ...(currentValues[e.target.name as keyof requestForm] as FieldConfig),
        error: (
          currentValues[e.target.name as keyof requestForm] as FieldConfig
        ).validator(currentValues),
      },
    }));

    // const isFormIsValid = Object.values(values).every((value) => {
    //   return value.error === "";
    // });
    // setIsFormValid()
  };

  console.log("values", values);

  const sendSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setLoading(true);
    setisSuccessful(false);

    axios
      .post(url, {
        name: values["enteredFullName"],
        email: values["enteredEmail"],
      })
      .then(() => {
        setLoading(false);
        setisSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
        if (values["enteredEmail"].value === "usedemail@blinq.app") {
          setemailFormatIsValid(true);
        }
      });

    const newValues = Object.keys(values).reduce((accumulator, key) => {
      return { ...accumulator, [key]: "" };
    }, {});
    // const newBlurs = Object.keys(blurs).reduce((accumulator, key) => {
    //   return { ...accumulator, [key]: false };
    // }, {});

    setValues(newValues as requestForm);
    // setBlurs(newBlurs as blurType);
  };

  const openModalHandler = () => {
    setisOpenModal(true);
  };

  const closeModalHandler = () => {
    setisOpenModal(false);
    setisSuccessful(false);
    const newValues = Object.keys(values).reduce((accumulator, key) => {
      return { ...accumulator, [key]: "" };
    }, {});
    // const newBlurs = Object.keys(blurs).reduce((accumulator, key) => {
    //   return { ...accumulator, [key]: false };
    // }, {});
    setValues(newValues as requestForm);
    // setBlurs(newBlurs as blurType);
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] transition ease-in delay-300 overflow-auto">
          <form
            className="relative w-full max-w-[20rem] md:max-w-[28rem] mx-auto px-12 md:px-16 py-12 border-2 border-primaryDark bg-[#ffffff]"
            onSubmit={sendSubmitHandler}
            method="post"
            noValidate
          >
            <MdOutlineClose
              className="absolute top-4 right-6 cursor-pointer"
              size={"1.5rem"}
              onClick={closeModalHandler}
            />
            <h4 className="text-2xl text-center">
              {isSuccessful ? <>All done</> : <>Request an invite</>}
            </h4>
            <div className="w-12 h-[2px] bg-[#a5a5a5] mt-3 mb-6 mx-auto"></div>
            {isSuccessful ? (
              <div className="flex justify-center flex-col">
                <p className="text-center mb-8 text-sm md:text-base font-light">
                  You will be one of the first to experience Broccoli & Co. when
                  we launch.
                </p>
                <Button
                  text={"OK"}
                  type={"button"}
                  onClick={closeModalHandler}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <Input
                    type={"text"}
                    name={"enteredFullName"}
                    value={values["enteredFullName"].value}
                    placeholder="Full Name"
                    isInValid={values["enteredFullName"].error !== ""}
                    onChange={onChangedHandler}
                    onBlur={onBlurHnadler}
                  />
                  {values["enteredFullName"].error !== "" && (
                    <p className="mt-1 text-error text-sm">
                      {values["enteredFullName"].error}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type={"email"}
                    name={"enteredEmail"}
                    value={values["enteredEmail"].value}
                    placeholder="Email"
                    isInValid={values["enteredEmail"].error !== ""}
                    onChange={onChangedHandler}
                    onBlur={onBlurHnadler}
                  />
                  {values["enteredEmail"].error !== "" && (
                    <p className="mt-1 text-error text-sm">
                      {values["enteredEmail"].error}
                    </p>
                  )}
                  {emailFormatIsValid && (
                    <p className="mt-1 text-error text-sm">
                      usedemail@blinq.app is invalid. Please change it
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type={"email"}
                    name={"enteredConfirmEmail"}
                    value={values["enteredConfirmEmail"].value}
                    placeholder="Confirm Email"
                    isInValid={values["enteredConfirmEmail"].error !== ""}
                    onChange={onChangedHandler}
                    onBlur={onBlurHnadler}
                  />
                  {values["enteredConfirmEmail"].error !== "" && (
                    <p className="mt-1 text-error text-sm">
                      {values["enteredConfirmEmail"].error}
                    </p>
                  )}
                </div>
                {isLoading && (
                  <div>
                    <FaSpinner
                      className="mx-auto"
                      size={"2rem"}
                      onClick={closeModalHandler}
                    />
                  </div>
                )}
                {!isLoading && <Button text={"Send"} disabled={!isFormValid} />}
              </div>
            )}
          </form>
        </div>
      )}
      <div className="flex items-center flex-col gap-6 md:gap-10 ">
        <h1 className="max-w-lg text-center text-2xl md:text-5xl  text-primaryDark font-bold">
          A better way to enjoy every day.
        </h1>
        <p className="font-light text-base md:text-xl">
          Be the first to know when we launch.
        </p>
        <Button text={"Request an invite"} onClick={openModalHandler} />
      </div>
    </>
  );
};

export default Home;
