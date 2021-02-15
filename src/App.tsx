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
          </header>
        </div>
    );
  }


}

export default App;
