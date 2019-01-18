import { isLocalhost } from './serviceWorker';

export const ServerURL = (
	isLocalhost
		? "http://localhost:3000/auth"
		: "https://portfolio-auth.herokuapp.com/auth"
);