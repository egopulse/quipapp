import quip from "quip";
import App from "./App.jsx";
// import ImgRootRecord from "./ImgRootRecord.jsx";
class RootRecord extends quip.apps.RootRecord {
  static getProperties() {
    return {
      url: "string",
      width: "number",
      height: "number"
    };
  }

  static getDefaultProperties() {
    return {
      url: undefined,
      width: 1280,
      height: 600
    };
  }
}
quip.apps.registerClass(RootRecord, "root");

quip.apps.initialize({
  initializationCallback: function(rootNode) {
    ReactDOM.render(<App/>, rootNode);
  }
});
