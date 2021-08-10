import { useQuery } from "react-query";
import { Swapi } from "../interfaces";
import Error from "./Error/Error";
import Planet from "./Planet";
import Spinner from "./Spinner/Spinner";
import { IoPlanetSharp } from "react-icons/io5";
import { useState } from "react";

const getPlanets = async (page: number) => {
    const URL = `http://swapi.dev/api/planets/?page=${page}`;
    const res = await fetch(URL);
    return res.json();
};

const Planets = () => {
    const [page, setPage] = useState(0);
    const { data, isLoading, error, isFetching, isPreviousData } = useQuery(
        ["planets", page],
        () => getPlanets(page),
        {
            keepPreviousData: true,
        }
    );

    if (error) return <Error />;

    return (
        <div className="section bg-blue-100">
            <h1 className="text-gray-800 e bg-gray-100 heading-section ">
                Planets <IoPlanetSharp className="ml-4" />
            </h1>

            {isLoading ? (
                <Spinner />
            ) : (
                <div className="flex flex-wrap m-5 gap-4 ">
                    {data?.results.map((planet: Swapi) => {
                        return <Planet key={planet.name} planet={planet} />;
                    })}
                </div>
            )}
            <div>
                <span>Current Page: {page + 1}</span>
                <button
                    className="btn bg-gray-900 text-gray-50"
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
                >
                    Previous Page
                </button>{" "}
                <button
                    className="btn bg-gray-900 text-gray-50"
                    onClick={() => {
                        if (!isPreviousData && data.hasMore) {
                            setPage((old) => old + 1);
                        }
                    }}
                    // Disable the Next Page button until we know a next page is available
                    disabled={isPreviousData || !data?.hasMore}
                >
                    Next Page
                </button>
                {isFetching ? <span> Loading...</span> : null}{" "}
            </div>
        </div>
    );
};

export default Planets;
