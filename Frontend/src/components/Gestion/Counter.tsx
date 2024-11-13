import { Minus, Plus } from "lucide-react";
import React from "react";

interface CounterProps {
    min_player: number;
    max_player: number;
}

const Counter = ({ min_player, max_player }: CounterProps) => {
    const [count, setCount] = React.useState(min_player);

    return (
        <div className="relative flex items-center justify-center">
            <div className="flex flex-col items-center z-10">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex items-center justify-center">
                        <button className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center active:scale-90">
                            <Minus className="w-5" onClick={() => { if (count > min_player) setCount(count - 1) }} />
                        </button>
                        <div className="flex items-center justify-center mx-8 mt-1">
                            <h3 className="w-16 text-center flex items-center justify-center text-black shrink-0">
                                <span className="text-4xl font-medium w-7">{count}</span>
                            </h3>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center active:scale-90">
                            <Plus className="w-5" onClick={() => { if (count < max_player) setCount(count + 1) }} />
                        </button>
                    </div>
                    <p className="text-black/50">
                        Le maximum est de {max_player} personnes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Counter;