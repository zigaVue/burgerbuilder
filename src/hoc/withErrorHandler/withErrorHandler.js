import React, { Component } from 'react';

import Modal from '../../components/UI/modal/Modal';
import Wrapper from '../wrappers/Wrapper';

const withErrorHandler = ( WrappedComponent, axios ) => {
    
    return class extends Component {
        state = {
            error: null
        }
        
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(null,error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render(){
            return (
                <Wrapper>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            );
        }
    }
 
}

export default withErrorHandler;