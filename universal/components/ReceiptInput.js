import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'node-uuid';

export default class ReceiptInput extends Component {
    static PropTypes = {
        onSubmit: PropTypes.func.isRequired,
        userId: PropTypes.string.isRequired,
        editing: PropTypes.bool,
        descLabel: PropTypes.string,
        dateLabel: PropTypes.string,
        categoryLabel: PropTypes.string,
        merchantLabel: PropTypes.string,
        receiptLabel: PropTypes.string,
        amountLabel: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            desc: this.props.desc || '',
            dateOfPurchase: this.props.dateOfPurchase || null, 
            category: this.props.category || '',
            merchant: this.props.merchant || '',
            receiptName: this.props.receiptName || '',
            amount: this.props.amount || 0.00
        };
    }

    handleSubmit(e) {
        let errors;
        e.preventDefault();

        if (this.state.desc.length === 0) {
            errors = ['Empty description!'];
        }

        if (this.state.dateOfPurchase === null) {
            errors = [...errors, 'Empty date!'];
        }

        if (this.state.category.length === 0) {
            errors = [...errors, 'Empty category!'];
        }

        if (this.state.merchant.length === 0) {
            errors = [...errors, 'Empty merchant!'];
        }

        if (this.state.amount.length === 0) {
            errors = [...errors, 'Invalid price set'];
        }

        if (this.state.receiptName.length === 0) {
            errors = [...errors, 'Empty receipt name!'];
        }

        if (errors && errors.length > 0) {
            this.setState({errors: errors});
        } else {
            this.props.onSubmit({desc: this.state.desc,
                                 dateOfPurchase: this.state.dateOfPurchase,
                                 category: this.state.category,
                                 merchant: this.state.merchant,
                                 amount: this.state.amount,
                                 receiptName: this.state.receiptName,
                                 userId: this.props.userId});
            this.setState({desc: '',
                           dateOfPurchase: null,
                           category: '',
                           merchant: '',
                           amount: 0.00,
                           receiptName: ''});
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

    handleReceiptNameChange(e) {
        this.setState({ receiptName: e.target.value });
    }

    handleAmountChange(e) {
        this.setState({ amount: e.target.value })
    }

    componentDidMount() {
        $(ReactDOM.findDOMNode(this.refs.categoryEl)).material_select();
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
            "merchant": `merchant${compId}`,
            "receiptname": `receiptname${compId}`,
            "amount": `amount${compId}`
        }

        return (
            <div className="row">
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
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
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
                            <input type='text'
                                   id={ids["receiptname"]}
                                   value={this.state.receiptName}
                                   onChange={::this.handleReceiptNameChange}/>
                            <label className="active" htmlFor={ids["receiptname"]}>Receipt Name</label>
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
                                <input type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                        <div className="input-field col s6">
                            <button type='submit' className='btn waves-effect waves-light' onClick={::this.handleSubmit}>{saveText}</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
