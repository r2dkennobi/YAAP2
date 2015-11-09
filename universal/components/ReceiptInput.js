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
            amount: this.props.amount || 0
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

        if (this.state.amount < 1) {
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
                           amount: 0,
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
        this.setState({ amount: parseFloat(e.target.value) });
    }

    render() {
        let self = this;
        let saveText = (this.props.editing) ? 'Save': 'Add';

        return (
            <form className='YAAP2-receiptInput pure-form'>
                <fieldset>
                    <input type='text' placeholder={this.props.descLabel} value={this.state.desc} onChange={::this.handleDescChange} />
                    <input type='text' placeholder={this.props.dateLabel} value={this.state.dateOfPurchase} onChange={::this.handleDateChange} />
                    <input type='text' placeholder={this.props.categoryLabel} value={this.state.category} onChange={::this.handleCategoryChange} />
                    <input type='text' placeholder={this.props.merchantLabel} value={this.state.merchant} onChange={::this.handleMerchantChange} />
                    <input type='text' placeholder={this.props.receiptLabel} value={this.state.receiptName} onChange={::this.handleReceiptNameChange} />
                    <input type='text' placeholder={this.props.amountLabel} value={this.state.amount} onChange={::this.handleAmountChange} />
                    <button type='submit' className='save pure-button' onClick={::this.handleSubmit}>{saveText}</button>
                </fieldset>
            </form>
        );
    }
}
