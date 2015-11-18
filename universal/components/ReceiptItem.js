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
                              fileUrl={receipt.fileUrl}
                              amount={receipt.amount}
                              userId={receipt.userId}
                              editing={this.state.editing}
                              onSubmit={ (receipt) => this.handleSave(Object.assign({}, receipt, {id: id})) } />
            );
        } else {
            let del = (this.props.editable) ?
                <a href="#" onClick={ () => deleteReceipt(receipt) }>Delete</a> : null;
            element = (
                <div className='card blue-grey darken-1'>
                    <div className='card-content white-text'>
                        <span className='card-title'>{receipt.desc}</span>
                        <img className="materialboxed" width="100" height="auto" src={receipt.fileUrl}></img>
                        <p className='dateOfPurchase'>Date of Purchase: {receipt.dateOfPurchase}</p>
                        <p className='category'>Category: {receipt.category}</p>
                        <p className='merchant'>Merchant: {receipt.merchant}</p>
                        <p className='amount'>$ {receipt.amount}</p>
                        <p className='created'>{moment(modified).fromNow()}</p>
                    </div>
                    <div className='card-action'>
                        <a href="#" onClick={::this.handleClick}>Edit</a>
                        {del}
                    </div>
                </div>
            );
        }

        return (
            <div className='col s6'>{element}</div>
        );
    }
}
