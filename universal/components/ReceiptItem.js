import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import ReceiptInput from './ReceiptInput';

export default class ReceiptItem extends Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        receipt: PropTypes.object.isRequired,
        editable: PropTypes.bool,
        editReceipt: PropTypes.func,
        deleteReceipt: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);
        this.state = { editing: false };
    }

    handleClick() {
        if (this.props.editable) {
            this.setState({ editing: true });
        }
    }

    handleSave(receipt) {
        if (receipt.desc.length === 0) {
            this.props.deleteReceipt(receipt);
        } else {
            this.props.editReceipt(receipt);
        }
        this.state = { editing: false };
    }

    render() {
        const { id, receipt, editReceipt, deleteReceipt } = this.props;

        let element;
        let modified = (receipt.updated) ? receipt.updated : receipt.created;

        if (this.state.editing) {
            element = (
                <ReceiptInput desc={receipt.desc}
                              dateOfPurchase={receipt.dateOfPurchase}
                              category={receipt.category}
                              merchant={receipt.merchant}
                              receiptName={receipt.receiptName}
                              amount={receipt.amount}
                              userId={receipt.userId}
                              editing={this.state.editing}
                              onSubmit={ (receipt) => this.handleSave(Object.assign({}, receipt, {id: id})) } />
            );
        } else {
            let del = (this.props.editable) ?
                <buton className='destroy pure-button' onClick={ () => deleteReceipt(receipt) } /> : null;
            element = (
                <div className='Yaap2-receiptItem'>
                    <p className='desc' onClick={::this.handleClick}>Description: {receipt.desc}</p>
                    <p className='dateOfPurchase'>Date of Purchase: {receipt.dateOfPurchase}</p>
                    <p className='category'>Category: {receipt.category}</p>
                    <p className='merchant'>Merchant: {receipt.merchant}</p>
                    <p className='receiptName'>Name of Receipt: {receipt.receiptName}</p>
                    {del}
                    <p className='amount'>$ {receipt.amount}</p>
                    <p className='created'>{moment(modified).fromNow()}</p>
                </div>
            );
        }

        return (
            <li>{element}</li>
        );
    }
}
