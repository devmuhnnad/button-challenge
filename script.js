const evilButton = document.querySelector("#evil-button");
const OFFSET = 100;
evilButton.addEventListener("click", (e) => {
  alert("Nice try!");
  window.close();
});

document.addEventListener("mousemove", (e) => {
  const { pageX: x, pageY: y } = e;
  const {
    x: buttonX,
    y: buttonY,
    width: buttonWidth,
    height: buttonHeight,
  } = evilButton.getBoundingClientRect();
  const horizontalDistanceFrom = distanceFromCenter(buttonX, x, buttonWidth);
  const verticalDistanceFrom = distanceFromCenter(buttonY, y, buttonHeight);
  const horizontalOffset = buttonWidth / 2 + OFFSET;
  const verticalOffset = buttonHeight / 2 + OFFSET;

  if (
    Math.abs(horizontalDistanceFrom) <= horizontalOffset &&
    Math.abs(verticalDistanceFrom) <= verticalOffset
  ) {
    setButtonPosition(
      buttonX + (horizontalOffset / horizontalDistanceFrom) * 3,
      buttonY + (verticalOffset / verticalDistanceFrom) * 3
    );
  }
});

function setButtonPosition(left, top) {
  const {
    left: windowLeft,
    right: windowRight,
    top: windowTop,
    bottom: windowBottom,
  } = document.body.getBoundingClientRect();
  const {
    x: buttonX,
    y: buttonY,
    width: buttonWidth,
    height: buttonHeight,
  } = evilButton.getBoundingClientRect();

  if (distanceFromCenter(left, windowLeft, buttonWidth) < 0) {
    left = windowRight - buttonWidth - OFFSET;
  }
  console.log(distanceFromCenter(windowRight, left, buttonWidth));
  if (distanceFromCenter(top, windowTop, buttonHeight) < 0) {
    top = windowBottom - buttonHeight - OFFSET;
  }

  if (distanceFromCenter(left, windowRight, buttonWidth) > 0) {
    left = windowLeft + OFFSET;
  }

  if (distanceFromCenter(top, windowBottom, buttonHeight) > 0) {
    top = windowTop + OFFSET;
  }

  evilButton.style.top = `${top}px`;
  evilButton.style.left = `${left}px`;
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
