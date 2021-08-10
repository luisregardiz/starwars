interface Props {
    setPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar:React.FC<Props> = ({setPage}) => {
    return (
        <nav className="flex justify-between my-5">
            <h4 className="text-xl font-bold">Star Wars Info</h4>
            <div className="space-x-4">
                <button className="btn bg-gray-50 text-gray-900 hover:opacity-90 " onClick={() => setPage(true)}>People</button>
                <button className="btn bg-gray-50 text-gray-900 hover:opacity-90  "  onClick={() => setPage(false)}>Planets</button>
            </div>
        </nav>
    );
};

export default Navbar;
