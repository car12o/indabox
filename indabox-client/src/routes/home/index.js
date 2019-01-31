import { h } from 'preact';
import TextField from 'preact-material-components/esm/TextField';
import 'preact-material-components/TextField/style.css';
import Button from 'preact-material-components/esm/Button';
import 'preact-material-components/Button/style.css';
import Elevation from 'preact-material-components/esm/Elevation';
import 'preact-material-components/Elevation/style.css';
import s from './style';

const Home = () => (
	<Elevation z={3} class={s.container}>
		<img className={s.logo} src="/assets/logo.png" />
		<span className={s.label}>INICIAR SESSAO</span>
		<TextField type="text" className={s.input} label="NIF ou endereco de email" outlined />
		<TextField type="password" className={s.input} label="Palavra chave" outlined />
		<Button className={s.button} raised>Iniciar Sessao</Button>
	</Elevation>
);

export default Home;
