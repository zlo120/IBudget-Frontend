import Navbar from "../ui/navbar/navbar";
import Sidebar from "../ui/sidebar/sidebar";

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Navbar />
            <main style={{display: "flex"}}>
                <Sidebar />
                {children}
            </main>
        </>
    )
};

export default MainLayout;