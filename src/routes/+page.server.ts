import { error } from '@sveltejs/kit';
import { api } from './blog-posts-api.js';

interface BlogPostsResponse {
    data: [BlogPostData];
    meta: BlogPostsMeta;
}

interface BlogPostData {
    id: Number;
    attributes: [];
}

interface BlogPostDataAttributes {
	Title: string;
	Body: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	ShortDescription: string;
	Cover: {
		data: {
			id: Number;
			attributes: {
				name: string;
				alternativeText: string;
				caption: string;
				width: number;
				height: number;
				formats: {
					thumbnail: {
						ext: string;
						url: string;
						hash: string;
						mime: string;
						name: string;
						path: string;
						size: Number;
						width: Number;
						height: Number;
					}
				}
				hash: string;
				ext: string;
				mime: string;
				size: Number;
				url: string;
				previewUrl: string;
				provider: string;
				provider_metadata: string;
				createdAt: Date;
				updatedAt: Date;
			}
		}
	}
}

interface BlogPostsMeta {
	pagination: Pagination;
}

interface Pagination {
	page: Number;
	pageSize: Number;
	pageCount: Number;
	total: Number;
}

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ /*locals*/ }) => {
	// locals.userid comes from src/hooks.js
	const response = await api('GET', 'blog-posts');

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			/** @type {BlogPostData[]} */
			posts: []
		};
	}

	if (response.status === 200) {
		return {
			/** @type {BlogPostData[]} */
			posts: (await response.json()).data
		};
	}

	throw error(response.status);
};

// /** @type {import('./$types').Actions} */
// export const actions = {
// 	add: async ({ request, locals }) => {
// 		const form = await request.formData();

// 		await api('POST', `todos/${locals.userid}`, {
// 			text: form.get('text')
// 		});
// 	},
// 	edit: async ({ request, locals }) => {
// 		const form = await request.formData();

// 		await api('PATCH', `todos/${locals.userid}/${form.get('uid')}`, {
// 			text: form.get('text')
// 		});
// 	},
// 	toggle: async ({ request, locals }) => {
// 		const form = await request.formData();

// 		await api('PATCH', `todos/${locals.userid}/${form.get('uid')}`, {
// 			done: !!form.get('done')
// 		});
// 	},
// 	delete: async ({ request, locals }) => {
// 		const form = await request.formData();

// 		await api('DELETE', `todos/${locals.userid}/${form.get('uid')}`);
// 	}
// };
