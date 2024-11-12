import HeaderButton from "./HeaderButton";

interface HeaderMenuProps {
    view: "calendar" | "flash";
    setView: React.Dispatch<React.SetStateAction<"calendar" | "flash">>;
}

const HeaderMenu = ({ view, setView }: HeaderMenuProps) => {
    return (
        <div className="flex items-center gap-1 border border-zinc-700/50 rounded-xl p-1">
            <HeaderButton view={view} setView={setView} onClick="calendar" />
            <HeaderButton view={view} setView={setView} onClick="flash" />
        </div>
    )
};

export default HeaderMenu;