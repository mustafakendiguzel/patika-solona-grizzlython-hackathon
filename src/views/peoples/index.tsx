import { FC } from "react";
import { SignMessage } from "../../components/SignMessage";
import { SendTransaction } from "../../components/SendTransaction";
import { SendVersionedTransaction } from "../../components/SendVersionedTransaction";
import { PeopleList } from "components/peoples";

export const PeoplesView: FC = ({}) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col w-full">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          Peoples
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center"></div>
        <PeopleList />
      </div>
    </div>
  );
};
