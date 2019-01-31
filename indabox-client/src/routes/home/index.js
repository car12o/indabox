import { h } from 'preact';
import { connect } from 'preact-redux';
import TextField from 'preact-material-components/esm/TextField';
import 'preact-material-components/TextField/style.css';
import Button from 'preact-material-components/esm/Button';
import 'preact-material-components/Button/style.css';
import Elevation from 'preact-material-components/esm/Elevation';
import 'preact-material-components/Elevation/style.css';
import { userAc } from '../../store/actions';
import s from './style';

const Home = (props) => (
	<Elevation z={3} class={s.container}>
		<img className={s.logo} src="/assets/logo.png" />
		<span className={s.label}>INICIAR SESSAO</span>
		<TextField type="text" className={s.input} label="NIF ou endereco de email" outlined
			onChange={e => props.setEmail(e.target.value)}
		/>
		<TextField type="password" className={s.input} label="Palavra chave" outlined
			onChange={e => props.setPassword(e.target.value)}
		/>
		<Button className={s.button} raised
			onClick={() => props.login(props.user.email, props.user.password)}
		>Iniciar Sessao</Button>
	</Elevation>
);


const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	setEmail: (email) => dispatch(userAc.setEmail(email)),
	setPassword: (password) => dispatch(userAc.setPassword(password)),
	login: (email, password) => dispatch(userAc.login(email, password))
	// register: (username, password) => dispatch(userAc.register(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
