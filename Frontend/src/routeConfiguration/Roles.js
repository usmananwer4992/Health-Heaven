/*
 * These are the placeholder roles you can replace these with yours
 */
export default {
	'SUPER-ADMIN': 'SUPER-ADMIN',
	PARTNER: 'STAFF',
	PARTNER: 'PARTNER',

};

export const roleAbbrevation = (role) => {
	const roles = {
		1: 'SUPER-ADMIN',
		2: 'STAFF',
		3: 'PARTNER',
		
	};
	return roles[role];
};

export const getRoleId = (role) => {
	const roles = {
		'SUPER-ADMIN':1,
		 'STAFF':2,
		 'PARTNER':3,
		
	};
	return roles[role.toUpperCase()];
};
