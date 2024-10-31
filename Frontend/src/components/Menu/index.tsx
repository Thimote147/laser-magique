import { AnimatePresence, motion } from "framer-motion";
import menuItems from "../Menu/MenuItems";
import { handleMouseEnter, handleMouseLeave } from "../EventHandlers";
import { useActiveIndex, useShowInfo } from "../useCustomHooks";
import menuItemsContent from "./MenuItemsContent";
import { X } from "lucide-react";

const Menu = () => {
  const { showInfo, setShowInfo, ref } = useShowInfo();
  const { activeIndex, setActiveIndex, menuRef } = useActiveIndex();

  return (
    <>
      <motion.div
          className="flex items-center justify-center gap-2 bg-transparent w-[960px] absolute -translate-x-1/2 left-1/2 bottom-5 z-[2]"
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
            className="bg-transparent backdrop-blur-xl overflow-hidden"
            style={{
              borderRadius: 16,
            }}
            animate={{
              width:
                activeIndex !== null
                  ? ["1000px", "1000px", "1000px", "1000px", "1000px", "1000px"][activeIndex]
                  : "960px",
              height:
                activeIndex !== null
                  ? ["85px", "280px", "500px", "85px", "160px", "85px"][activeIndex]
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
        <AnimatePresence>
          {showInfo ? (
            <div className="absolute inset-0 z-10">
              <div className="absolute -translate-x-1/2 left-1/2 bottom-14">
                <motion.div
                  className="bg-white/50 backdrop-blur-2xl overflow-hidden w-[600px] h-[400px] p-4"
                  style={{
                    borderRadius: 18,
                  }}
                  ref={ref}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.button
                    layout
                    onClick={() => setShowInfo(false)}
                    className="absolute top-4 right-4"
                  >
                    <X size={24} />
                  </motion.button>
                  <motion.img
                    src="/ln.jpg"
                    alt="Gather"
                    className="w-32 h-32 object-cover"
                    style={{
                      borderRadius: 12,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    initial={{ y: 20, opacity: 0 }}
                  />
                  <motion.p
                    className="block mb-2 mt-5"
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    initial={{ y: 20, opacity: 0 }}
                  >
                    I am a FrontEnd Developer and Awwwards Young Jury from
                    Cameroon, I’m passionate about creating beautiful, intuitive
                    and responsive websites
                  </motion.p>
                  <motion.p
                    className="block mt-2 mb-5"
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    initial={{ y: 20, opacity: 0 }}
                  >
                    I’m passionate about photography and I enjoy capturing the
                    world around me. I’m always looking for new ways to express
                    my creativity and share my perspective with others.
                  </motion.p>
                  <div className="w-full flex items-center justify-end">
                    <motion.a
                      href="https://lndev.me"
                      className="bg-white rounded-xl py-2.5 px-7 block w-fit font-medium"
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      initial={{ y: 20, opacity: 0 }}
                    >
                      View Portfolio
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : null}
        </AnimatePresence>
    </>
  );
};

export default Menu;