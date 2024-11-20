import HeaderButton from "./HeaderButton";

interface HeaderMenuProps {
    view: "grid" | "list" | "calendar";
    setView: React.Dispatch<React.SetStateAction<"grid" | "list" | "calendar">>;
}

const HeaderMenu = ({ view, setView }: HeaderMenuProps) => {
    return (
        <div className="flex items-center gap-1 border border-zinc-700/50 rounded-xl p-1">
            <HeaderButton view={view} setView={setView} onClick="grid" />
            <HeaderButton view={view} setView={setView} onClick="list" />
            <HeaderButton view={view} setView={setView} onClick="calendar"/>
        </div>
    )
};

export default HeaderMenu;