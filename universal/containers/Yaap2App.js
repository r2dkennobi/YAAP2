import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import Header from '../components/Header';
import ReceiptList from '../components/ReceiptList';
import AsyncBar from '../components/AsyncBar';
import ReceiptInput from '../components/ReceiptInput';

import * as Yaap2Actions from '../actions/Yaap2Actions';

export default class Yaap2App extends Component {
    static propTypes = {
        addReceipt: React.PropTypes.func.isRequired,
        editReceipt: React.PropTypes.func.isRequired,
        deleteReceipt: React.PropTypes.func.isRequired,
        userId: React.PropTypes.string,
        receipts: React.PropTypes.array,
        isWorking: React.PropTypes.bool,
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
                                  userId={this.props.userId}
                                  descLabel='What did you buy?'
                                  dateLabel='When did you purchase?'
                                  categoryLabel='What category?'
                                  merchantLabel='Which merchant?'
                                  receiptLabel='Receipt name?'
                                  amountLabel='How much?'/>
                </section>
                <AsyncBar isWorking={this.props.isWorking} error={this.props.error} />
                <ReceiptList receipts={this.props.receipts} userId={this.props.userId} actions={actions} />
            </div>
        );
    }
}
