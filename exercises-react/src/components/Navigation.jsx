import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <nav>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/create-exercise">Create an exercise</Link>
        </nav>
    );
}

export default Navigation;