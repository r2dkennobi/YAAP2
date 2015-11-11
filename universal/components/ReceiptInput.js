import React, { Component, PropTypes } from 'react';

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
            dateOfPurchase: this.props.dateOfPurchase || '',
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

        if (this.state.dateOfPurchase.length === 0) {
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
                           dateOfPurchase: '',
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

    render() {
        let self = this;
        let saveText = (this.props.editing) ? 'Save': 'Add';

        return (
            <div className="row">
                <form className='col s12'>
                    <div className="row">
                        <div className="input-field col s6">
                            <input type='text' id="descLabel" value={this.state.desc} onChange={::this.handleDescChange}/>
                            <label htmlFor="descLabel">Description</label>
                        </div>
                        <div className="input-field col s6">
                            <input type='text' id="dateLabel" value={this.state.dateOfPurchase} onChange={::this.handleDateChange}/>
                            <label htmlFor="dateLabel">Date of Purchase</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input type='text' id="categoryLabel" value={this.state.category} onChange={::this.handleCategoryChange}/>
                            <label htmlFor="categoryLabel">Category</label>
                        </div>
                        <div className="input-field col s6">
                            <input type='text' id="merchantLabel" value={this.state.merchant} onChange={::this.handleMerchantChange}/>
                            <label htmlFor="merchantLabel">Merchant</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input type='text' id="receiptLabel" value={this.state.receiptName} onChange={::this.handleReceiptNameChange}/>
                            <label htmlFor="receiptLabel">Receipt Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input type='number' id="amountLabel" min="0" step="0.01" value={this.state.amount} onChange={::this.handleAmountChange}/>
                            <label htmlFor="amountLabel">Amount</label>
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
