import { TimelineMax as Timeline, Power1 } from "gsap";

export const play = (animationKey, node, appears, index) => {
  const delay = appears ? 0.15 : 0.5;
  let timeline;

  // @TODO: separate animations, beyond default
  // if (animationKey === "panelLoader")
  //   timeline = getDefaultTimeline(node, delay);
  // else

  timeline = getDefaultTimeline(node, delay * index);

  requestAnimationFrame(() => timeline.play());
};

const getDefaultTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true });
  const content = node.querySelector(".content");
  const contentInner = node.querySelector(".content--inner");

  timeline
    .from(node, 0.3, { display: "none", autoAlpha: 0, delay, ease: Power1.easeIn })
    .from(content, 0.3, { autoAlpha: 0, y: 25, ease: Power1.easeInOut })
    .from(contentInner, 0.15, { autoAlpha: 0, delay: 0.15, ease: Power1.easeIn });

  return timeline;
};

export const exit = (node) => {
  const timeline = new Timeline({ paused: true });

  timeline.to(node, 0.15, { autoAlpha: 0, ease: Power1.easeOut });
  timeline.play();
};
