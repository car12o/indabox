function setSelected(id, history) {
	history.push(`/partners/${id}`);
	return {
		type: 'SET-SELECTED',
		id
	};
}

export default { setSelected };
