import { AnimatePresence, motion } from "framer-motion";
import menuItems from "../Menu/MenuItems";
import { handleMouseEnter, handleMouseLeave } from "../EventHandlers";
import { useActiveIndex, useShowInfo } from "../useCustomHooks";
import menuItemsContent from "./MenuItemsContent";

const Menu = () => {
  const { setShowInfo } = useShowInfo();
  const { activeIndex, setActiveIndex, menuRef } = useActiveIndex();

  return (
    <div className="fixed bottom-0">
      <motion.div
        className="flex items-center justify-center gap-2 bg-transparent w-[960px] absolute -translate-x-1/2 left-1/2 bottom-5 z-[2] overflow-scroll"
        style={{
          borderRadius: 16,
        }}
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            className="flex items-center justify-center gap-2 hover:bg-zinc-950 hover:text-white duration-300 transition-colors py-3 px-4"
            style={{
              borderRadius: 16,
            }}
            onMouseEnter={() => handleMouseEnter(index, setActiveIndex)}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </motion.div>
      <div className="absolute -translate-x-1/2 left-1/2 bottom-14">
        <motion.div
          ref={menuRef}
          className="bg-transparent backdrop-blur-xl w-full"
          style={{
            borderRadius: 16,
          }}
          animate={{
            width:
              activeIndex !== null
                ? "90vw"
                : "960px",
            height:
              activeIndex !== null
                ? ["85px", "280px", "540px", "85px", "160px", "85px"][activeIndex]
                : "48px",
            y: activeIndex !== null ? 52 : 36,
            borderRadius: activeIndex !== null ? 24 : 16,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          onMouseLeave={(event) => handleMouseLeave(event, menuRef, setActiveIndex)}
        >
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                key={activeIndex}
                className="p-4 flex flex-col items-center absolute w-full bottom-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuItemsContent[activeIndex].items.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[95%] flex items-center gap-1.5 cursor-pointer hover:bg-black/5 py-3 hover:px-3 duration-300"
                    onClick={() => setShowInfo(true)}
                    style={{
                      borderRadius: 16,
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 object-cover h-16 shrink-0 mr-1.5"
                        style={{
                          borderRadius: 12,
                        }}
                      />
                    )}
                    {item.icon && <div className="mr-1.5">{item.icon}</div>}
                    <div className="w-full flex flex-col items-start">
                      <p className="font-medium">{item.title}</p>
                      {item.description && (
                        <p className="opacity-80">{item.description}</p>
                      )}
                    </div>
                    {item.tag && (
                      <span
                        className="block shrink-0 py-1 px-2 text-sm opacity-80 border border-black/50"
                        style={{
                          borderRadius: 8,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                ))}
                <div className="h-[2px] w-[95%] bg-black/10 mt-4"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;