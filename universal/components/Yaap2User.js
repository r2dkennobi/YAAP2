import React, { PropTypes, Component } from 'react';

export default class Yaap2User extends Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        username: PropTypes.string.isRequired,
        editReceipt: PropTypes.func,
        deleteReceipt: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);
        this.state = { editing: false };
    }

    handleClick() {
        this.setState({ editing: true });
    }

    render() {
        const { id } = this.props;

        let element;

        if (this.state.editing) {
            element = (
                <div className='card blue-grey darken-1'>
                </div>
            );
        } else {
            element = (
                <div className='card blue-grey darken-1'>
                </div>
            );
        }

        return (
            <div className='col s6'>{element}</div>
        );
    }
}
