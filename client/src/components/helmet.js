import React from "react";
import { Helmet } from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Surf App | Home</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link href="/css/custom.css" rel="stylesheet"></link>
            </Helmet>
        </div>
    );
  }
};

export default Application;