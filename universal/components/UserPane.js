import React, { PropTypes, Component } from 'react';
import uuid from 'node-uuid';

export default class UserPane extends Component {
    static propTypes = {
        loginUser: React.PropTypes.func.isRequired,
        logoutUser: React.PropTypes.func.isRequired,
        createUser: React.PropTypes.func.isRequired,
        editUser: React.PropTypes.func.isRequired,
        deleteUser: React.PropTypes.func.isRequired,
        userName: PropTypes.string.isRequired,
        userId: PropTypes.any.isRequired,
        userEmail: PropTypes.string.isRequired,
        error: React.PropTypes.any
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,
            userName: this.props.userName,
            userId: this.props.userId,
            userEmail: this.props.userEmail,
            password: '',
            userCreateFlag: false
        };
    }

    handleUsernameChange(e) {
        this.setState({ userName: e.target.value });
    }

    handlePassChange(e) {
        this.setState({ password: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ userEmail: e.target.value });
    }

    handleEdit () {
        this.setState({ 
            editing: true,
            userName: this.props.userName,
            userEmail: this.props.userEmail,
            userId: this.props.userId
        });
    }

    handleUserCreateFlag() {
        if (this.state.userCreateFlag) {
            this.setState({ userCreateFlag: false });
        } else {
            this.setState({ userCreateFlag: true });
        }
    }

    handleSubmit(e) {
        let errors;
        e.preventDefault();

        if (this.state.editing) {
            this.props.editUser({ userName: this.state.userName,
                                  userId: this.state.userId,
                                  userEmail: this.state.userEmail });
        } else if (this.state.userCreateFlag) {
            this.props.createUser({ userName: this.state.userName,
                                    userId: this.state.userId,
                                    userEmail: this.state.userEmail,
                                    password: this.state.password });
        } else {
            this.props.loginUser({ userName: this.state.userName,
                                   password: this.state.password});
        }
        this.setState({
            editing: false,
            userName: this.props.userName,
            userId: this.props.userId,
            userEmail: this.props.userEmail,
            password: '',
            userCreateFlag: false
        });
    }

    render() {
        const { loginUser, logoutUser, editUser, deleteUser, createUser,
                userName, userId, userEmail } = this.props;

        let element;

        let userEmailEl = (this.state.userCreateFlag) ?
                           <div className="input-field col s12">
                               <input type='text'
                                      id="emailEl"
                                      value={this.state.userEmail}
                                      onChange={::this.handleEmailChange}/>
                               <label className="active" htmlFor="emailEl">Email</label>
                           </div> : null;
        let sliderEl = (this.state.editing) ? null :
                       <div className="input-field col s6">
                           <div className="switch">
                               <label>
                                   Login
                                   <input type="checkbox" onChange={::this.handleUserCreateFlag}/>
                                   <span className="lever"></span>
                                   Create User
                               </label>
                           </div>
                       </div>;

        if (userId.length === 0 || this.state.editing) {
            element = (
                <form method='GET' className='col s12'>
                    <div className="input-field col s12">
                        <input type='text'
                               id="usernameEl"
                               value={this.state.userName}
                               onChange={::this.handleUsernameChange}/>
                        <label className="active" htmlFor="usernameEl">Username</label>
                    </div>
                    <div className="input-field col s12">
                        <input type='text'
                               id="passEl"
                               value={this.state.password}
                               onChange={::this.handlePassChange}/>
                        <label className="active" htmlFor="passEl">Password</label>
                    </div>
                    {userEmailEl}
                    <div className="row">
                        {sliderEl}
                        <div className="input-field col s6">
                            <button type='submit'
                                    className='btn waves-effect waves-light'
                                    onClick={::this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </form>
            );
        } else {
            element = (
                <div className='card blue-grey'>
                    <div className="card-content">
                        <span className="card-title">{userName}</span>
                        <p className="userEmail">{userEmail}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" onClick={::this.handleEdit}>Edit</a>
                        <a href="#" onClick={ () => logoutUser(userId) }>Logout</a>
                    </div>
                </div>
            );
        }

        return (
            <div className='col s12'>
                {element}
            </div>
        );
    }
}
