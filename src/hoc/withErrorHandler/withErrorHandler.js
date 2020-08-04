import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        state = {
            error: null
        }
        
        // can also use constructor
        // called before child components are rendered
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error: null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err =>{
                this.setState({error: err})
            })
        }

        // lifecycle method executes at the point of time a component
        // isn't required anymore
        // prevents memory leaks
        // will ensure that whenever we don't need the burger builder
        // component anymore that we clean up the interceptors which we
        // attached due to using withErrorHandler on the burger builder
        // so that if we reuse withErrorHandler in our application, we don't
        // create more and more interceptors with the old ones living on
        componentWillUnmount(){
            console.log('[withErrorHandler] will unmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null})
        }

        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler