import { IoIosPeople } from "react-icons/io";
import { useQuery } from "react-query";
import { Swapi } from "../interfaces";
import Error from "./Error/Error";
import People from "./People";
import Spinner from "./Spinner/Spinner";
import { useState } from "react";


const getPeople = async (page: number) => {
    const URL = `https://swapi.dev/api/people/?page=${page}`;
    const res = await fetch(URL);
    return res.json();
};

const Peoples = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, error, isPreviousData } = useQuery(
        ["people", page],
        () => getPeople(page),
        {
            keepPreviousData: true,
        }
    );

    if (error) return <Error />;
    return (
        <>
            <div className="section bg-yellow-50">
                <h1 className="text-gray-800 bg-gray-50  heading-section">
                    People <IoIosPeople className="ml-4" />
                </h1>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-wrap m-5 gap-4 ">
                        {data?.results.map((people: Swapi) => {
                            return <People key={people.name} people={people} />;
                        })}
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center space-x-4 my-4">
                <button
                    className="btn bg-gray-100 text-gray-900 "
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>{" "}
                <span className="bg-gray-700 px-4 py-1 rounded-lg  text-gray-100 font-bold">
                    {page}
                </span>
                <button
                    className="btn bg-gray-100 text-gray-900  "
                    onClick={() => {
                        if (!isPreviousData) {
                            setPage((old) => old + 1);
                        }
                    }}
                    // Disable the Next Page button until we know a next page is available
                    disabled={isPreviousData || data?.next === null}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Peoples;
