interface ResButtonProps {
    res_id: number;
    name: string;
    style: string;
    handle?: (res_id: number) => void;
}

const ResButton = ({ res_id, name, style, handle}: ResButtonProps) => {
    return (
        <button
            className={`${style} flex font-medium capitalize items-center justify-center text-sm border-2 rounded-lg py-1.5 px-3 w-25 text-center m-1`}
            onClick={() => handle && handle(res_id)}
        >
            {name}
        </button>
    )
};

export default ResButton;