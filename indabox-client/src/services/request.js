/**
 * request ...
 * @param {object} req
 */
export default (req) => {
	return async dispatch => {
		try {
			const options = {
				method: req.method,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'X-Requested-With': 'XMLHttpRequest',
					Token: localStorage.token
				}
			};

			if (req.body) {
				Object.assign(options, { body: JSON.stringify(req.body) });
			}

			const res = await fetch(`http://${window.location.hostname}:8080${req.url}`, options);
			const token = res.headers.get('Token');
			if (token) {
				localStorage.setItem('token', token);
			}

			dispatch(Object.assign({}, {
				type: req.type,
				status: res.status,
				body: await res.json()
			}));
		}
		catch (e) {
			console.error('error', e);
		}
	};
}
