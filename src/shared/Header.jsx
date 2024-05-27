// eslint-disable-next-line react/prop-types
const Header = ({headerText}) => {
    return (
        <div className="flex items-center justify-center">
            <h1 className="py-10 text-4xl font-bold">{headerText}</h1>
        </div>
    );
};

export default Header;