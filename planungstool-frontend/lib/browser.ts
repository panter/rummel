export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const browserScrollToWithOffset = (
  querySelectorOrElement: string | Element,
  {
    offset = 0,
    behavior = 'smooth',
    scrollDown = true,
    scrollUp = true,
  }: {
    offset?: number;
    behavior?: ScrollBehavior;
    scrollDown?: boolean;
    scrollUp?: boolean;
  },
) => {
  // scroll into view with offset
  // https://stackoverflow.com/questions/49820013/javascript-scroliintoview-smooth-scroll-and-offset
  const element =
    typeof querySelectorOrElement === 'string'
      ? document.querySelector(querySelectorOrElement)
      : querySelectorOrElement;

  if (!element) {
    return;
  }

  const bodyTop = document.body.getBoundingClientRect().top;
  const elementTop = element.getBoundingClientRect().top;
  const elementPosition = elementTop - bodyTop;
  const offsetPosition = elementPosition - offset;
  const willScrollDown = elementTop - offset > 0;
  // prevent scrolling, if disabled
  if (!scrollDown && willScrollDown) {
    return;
  }
  if (!scrollUp && !willScrollDown) {
    return;
  }
  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
};
