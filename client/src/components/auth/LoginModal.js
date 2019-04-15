import React, { Component } from 'react'
import { Button, Modal, Checkbox, Form, Message, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { openLoginModal, closeLoginModal } from '../../actions/layoutActions';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';


class LoginModal extends Component {
    state = {
        email: '',
        password: '',
        message: []
    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;

        console.log(error, prevProps.error, "porownaine z poprzednim")
        if (error !== prevProps.error) {
            // Check for register error
           // let messages = [];
         

       

            if (error.id === 'REGISTER_FAIL') {

                this.setState({ message: error.message.response.data.message});
            } else {
                this.setState({ message: null });

            }
        }

        // if (isAuthenticated === true) {
        //     closeRegisterModal();
        // }

    }


    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleSubmit = () => {
        const { email, password } = this.state;
        const { login, closeLoginModal, isAuthanticated } = this.props;

        const loginData = { email, password };
        login(loginData)
        
        if (isAuthanticated) {
            closeLoginModal();
        }



    }

    renderErrorMessage = () => {
        const { message } = this.state;
        const error = message.length !== 0 &&
            <Grid padded='vertically'>
                <Grid.Row>
                    <Grid.Column>
                        <Message
                            error
                            header='There was some errors with your submission'
                            list={[message]}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        return error;

    }
    render() {
        const { email, password } = this.state;
        const { handleCloseLoginModal, loginModalOpened, closeLoginModal } = this.props;
        console.error(loginModalOpened)
        return (
            <Modal size='tiny' open={loginModalOpened}
                centered={false}
                onClose={closeLoginModal}>

                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    {this.renderErrorMessage()}

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Email</label>
                            <input name='email' placeholder='Email' value={email} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input name='password' type='password' placeholder='Password' value={password} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Checkbox label='Remember me' />
                            <Link to='/forgot-password' className='link'>Forgot your password?</Link>
                        </Form.Field>
                        <Button color='orange' fluid type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        isAuthanticated: state.auth.isAuthanticated,
        loginModalOpened: state.layout.loginModalOpened
    }
}

export default connect(mapStateToProps, { login, openLoginModal, closeLoginModal })(LoginModal);