import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <motion.button
                className="bg-[#fbfbf9] relative border border-[#efefef] text-[#666664] flex items-center justify-center gap-2 py-4 px-8"
                style={{
                    borderRadius: 50,
                }}
                onClick={() => setIsModalOpen(true)}
                layoutId="modal"
            >
                <motion.div>
                    <User size={24} />
                </motion.div>
                    <motion.span className="font-medium" layoutId="title">
                        Login
                    </motion.span>
            </motion.button>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div>
                        test
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default Login;