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

        let list;
        let editable = true;
        let totalSum = myReceipts.reduce((x, receipt) => receipt.amount + x, 0);

        if (myReceipts.length > 0) {
            list = myReceipts.map((receipt, key) =>
                <ReceiptItem key={key}
                             id={receipt.id}
                             editable={editable}
                             receipt={receipt}
                             {...actions} />
            );
        } else {
            list =  <li>
                        <div className='Yaap2-receiptItem empty'>
                            <p>No other receipts recorded!</p>
                        </div>
                    </li>;
        }

        return (
            <section className='Yaap2-receiptList'>
                <div className='Yaap2-receiptList-summary'>
                    <span>Total Sum</span>
                    <span className='val'>$ {totalSum}</span>
                </div>
                <div className='Yaap2-receiptList-list'>
                    <ul>
                        {list}
                    </ul>
                </div>
            </section>
        );
    }
}
