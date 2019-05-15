import Gesture from "../src/index";

const g = new Gesture(document.getElementById("app"), {
  onStateChange: (v) => {console.log("onStateChange", v)},
  onChange: (v) => {console.log("onChange", v)},
  onEnd: (v) => {
    setTimeout(() => g.changeState('success'), 1000)
    setTimeout(() => g.reset(), 2000)
  },
});
