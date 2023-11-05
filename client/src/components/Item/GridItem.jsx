import { useDispatch, useSelector } from "react-redux";
import { useGetWorkspacesQuery } from "../../features/workspaces/workspaceApi";
// import Product from './Product';

import WorkTitle from "./WorkTitle";
import { workSpace, workspaceByid } from "../../features/workspaces/workSlic";
import { useParams } from "react-router-dom";
import { useState } from "react";

const GridItem = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(id);
  const auth = useSelector((state) => state.auth);

  console.log(auth.user._id);

  const { data } = useGetWorkspacesQuery();

  console.log(data);

  {
    const filterById = (array, targetId) => {
      console.log(targetId);
      return array?.filter((item) => item?.createdBy === targetId);
    };

    // Example usage
    const filteredArray = filterById(data, id);
    dispatch(workspaceByid(filteredArray));
    console.log(filteredArray);
  }

  return (
    <div className="container mx-auto p-4">
      <div className=" ">
        <WorkTitle />
      </div>
    </div>
  );
};

export default GridItem;
