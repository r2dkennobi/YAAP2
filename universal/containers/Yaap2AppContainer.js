import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Yaap2App from './Yaap2App';
import * as Yaap2Actions from '../actions/Yaap2Actions';

function mapStateToProps(state) {
    return {
        userName: state.userName,
        userUuid: state.userUuid,
        isApproved: state.isApproved,
        receipts: state.receipts,
        userId: state.userId,
        error: state.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Yaap2Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Yaap2App);
