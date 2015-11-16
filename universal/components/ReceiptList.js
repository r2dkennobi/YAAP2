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
            list =  <Card s={6} m={12}>
                        <p>No receipts recorded!</p>
                    </Card>;
        }

        return (
            <Row>{list}</Row>
        );
    }
}
