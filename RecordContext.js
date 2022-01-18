import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserContext";
import { CategoryContext } from "./CategoryContext";

export const RecordContext = createContext();

export const RecordProvider = (props) => {
  const { user } = useContext(UserContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // ?? mean nullish coalescing operator, meaning if the left conditon return undefined on null the right value will be the default value
    console.log("setting records");
    const sortedRecords =
      user.records?.sort((a, b) =>
        a.dateCreated < b.dateCreated
          ? 1
          : b.dateCreated < a.dateCreated
          ? -1
          : 0
      ) ?? [];
    setRecords(sortedRecords);
  }, [user.records]);

  return (
    <RecordContext.Provider value={{ records, setRecords }}>
      {props.children}
    </RecordContext.Provider>
  );
};
