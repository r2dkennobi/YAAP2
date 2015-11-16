import React from 'react';

export default class Yaap2Home extends Component {
    static propTypes = {
        isAllowed: PropTypes.bool.isRequired,
        actions: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
            {this.state.isAllowed ? (
                <Link to="/logout">Logout</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
            {this.props.children}
            </div>
        );
    }
}
