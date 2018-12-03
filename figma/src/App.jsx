import Styles from "./App.less";
import quip from "quip";

const URL_REGEX = /https:\/\/([w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const rootRecord = quip.apps.getRootRecord();
    const url = rootRecord.get("url");
    const height = rootRecord.get("height");
    const width = rootRecord.get("width");

    this.state = {
      url,
      height,
      width
    };
  }

  render() {
    console.log('Rendering-------', this.state);
    return (
      <div className={Styles.app}>
        <div className={Styles.inputPanel}>
          <input
            type="text"
            className={Styles.inputUrl}
            value={this.state.url}
            onChange={this.buildUrl}
            placeholder="Paste Figma URL here"
          />
          <label for="width">
            Width:
          </label>
          <input
            type="number"
            className={Styles.inputSize}
            value={this.state.width}
            onChange={this.handleChangeWidth}
          />
          <label for="width">
            Height:
          </label>
          <input
            type="number"
            className={Styles.inputSize}
            value={this.state.height}
            onChange={this.handleChangeHeight}
          />
        </div>
        {this.state.url && (
          <iframe
            ref={this.bindIframe}
            id="iframe1"
            className={Styles.iframe}
            src={`https://www.figma.com/embed?embed_host=quip&url=${
              this.state.url
            }`}
            height={this.state.height}
            width={this.state.width}
            /* onLoad={this.autoResize} */
          />
        )}
      </div>
    );
  }

  buildUrl = e => {
    const urlValue = e.target.value;
    if (urlValue && urlValue !== this.state.url && URL_REGEX.test(urlValue)) {
      quip.apps.getRootRecord().set("url", urlValue);
      this.setState({ url: urlValue });
    }
  };

  handleChangeHeight = e => {
    const height = e.target.value ? parseInt(e.target.value) : 0;
    if (height > 0 && height !== this.state.height) {
      quip.apps.getRootRecord().set("height", height);
      this.setState({ height });
    }
  };

  handleChangeWidth = e => {
    const width = e.target.value ? parseInt(e.target.value) : 0;
    if (width > 0 && width !== this.state.width) {
      quip.apps.getRootRecord().set("width", width);
      this.setState({ width });
    }
  };

  bindIframe = ref => {
    this.iframe = ref;
  };

  // autoResize = () => {
  // cannot access contentWindow because of cross-domain security
  //   const newHeight = this.iframe.contentWindow.document.body.scrollHeight;
  //   const newWidth = this.iframe.contentWindow.document.body.scrollWidth;

  //   this.iframe.height= (newheight) + "px";
  //   this.iframe.width= (newwidth) + "px";
  // }
}
