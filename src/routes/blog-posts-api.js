/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/
import { env } from '$env/dynamic/private';

const base = env.STRAPI_BASE_API_URL;
const jwt = env.STRAPI_JWT;

/**
 * @param {string} method
 * @param {string} resource
 * @param {Record<string, unknown>} [data]
 */
export function api(method, resource, data) {
	return fetch(`${base}${resource}`, {
		method,
		headers: {
			'content-type': 'application/json',
            'Authorization': `Bearer ${jwt}`
		},
		body: data && JSON.stringify(data)
	});
}
