"use client";

import { useState, FormEvent } from "react";

import Button from "../components/Button";

import { MdOutlineClose } from "react-icons/md";
import Input from "../components/Input";

const Home = () => {
  const [isOpenModal, setisOpenModal] = useState<boolean>(false);
  const [issuccessful, setissuccessful] = useState<boolean>(false);

  const sendSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setissuccessful(true);
  };

  const openModalHandler = () => {
    setisOpenModal(true);
  };

  const closeModalHandler = () => {
    setisOpenModal(false);
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] transition ease-in delay-300 overflow-auto">
          <form
            className="relative w-full max-w-[20rem] md:max-w-[28rem] mx-auto px-12 md:px-16 py-12 border-2 border-primaryDark bg-[#ffffff]"
            onSubmit={sendSubmitHandler}
          >
            <MdOutlineClose
              className="absolute top-4 right-6 cursor-pointer"
              size={"1.5rem"}
              onClick={closeModalHandler}
            />
            <h4 className="text-2xl text-center">
              {issuccessful ? <>All done</> : <>Request an invite</>}
            </h4>
            <div className="w-12 h-[2px] bg-[#a5a5a5] mt-3 mb-6 mx-auto"></div>
            {issuccessful ? (
              <div className="flex justify-center flex-col">
                <p className="text-center mb-8 text-sm md:text-base font-light">
                  You will be one of the first to experience Broccoli & Co. when
                  we launch.
                </p>
                <Button text={"OK"} onClick={closeModalHandler} />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <Input type={"text"} placeholder="Full Name" />
                <Input type={"email"} placeholder="Email" />
                <Input type={"email"} placeholder="Confirm Email" />
                <Button text={"Send"} />
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
