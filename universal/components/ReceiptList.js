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

    roleFilter(rcpt) {
        if (this.props.userRole === "Admin") {
            return rcpt.userId !== this.props.userId;
        } else if (this.props.userRole === "MM Chair") {
            return rcpt.category === "Micromouse";
        } else if (this.props.userRole === "GP Chair") {
            return rcpt.category === "Grand PrIEEE";
        } else if (this.props.userRole === "Projects Manager") {
            return rcpt.category === "Micromouse"
                   || rcpt.category === "Grand PrIEEE"
                   || rcpt.category === "Robomagellan"
                   || rcpt.category === "Quadcopter";
        } else {
            return false;
        }
    }

    receiptFilter(rcpt) {
        if (this.state.catFilter === '' || this.state.catFilter === 'All') {
            return true;
        } else {
            return this.state.catFilter === rcpt.category;
        }
    }

    subRoleSum(dict, rcpt) {
        if (!(dict[rcpt.userRealName] in dict)) {
            dict[rcpt.userRealName] = parseFloat(0.0);
        }
        dict[rcpt.userRealName] += parseFloat(rcpt.amount);
        return dict;
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.categoryEl)).material_select();
    }

    render() {
        const { receipts, userId, userRole, actions } = this.props;
        const myReceipts = receipts.filter(rcpt => rcpt.userId === userId);
        const roleReceipt = receipts.filter(::this.roleFilter);
        let categories = Object.keys(CATEGORIES).sort();
        var makeOption = (n, k) => <option value={n} key={k}>{n}</option>;
        var subCollectionList = roleReceipt.map((val, idx) => [val.userRealName, val.amount]);
        var makeSubCollection = (val) => <li className="collection-item" key="test">{val[0]}: $ {val[1]}</li>;
        let filteredRcpt = myReceipts.filter(::this.receiptFilter);

        let list, roleEl, roleRcptStat;
        let editable = true;
        let totalSum = myReceipts.reduce((x, receipt) => parseFloat(receipt.amount) + x, 0.0);
        let filteredSum = filteredRcpt.reduce((x, receipt) => parseFloat(receipt.amount) + x, 0.0);
        let subRoleSum = roleReceipt.reduce(::this.subRoleSum, {});

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

        if (roleReceipt.length > 0) {
            roleEl = roleReceipt.map((receipt, key) =>
                <ReceiptItem key={key}
                             receiptId={receipt.id}
                             editable={editable}
                             receipt={receipt}
                             {...actions} />
            );
            roleEl = <div className='row'>
                        <div className="col s12">
                            {roleEl}
                        </div>
                     </div>
            roleRcptStat = <ul className="collection with-header black-text">
                               <li className="collection-header"><h5>User Stats</h5></li>
                               {subCollectionList.map(makeSubCollection)}
                           </ul>;
        } else {
            roleEl = null;
            roleRcptStat = null;
        }

        return (
            <div className='receiptStatus'>
                {roleEl}
                <div className='row'>
                    <div className="col s12">
                        <div className='card blue-grey darken-4'>
                            <div className='card-content white-text'>
                                <span className="card-title">Stats</span>
                                <p>Total Sum: $ {totalSum}</p>
                                <p>Filtered Sum: $ {filteredSum}</p>
                                {roleRcptStat} 
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
