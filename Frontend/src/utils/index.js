import * as _ from 'lodash';

import * as routingList from "../routeConfiguration/PrivateRoutesConfig"
export function isLoggedIn() {
	return !_.isNull(localStorage.getItem('user'))
		? localStorage.getItem('user')
		: false;
}

export function getAllowedRoutes(routes) {
	const getUser = JSON.parse(localStorage.getItem('user'));
    // console.log({getUser})
	const getUserRole = !_.isNull(getUser) ? getUser.roles[0] : null;

	// console.log({getUserRole});
	 
    const routesChecked= routes.filter(({ permission }) => {
        // console.log({permission})
		if (!permission) return true;
		else if (!isArrayWithLength(permission)) return true;
		else {
			// console.log(getUserRole.toUpperCase(),'sd', permission);
			const resp = _.includes(permission	, getUserRole.toUpperCase())
			// console.log({ resp });
			return resp;
		}
	});
    // console.log({routesChecked})
    return routesChecked
}



export const getRouteSlug = (slug) => {
	
	return routingList.find((x)=>x.slug === slug).path;
};


export const getToken = () => {
	if (_.isNull(localStorage.getItem('user'))) return null;
	return `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
};
export function isArrayWithLength(arr) {
	return Array.isArray(arr) && arr.length;
}
