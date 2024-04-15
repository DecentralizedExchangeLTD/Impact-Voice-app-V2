"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Pagination } from "antd";
import { ProposalCard } from "../components/ProposalCard";
import { ProposalService } from "../services/proposalService";
import { AuthService } from "../services/authService";
import { error } from "../components/Modals";
import { LoadingScreen } from "../components/LoadingScreen";
import { useData } from "../hooks/ProposalProvider";

const { Search } = Input;

export default function PathPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [name, setName] = useState("user ID");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const pageSize = 8;

  const {
    user,
    fetchUser,
    proposal,
    fetchProposal,
    proposals,
    fetchProposals,
  } = useData();

  useEffect(() => {
    // TODO: Move this to useData() custom hook
    console.log(user);
    try {
      const fetchUser = async () => {
        const user = await AuthService.confirmAppwriteAuth();
        setName(user.name);
      };

      const fetchAttestations = async () => {
        const response = await ProposalService.fetchProposals();
        setData(response.documents);
        setFilteredProposals(response.documents);
        console.log(response.documents);
      };

      fetchAttestations();
      fetchUser();
    } catch (e) {
      error(
        "Oops! an error occured.",
        "There seems to have been a problem getting proposals or authenticating you.",
        () => setData([])
      );
    } finally {
      setPageLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = data.filter((proposal) =>
      proposal.title.toLowerCase().includes(searchTerm)
    );
    setFilteredProposals(filtered);
  };

  const handlePagination = (page) => {
    setPage(page);
    console.log("current page:", page);
  };

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredProposals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (pageLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#fafafa] text-[#333]">
          Loading...
        </div>
      }
    >
      <div className="w-full h-full lg:w-screen lg:max-w-[1280px] px-4 pt-32 pb-24 flex flex-col items-center justify-start gap-5">
        <div className="w-full lg:w-screen lg:max-w-[1280px] items-center flex flex-col gap-4 fixed top-0 pt-16 px-4 pb-2 bg-[#d8d8d8] shadow-md">
          <div className="w-full">
            <Search
              placeholder="Search for a proposal"
              enterButton
              allowClear
              size="large"
              onSearch={() => {
                return;
              }}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="w-full text-center">
          <h1 className="font-semibold text-xl mb-1">
            {title ? title : "Proposed Grants"}
          </h1>
          <p className="text-xs font-light">{name}</p>
        </div>
        <div className="flex flex-col gap-5 items-center justify-start w-full h-full lg:items-start lg:flex-wrap lg:max-w-[1280px]">
          {data.length < 1 ? (
            <div className="w-full h-full  flex flex-col items-center justify-center text-amber-600 font-semibold text-center mt-10">
              There are no proposals to display currently.
            </div>
          ) : (
            currentItems.map((item, index) => {
              return (
                <ProposalCard
                  key={index}
                  title={item.title}
                  description={item.summary}
                  location={item.location}
                  owner={item.creator ? item.creator : "anonymous"}
                  canvote={title === "Your Voice" ? "/thumbprint.svg" : ""}
                  voices={
                    title === "Your Voice" && item.voices ? item.voices : ""
                  }
                  proposalID={item.proposalUID}
                />
              );
            })
          )}
        </div>
        <Pagination
          defaultPageSize={pageSize}
          hideOnSinglePage={true}
          current={page}
          onChange={handlePagination}
          defaultCurrent={1}
          total={filteredProposals?.length}
        />
        {title === "Your Proposals" && (
          <div className="fixed bottom-0 py-3 font-extralight text-xs bg-[#ffffff90] backdrop-blur-2xl w-full lg:w-screen lg:max-w-[1280px] flex flex-col items-center gap-2">
            <div className="w-5/6 lg:w-1/3">
              <Button
                className="w-full text-white border-2 border-[#4cc095] text-lg"
                size="large"
                onClick={() => router.push("/proposalform")}
              >
                Write a Proposal
              </Button>
            </div>
            <p>
              powered by <b>impact stream</b>
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
}
