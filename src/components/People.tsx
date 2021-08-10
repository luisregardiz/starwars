import { Swapi } from "../interfaces";

interface Props {
    people: Swapi;
}

const People: React.FC<Props> = ({ people }) => {
    return (
        <div className="text-gray-200 bg-gray-900 card">
            <h4 className="font-bold text-xl text-gray-100 pb-2">
                {people.name}
            </h4>
            <p>Gender: {people.gender}</p>
            <p className="pb-2">Height: {people.height} </p>
            <span className="bg-gray-50 text-gray-900 climate ">
                Birth year: {people.birth_year}
            </span>
        </div>
    );
};

export default People;
