import { Swapi } from "../interfaces";

interface Props {
    planet: Swapi;
}
const Planet: React.FC<Props> = ({ planet }) => {
    return (
        <div className="text-gray-200 bg-gray-900 card ">
            <h4 className="font-bold text-xl text-gray-100 pb-2">
                {planet.name}
            </h4>
            <p>Population: {planet.population}</p>
            <p className="pb-2">Terrain: {planet.terrain} </p>
            <span className="bg-gray-50 text-gray-900 climate ">
                Climate: {planet.climate}
            </span>
        </div>
    );
};

export default Planet;
