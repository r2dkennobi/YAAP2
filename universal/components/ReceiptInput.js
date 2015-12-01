import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'node-uuid';
import { CATEGORIES } from '../constants/ActionTypes';

export default class ReceiptInput extends Component {
    static PropTypes = {
        onSubmit: PropTypes.func.isRequired,
        userId: PropTypes.string.isRequired,
        editing: PropTypes.bool
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            desc: this.props.desc || '',
            dateOfPurchase: this.props.dateOfPurchase || null,
            category: this.props.category || '',
            merchant: this.props.merchant || '',
            fileUrl: this.props.fileUrl || null,
            reimFlag: this.props.reimFlag || '',
            amount: this.props.amount || 0.00
        };
    }

    handleSubmit(e) {
        let errors = [];
        e.preventDefault();

        if (this.state.desc.length === 0) {
            errors = [...errors, 'Empty description! '];
        }

        if (this.state.dateOfPurchase === null) {
            errors = [...errors, 'Empty date! '];
        }

        if (this.state.category.length === 0) {
            errors = [...errors, 'Empty category! '];
        }

        if (this.state.merchant.length === 0) {
            errors = [...errors, 'Empty merchant! '];
        }

        if (this.state.amount.length === 0) {
            errors = [...errors, 'Invalid price set '];
        }

        if (this.state.fileUrl === null) {
            errors = [...errors, 'Empty receipt name! '];
        }

        if (this.state.reimFlag.length === 0) {
            errors = [...errors, 'Reimbursement request not set!'];
        }

        if (errors && errors.length > 0) {
            this.setState({errors: errors});
        } else {
            this.props.onSubmit({desc: this.state.desc,
                                 dateOfPurchase: this.state.dateOfPurchase,
                                 category: this.state.category,
                                 merchant: this.state.merchant,
                                 amount: this.state.amount,
                                 fileUrl: this.state.fileUrl,
                                 reimFlag: this.state.reimFlag,
                                 userId: this.props.userId});
            this.setState({desc: '',
                           dateOfPurchase: null,
                           category: '',
                           merchant: '',
                           amount: 0.00,
                           reimFlag: this.props.reimFlag,
                           fileUrl: null});
        }
    }

    handleDescChange(e) {
        this.setState({ desc: e.target.value });
    }

    handleDateChange(e) {
        this.setState({ dateOfPurchase: e.target.value });
    }

    handleCategoryChange(e) {
        this.setState({ category: e.target.value });
    }

    handleMerchantChange(e) {
        this.setState({ merchant: e.target.value });
    }

    handleFileUpload(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function() {
            console.log(reader.result);
            this.setState({ fileUrl: reader.result });
        }.bind(this);
    }

    handleAmountChange(e) {
        this.setState({ amount: e.target.value });
    }

    handleReimFlagChange(e) {
        this.setState({ reimFlag: e.target.value });
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.categoryEl)).material_select();
        $(ReactDOM.findDOMNode(this.refs.reimFlagEl)).material_select();
        $(ReactDOM.findDOMNode(this.refs.receiptImg)).materialbox();
        var comp = this;
        var el = this.refs.datepickerEl;
        $(ReactDOM.findDOMNode(el)).pickadate({
            format: 'yyyy-mm-dd',
            formatSubmit: 'yyyy-mm-dd',
            selectMonths: true,
            selectYears: 5,
            closeOnSelect: true,
            onSet: function (e) {
                var val = this.get('select', 'yyyy-mm-dd');
                comp.handleDateChange({ target: { value: val }});
                this.close();
            }
        });
    }

    render() {
        let self = this;
        let saveText = (this.props.editing) ? 'Save': 'Add';
        let compId = uuid.v1();
        var ids = {
            "desc": `desc${compId}`,
            "date": `date${compId}`,
            "receiptImg": `receiptImg${compId}`,
            "reimFlag": `reimFlag${compId}`,
            "merchant": `merchant${compId}`,
            "amount": `amount${compId}`
        }
        let categories = Object.keys(CATEGORIES).sort();
        var makeOption = (n, k) => <option value={n} key={k}>{n}</option>;

        return (
            <form className='col s12'>
                <div className="row">
                    <div className="input-field col s6">
                        <input type='text'
                               id={ids["desc"]}
                               value={this.state.desc}
                               onChange={::this.handleDescChange}/>
                        <label className="active" htmlFor={ids["desc"]}>Description</label>
                    </div>
                    <div className="input-field col s6">
                        <input type='date'
                               ref='datepickerEl'
                               className='datepicker'
                               id={ids["date"]}
                               value={this.state.dateOfPurchase}
                               onChange={::this.handleDateChange}/>
                        <label className="active" htmlFor={ids["date"]}>Date of Purchace</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <select ref="categoryEl"
                                className="browser-default"
                                value={this.state.category}
                                onChange={::this.handleCategoryChange}>
                            <option value="" disabled>Choose category</option>
                            {categories.map(makeOption)}
                        </select>
                    </div>
                    <div className="input-field col s6">
                        <input type='text'
                               id={ids["merchant"]}
                               value={this.state.merchant}
                               onChange={::this.handleMerchantChange}/>
                        <label htmlFor={ids["merchant"]}>Merchant</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <select ref="reimFlagEl"
                                id={ids["reimFlag"]}
                                className="browser-default"
                                value={this.state.reimFlag}
                                onChange={::this.handleReimFlagChange}>
                            <option value="" disabled>Ready for reimbursement?</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className="input-field col s6">
                        <input type='number'
                               id={ids["amount"]}
                               min="0" step="0.01"
                               value={this.state.amount}
                               onChange={::this.handleAmountChange}/>
                        <label className="active" htmlFor={ids["amount"]}>Amount</label>
                    </div>
                </div>
                <div className="row">
                    <div className="file-field input-field col s6">
                        <div className="btn">
                            <span>Upload Receipt</span>
                            <input type="file" onChange={::this.handleFileUpload} />
                        </div>
                    </div>
                    <img ref="receiptEl"
                         className="materialboxed"
                         width="100"
                         height="auto"
                         src={this.state.fileUrl}></img>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <button type='submit'
                                className='btn waves-effect waves-light'
                                onClick={::this.handleSubmit}>{saveText}</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="error-msg">
                            {this.state.errors}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
