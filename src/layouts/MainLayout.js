import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

export const MainLayout = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">
        {children}
      </header>

      <div className="App-line"></div>
      
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <NavLink to="/" exact activeClassName="App-link">
          Tasks
        </NavLink>
        <NavLink to="/posts" activeClassName="App-link">
          Posts
        </NavLink>
      </main>
    </div>
  )
}