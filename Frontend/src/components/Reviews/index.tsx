import gsap from 'gsap';

const animations = [
  {
    bgColor: '#fc7359',
    indicatorColor: '#790b02',
    pathColor: '#fc7359',
    smileColor: '#790b02',
    titleColor: '#790b02',
    colorBg: '#fc5b3e',
    eyeWidth: 56,
    eyeHeight: 56,
    eyeBorderRadius: '100%',
    eyeBg: '#790b02',
    textColor: '#790b02',
  },
  {
    bgColor: '#dfa342',
    indicatorColor: '#482103',
    pathColor: '#dfa342',
    smileColor: '#482103',
    titleColor: '#482103',
    colorBg: '#b07615',
    eyeWidth: 100,
    eyeHeight: 20,
    eyeBorderRadius: '36px',
    eyeBg: '#482103',
    textColor: '#482103',
  },
  {
    bgColor: '#9fbe59',
    indicatorColor: '#0b2b03',
    pathColor: '#9fbe59',
    smileColor: '#0b2b03',
    titleColor: '#0b2b03',
    colorBg: '#698b1b',
    eyeWidth: 120,
    eyeHeight: 120,
    eyeBorderRadius: '100%',
    eyeBg: '#0b2b03',
    textColor: '#0b2b03',
  },
];

const App = () => {
  const handleClick = (index: number) => {
    const anim = animations[index];

    gsap.to('.note-container', { x: `${index * -100}%` });
    gsap.to('.note', { opacity: 0 });
    gsap.to(`.note:nth-child(${index + 1})`, { opacity: 1 });

    gsap.to('.bg', { backgroundColor: anim.bgColor });
    gsap.to('.indicator', {
      rotate: index === 2 ? 0 : 180,
      left: `${index * 170 + 16}px`,
      backgroundColor: anim.indicatorColor,
    });
    gsap.to('.indicator svg path', { fill: anim.pathColor });
    gsap.to('.smile', { rotate: index === 2 ? 0 : 180 });
    gsap.to('.smile svg path', { fill: anim.smileColor });
    gsap.to('.title', { color: anim.titleColor });
    gsap.to('.color', { backgroundColor: anim.colorBg });
    gsap.to('.eye', {
      width: anim.eyeWidth,
      height: anim.eyeHeight,
      borderRadius: anim.eyeBorderRadius,
      backgroundColor: anim.eyeBg,
    });
    gsap.to('.text', { color: anim.textColor });
  };

  return (
    <div className="bg relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fc7359]" id="app">
      <div className="flex h-full w-[400px] flex-col items-center justify-center p-4">
        <h3 className="title mb-10 w-72 text-center text-xl font-semibold text-[#790b02]">
          Comment a été votre expérience chez nous ?
        </h3>
        <div className="flex h-[176px] flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-8">
            <div className="eye h-14 w-14 rounded-full bg-[#790b02]"></div>
            <div className="eye h-14 w-14 rounded-full bg-[#790b02]"></div>
          </div>
          <div className="smile flex h-14 w-14 rotate-180 items-center justify-center">
            <svg width="431" height="241" viewBox="0 0 431 241" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.9742 0C39.941 0 51.2634 11.3183 51.2634 25.2802C51.2634 116.032 124.859 189.601 215.643 189.601C306.427 189.601 380.023 116.032 380.023 25.2802C380.023 11.3183 391.345 0 405.312 0C419.279 0 430.601 11.3183 430.601 25.2802C430.601 143.956 334.361 240.162 215.643 240.162C96.925 240.162 0.685059 143.956 0.685059 25.2802C0.685059 11.3183 12.0074 0 25.9742 0Z"
                fill="#790b02"
              />
            </svg>
          </div>
        </div>
        <div className="note-container flex w-full items-center justify-start pb-14 pt-7">
          <div className="note flex w-full shrink-0 items-center justify-center">
            <h1 className="text-7xl font-black text-[#e33719]">MAUVAISE</h1>
          </div>
          <div className="note flex w-full shrink-0 items-center justify-center opacity-0">
            <h1 className="text-7xl font-black text-[#b37716]">PAS MAL</h1>
          </div>
          <div className="note flex w-full shrink-0 items-center justify-center opacity-0">
            <h1 className="text-7xl font-black text-[#6e901d]">GÉNIAL</h1>
          </div>
        </div>
        <div className="w-full">
          <div className="relative flex w-full items-center justify-between">
            <button className="button color z-[2] h-6 w-6 rounded-full bg-[#fc5b3e]" onClick={() => handleClick(0)}></button>
            <button className="button color z-[2] h-6 w-6 rounded-full bg-[#fc5b3e]" onClick={() => handleClick(1)}></button>
            <button className="button color z-[2] h-6 w-6 rounded-full bg-[#fc5b3e]" onClick={() => handleClick(2)}></button>
            <div className="color absolute top-1/2 h-1 w-full -translate-y-1/2 bg-[#fc5b3e]"></div>
            <div className="indicator absolute left-4 z-[3] flex h-10 w-10 -translate-x-1/2 rotate-180 items-center justify-center rounded-full bg-[#790b02] p-2">
              <svg className="pt-1" width="431" height="241" viewBox="0 0 431 241" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.9742 0C39.941 0 51.2634 11.3183 51.2634 25.2802C51.2634 116.032 124.859 189.601 215.643 189.601C306.427 189.601 380.023 116.032 380.023 25.2802C380.023 11.3183 391.345 0 405.312 0C419.279 0 430.601 11.3183 430.601 25.2802C430.601 143.956 334.361 240.162 215.643 240.162C96.925 240.162 0.685059 143.956 0.685059 25.2802C0.685059 11.3183 12.0074 0 25.9742 0Z"
                  fill="#fc7359"
                />
              </svg>
            </div>
          </div>
          <div className="flex w-full items-center justify-between pt-6">
            <span className="text w-96 text-left font-medium text-[#790b02]">Mauvaise</span>
            <span className="text w-96 text-center font-medium text-[#790b02] opacity-60">Pas mal</span>
            <span className="text w-96 text-right font-medium text-[#790b02] opacity-60">Génial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;