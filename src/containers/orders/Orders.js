import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/order/Order';
import Spinner from '../../components/UI/spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class Orders extends Component {

    componentDidMount(){
        this.props.onOrdersFetch()
    }

    render() {

        const orderList = this.props.loading ? 
            <Spinner /> : 
            (<div>
                {this.props.orders.map(order => (
                    <Order 
                        ingredients={order.ingredients}
                        price={order.price}
                        key={order.id} />
                ))}

            </div>);

        return orderList;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetch: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));