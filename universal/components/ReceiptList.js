import React, {PropTypes, Component} from 'react';
import ReceiptItem from './ReceiptItem';

export default class ReceiptList extends Component {
    static propTypes = {
        receipts: PropTypes.array.isRequired,
        userId: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired
    };

    render() {
        const { receipts, userId, actions } = this.props;
        const myReceipts = receipts.filter(receipt => receipt.userId === userId);

        let list, otherList;
        let editable = true;
        let totalSum = myReceipts.reduce((x, receipt) => parseFloat(receipt.amount) + x, 0.0);

        if (myReceipts.length > 0) {
            list = myReceipts.map((receipt, key) =>
                <ReceiptItem key={key}
                             id={receipt.id}
                             editable={editable}
                             receipt={receipt}
                             {...actions} />
            );
        } else {
            list =  <div className="col s12">
                        <div className='card blue-grey darken-1'>
                            <div className='card-content white-text'>
                                <p>No receipts recorded!</p>
                            </div>
                        </div>
                    </div>;
        }

        return (
            <div className='receiptStatus'>
                <div className='row'>
                    <div className="col s12">
                        <div className='card blue-grey darken-1'>
                            <div className='card-content white-text'>
                                <span>Total Sum: $ {totalSum}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {list}
                </div>
            </div>
        );
    }
}
