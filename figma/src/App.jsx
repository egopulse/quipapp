import Styles from "./App.less";
import quip from "quip";

const URL_REGEX = /https:\/\/([w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const rootRecord = quip.apps.getRootRecord();
    const url = rootRecord.get("url");
    this.state = {
      url: url
    };
  }

  render() {
    return (
      <div className={Styles.app}>
        <input
          className={Styles.input}
          type="text"
          value={this.state.url}
          onChange={this.buildUrl}
          placeholder="Paste Figma URL here"
        />
        {this.state.url && (
          <iframe
            className={Styles.iframe}
            src={`https://www.figma.com/embed?embed_host=quip&url=${
              this.state.url
            }`}
            height="600"
            width="1280"
            allowfullscreen
          />
        )}
      </div>
    );
  }

  buildUrl = e => {
    const urlValue = e.target.value;
    if (urlValue && urlValue !== this.state.url && URL_REGEX.test(urlValue)) {
      quip.apps.getRootRecord().set("url", urlValue)
      this.setState({ url: urlValue });
    }
  };
}
