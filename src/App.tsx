import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Context, SupportedLanguages} from "./components/Wrapper";
import {FormattedMessage} from "react-intl";

class App extends React.Component<any, any>{
  static contextType = Context;

  render() {
      const languagesOptions = SupportedLanguages.map( taal => <option key={taal.name} value={taal.name} title={taal.hint}>{taal.title}</option>)
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <h2>
                  <FormattedMessage
                      id="app.header"
                      defaultMessage="Automatic translation"
                      description="Main Application header"
                  />
              </h2>
              <h3>
                  <FormattedMessage
                      id="app.text"
                      defaultMessage="Hello, welcome {user}"
                      description="Welcome message"
                      values={{ user: "John Doe" }}/>
              </h3>
              <h4>
                  <FormattedMessage
                      id="app.info"
                      defaultMessage="The translations are automated with Microsft Azure Translation Service"
                      description="Main Application info"
                  />
              </h4>
              <a href="https://dev.luciad.com" target="_blank" rel="noopener noreferrer">
                  <FormattedMessage
                      id="app.link"
                      defaultMessage="Go to link"
                      description="Check website"/>
              </a>
              <br/>
              <select value = {this.context.locale} onChange={this.context.selectLanguage}>
                  {languagesOptions}
              </select>
              <p>{this.context.rtl ? "rtl" : "ltr"}</p>
              <p className="App-text" style={{direction: this.context.rtl ? "rtl" : "ltr"}}>
                  <FormattedMessage
                      id="app.sonnet"
                      defaultMessage=" Weary with toil, I haste me to my bed,
                  The dear repose for limbs with travel tired;
                  But then begins a journey in my head,
                  To work my mind, when body’s work’s expired:
                  For then my thoughts (from far where I abide)
                  Intend a zealous pilgrimage to thee,
                  And keep my drooping eyelids open wide,
                  Looking on darkness which the blind do see:
                  Save that my soul’s imaginary sight
                  Presents thy shadow to my sightless view,
                  Which, like a jewel hung in ghastly night,
                  Makes black night beauteous and her old face new.
                  Lo, thus, by day my limbs, by night my mind,
                  For thee, and for myself, no quiet find."
                      description="Main Application sonnet"
                  />
                 </p>
          </header>

        </div>
    );
  }


}

export default App;
