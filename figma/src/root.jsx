import quip from "quip";
import App from "./App.jsx";
// import ImgRootRecord from "./ImgRootRecord.jsx";
class RootRecord extends quip.apps.RootRecord {
  static getProperties() {
    return {
      url: "string"
    };
  }

  static getDefaultProperties() {
    return {
      url: undefined,
    };
  }
}
quip.apps.registerClass(RootRecord, "root");

quip.apps.initialize({
  initializationCallback: function(rootNode) {
    ReactDOM.render(<App/>, rootNode);
  }
});
