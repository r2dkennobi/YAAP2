import React, { PropTypes, Component } from 'react';

export default class AsyncBar extends Component {
    static propTypes = {
        error: PropTypes.string
    };

    render() {
        let error = (this.props.error) ? this.renderError() : null;

        return (
            <section className='async'>
                {error}
            </section>
        );
    }

    renderError() {
        return (
            <p className="async-error">
                {this.props.error}
            </p>
        );
    }
}
