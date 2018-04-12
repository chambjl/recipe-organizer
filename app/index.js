const React = require('react');
const ReactDOM = require('react-dom');
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import { Router, Route, Link, browserHistory } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Groot = React.createClass({
  render(){
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar title="Freakin' Recipes!!!" />
      </MuiThemeProvider>
    )
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
      console.log('setting context!!');
      return {
          muiTheme: getMuiTheme(darkBaseTheme)
      };
  }
});

const About = React.createClass({
  render(){
    return (
      <h1>About</h1>
    )
  }
})

ReactDOM.render(render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="recipes" component={Recipes}>
        <Route path="/recipes/:recipeId" component={Recipes}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
),document.getElementById('groot'));
