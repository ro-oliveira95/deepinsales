import { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import Alert from "../layout/Alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

function Register({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("As senhas não correspondem", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Registro</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Crie uma conta
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Nome'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              // required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Endereço de email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              // required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Senha'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              // required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Repetir senha'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
              // required
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Registar-se'
          />
          <p className='my-1'>
            Já possui uma conta? <a href='/login'>Entrar</a>
          </p>
        </form>
      </section>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
