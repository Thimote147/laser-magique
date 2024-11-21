import { Minus, Plus } from "lucide-react";
import AnimatedNumbers from "react-animated-numbers";

interface CounterProps {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    min_player: number;
    max_player: number;
}

const Counter = ({ count, setCount, min_player, max_player }: CounterProps) => {
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
                                <span className={`text-4xl font-medium ${count < 10 ? 'w-7' : 'w-12'}`}>
                                    <AnimatedNumbers
                                        includeComma
                                        className="font-medium text-black"
                                        transitions={() => ({
                                            type: 'spring',
                                            duration: 0.3,
                                        })}
                                        animateToNumber={count} />
                                </span>
                            </h3>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center active:scale-90">
                            <Plus className="w-5" onClick={() => { if (count < max_player) setCount(count + 1) }} />
                        </button>
                    </div>
                    <p className="text-black/50">
                        Entre {min_player} et {max_player} personnes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Counter;