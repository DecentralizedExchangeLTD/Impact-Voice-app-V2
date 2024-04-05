import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [user, setUser] = useState("me");
  const [proposals, setProposals] = useState(null);
  const [proposal, setProposal] = useState(null);

  // Function to fetch user
  const fetchUser = async () => {
    const response = await fetch("API_URL_1");
    const data = await response.json();
    setUser(data);
  };

  // Function to fetch proposals
  const fetchProposals = async () => {
    const response = await fetch("API_URL_2");
    const data = await response.json();
    setProposals(data);
  };

  // Function to fetch 1 proposal
  const fetchProposal = async () => {
    const response = await fetch("API_URL_3");
    const data = await response.json();
    setProposal(data);
  };

  return (
    <DataContext.Provider
      value={{
        user,
        fetchUser,
        proposal,
        fetchProposal,
        proposals,
        fetchProposals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
