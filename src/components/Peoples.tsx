import { IoIosPeople } from "react-icons/io";
import { useQuery } from "react-query";
import { Swapi } from "../interfaces";
import Error from "./Error/Error";
import People from "./People";
import Spinner from "./Spinner/Spinner";

const getPeople = async() => {
    const URL = "http://swapi.dev/api/people";
    const res = await fetch(URL);
    return res.json();
};


const Peoples = () => {
    const { data, isLoading, error } = useQuery("people", getPeople);


    if (error) return <Error />;
    return (
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
    );
};

export default Peoples;
