import { useQuery } from "react-query";
import { Swapi } from "../interfaces";
import Error from "./Error/Error";
import Planet from "./Planet";
import Spinner from "./Spinner/Spinner";
import { IoPlanetSharp } from "react-icons/io5";
import { useState } from "react";

const getPlanets = async (page: number) => {
    const URL = `https://swapi.dev/api/planets/?page=${page}`;
    const res = await fetch(URL);
    return res.json();
};

const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, isPreviousData } = useQuery(
        ["planets", page],
        () => getPlanets(page),
        {
            keepPreviousData: true,
        }
    );

    if (error) return <Error />;
    console.log();
    return (
        <>
            <div className="section bg-blue-100 ">
                <h1 className="text-gray-800 e bg-gray-100 heading-section ">
                    Planets <IoPlanetSharp className="ml-4" />
                </h1>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-wrap m-5 gap-4">
                        {data?.results.map((planet: Swapi) => {
                            return <Planet key={planet.name} planet={planet} />;
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
                <span className="bg-gray-700 px-4 py-1 rounded-lg  text-gray-100 font-bold">{page}</span>
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

export default Planets;
