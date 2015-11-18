import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import ReceiptList from '../components/ReceiptList';
import ReceiptInput from '../components/ReceiptInput';

export default class Yaap2App extends Component {
    static propTypes = {
        addReceipt: React.PropTypes.func.isRequired,
        editReceipt: React.PropTypes.func.isRequired,
        deleteReceipt: React.PropTypes.func.isRequired,
        userId: React.PropTypes.string,
        receipts: React.PropTypes.array,
        error: React.PropTypes.any,
    };

    render() {
        let actions = {
            editReceipt: this.props.editReceipt,
            deleteReceipt: this.props.deleteReceipt
        };

        return (
            <div>
                <Header/>
                <section className="Yaap2-addReceiptForm">
                    <ReceiptInput onSubmit={this.props.addReceipt}
                                  userId={this.props.userId} />
                </section>
                <ReceiptList receipts={this.props.receipts} userId={this.props.userId} actions={actions} />
            </div>
        );
    }
}
