import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import ReceiptItem from './ReceiptItem';
import { CATEGORIES } from '../constants/ActionTypes';

export default class ReceiptList extends Component {
    static propTypes = {
        receipts: PropTypes.array.isRequired,
        userId: PropTypes.string.isRequired,
        userRole: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = { catFilter: '' };
    }

    handleFilterChange(e) {
        this.setState({ catFilter: e.target.value });
    }

    receiptFilter(rcpt) {
        if (this.state.catFilter === '' || this.state.catFilter === 'All') {
            return true;
        } else {
            return this.state.catFilter === rcpt.category;
        }
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.categoryEl)).material_select();
    }

    render() {
        const { receipts, userId, actions } = this.props;
        const myReceipts = receipts.filter(rcpt => rcpt.userId === userId);
        let categories = Object.keys(CATEGORIES).sort();
        var makeOption = (n, k) => <option value={n} key={k}>{n}</option>;
        let filteredRcpt = myReceipts.filter(::this.receiptFilter);

        let list;
        let editable = true;
        let totalSum = myReceipts.reduce((x, receipt) => parseFloat(receipt.amount) + x, 0.0);
        let filteredSum = filteredRcpt.reduce((x, receipt) => parseFloat(receipt.amount) + x, 0.0);

        if (filteredRcpt.length > 0) {
            list = filteredRcpt.map((receipt, key) =>
                <ReceiptItem key={key}
                             receiptId={receipt.id}
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
                        <div className='card blue-grey darken-4'>
                            <div className='card-content white-text'>
                                <span className="card-title">Stats</span>
                                <p>Total Sum: $ {totalSum}</p>
                                <p>Filtered Sum: $ {filteredSum}</p>
                                <hr/>
                                <span className="card-title">Filter</span>
                                <select ref="categoryEl"
                                        className="browser-default black-text"
                                        value={this.state.category}
                                        onChange={::this.handleFilterChange}>
                                    <option value="" disabled>Choose category</option>
                                    {categories.map(makeOption)}
                                </select>
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
