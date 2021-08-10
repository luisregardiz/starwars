import { useState } from "react";
import Navbar from "./components/Navbar";
import Peoples from "./components/Peoples";
import Planets from "./components/Planets";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    const [page, setPage] = useState(false);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto px-4">
                <Navbar setPage={setPage} />
                {page ? <Peoples /> : <Planets />}
            </div>
        </QueryClientProvider>
    );
}

export default App;
