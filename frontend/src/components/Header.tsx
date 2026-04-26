import logo from "../images/logo.png";

const Header: React.FC = () => {
    return (
        <>
            <header className="p-2.5 text-center">
                <div className="items-center">
                    <h1 className="flex items-center justify-center gap-2 dm-serif-display-regular text-5xl tracking-widest">
                        Molly Tea
                        <img className="w-14" src={logo} alt="Molly Tea Logo" />
                    </h1>
                </div>
            </header>
        </>
    );
};

export default Header;