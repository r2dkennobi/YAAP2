import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import Header from '../components/Header';
import UserPane from '../components/UserPane';
import ReceiptList from '../components/ReceiptList';
import ReceiptInput from '../components/ReceiptInput';

export default class Yaap2App extends Component {
    static propTypes = {
        addReceipt: React.PropTypes.func.isRequired,
        editReceipt: React.PropTypes.func.isRequired,
        deleteReceipt: React.PropTypes.func.isRequired,
        loginUser: React.PropTypes.func.isRequired,
        logoutUser: React.PropTypes.func.isRequired,
        createUser: React.PropTypes.func.isRequired,
        editUser: React.PropTypes.func.isRequired,
        deleteUser: React.PropTypes.func.isRequired,
        userName: React.PropTypes.string,
        userRealName: React.PropTypes.string,
        userId: React.PropTypes.string,
        userEmail: React.PropTypes.string,
        userRole: React.PropTypes.string,
        receipts: React.PropTypes.array,
        error: React.PropTypes.any,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let userActions = {
            loginUser: this.props.loginUser,
            logoutUser: this.props.logoutUser,
            createUser: this.props.createUser,
            editUser: this.props.editUser,
            deleteUser: this.props.deleteUser,
        }
        let receiptActions = {
            editReceipt: this.props.editReceipt,
            deleteReceipt: this.props.deleteReceipt
        };

        let receiptInputEl = (this.props.userId.length !== 0) ?
                            <ReceiptInput onSubmit={this.props.addReceipt}
                                          userId={this.props.userId} /> : null;
        let receiptListEl = (this.props.userId.length !== 0) ?
                            <ReceiptList receipts={this.props.receipts}
                                         userId={this.props.userId}
                                         userRole={this.props.userRole}
                                         actions={receiptActions} /> : null;

        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="col s6">
                        <UserPane userName={this.props.userName}
                                  userRealName={this.props.userRealName}
                                  userId={this.props.userId}
                                  userEmail={this.props.userEmail}
                                  {...userActions} />
                    </div>
                    <div className="col s6">
                        {receiptInputEl}
                    </div>
                </div>
                {receiptListEl}
            </div>
        );
    }
}
