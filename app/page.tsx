"use client";

import { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from "react";

import Button from "../components/Button";
import Input from "../components/Input";

import { MdOutlineClose } from "react-icons/md";
import axios from "axios";

interface requestForm {
  enteredFullName: string;
  enteredEmail: string;
  enteredConfirmEmail: string;
}

interface blurType {
  enteredFullName: boolean;
  enteredEmail: boolean;
  enteredConfirmEmail: boolean;
}

const Home = () => {
  const [isOpenModal, setisOpenModal] = useState<boolean>(false);
  const [isFormIsValid, setisFormIsValid] = useState<boolean>(false);
  const [isSuccessful, setisSuccessful] = useState<boolean>(false);
  const [emailFormatIsValid, setemailFormatIsValid] = useState<boolean>(false);

  const [values, setValues] = useState<requestForm>({
    enteredFullName: "",
    enteredEmail: "",
    enteredConfirmEmail: "",
  });

  const [blurs, setBlurs] = useState<blurType>({
    enteredFullName: false,
    enteredEmail: false,
    enteredConfirmEmail: false,
  });

  const enterFullNameIsValid =
    values["enteredFullName"].trim().toLowerCase() !== "";
  const fullNameIsInvalid = !enterFullNameIsValid && blurs["enteredFullName"];
  const enteredEmailIsValid =
    values["enteredEmail"].includes("@") && values["enteredEmail"].length >= 3;
  const emailIsInvalid = !enteredEmailIsValid && blurs["enteredEmail"];
  const enteredCEIsInvalid =
    values["enteredConfirmEmail"].trim() === values["enteredEmail"].trim();
  const ceEmailIsInvalid = !enteredCEIsInvalid && blurs["enteredConfirmEmail"];

  const url = "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth";

  useEffect(() => {
    if (enterFullNameIsValid && enteredEmailIsValid && enteredCEIsInvalid) {
      setisFormIsValid(true);
    } else {
      setisFormIsValid(false);
    }
  }, [enterFullNameIsValid, enteredEmailIsValid, enteredCEIsInvalid]);

  const onChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onBlurHnadler = (e: FocusEvent<HTMLInputElement>) => {
    setBlurs({
      ...blurs,
      [e.target.name]: true,
    });
  };

  const sendSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(url, {
        name: values["enteredFullName"],
        email: values["enteredEmail"],
      })
      .then(() => setisSuccessful(true))
      .catch((error) => {
        console.log(error);
        if (values["enteredEmail"] === "usedemail@blinq.app") {
          setemailFormatIsValid(true);
        }
      });

    const newValues = Object.keys(values).reduce((accumulator, key) => {
      return { ...accumulator, [key]: "" };
    }, {});
    const newBlurs = Object.keys(blurs).reduce((accumulator, key) => {
      return { ...accumulator, [key]: false };
    }, {});

    setValues(newValues as requestForm);
    setBlurs(newBlurs as blurType);
  };

  const openModalHandler = () => {
    setisOpenModal(true);
  };

  const closeModalHandler = () => {
    setisOpenModal(false);
    setisSuccessful(false);
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
                    value={values["enteredFullName"]}
                    placeholder="Full Name"
                    isInValid={fullNameIsInvalid}
                    onChange={onChangedHandler}
                    onBlur={onBlurHnadler}
                  />
                  {fullNameIsInvalid && (
                    <p className="mt-1 text-error text-sm">
                      Full Name is require
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type={"email"}
                    name={"enteredEmail"}
                    value={values["enteredEmail"]}
                    placeholder="Email"
                    isInValid={emailIsInvalid}
                    onChange={onChangedHandler}
                    onBlur={onBlurHnadler}
                  />
                  {emailIsInvalid && (
                    <p className="mt-1 text-error text-sm">
                      Your Email Address must have at least 3 length and
                      containa single @
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
                    value={values["enteredConfirmEmail"]}
                    placeholder="Confirm Email"
                    isInValid={ceEmailIsInvalid}
                    onChange={onChangedHandler}
                    onBlur={onBlurHnadler}
                  />
                  {ceEmailIsInvalid && (
                    <p className="mt-1 text-error text-sm">
                      Email is not equal to confirm Email
                    </p>
                  )}
                </div>
                <Button text={"Send"} disabled={!isFormIsValid} />
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
