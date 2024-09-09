import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'j202jbwh',
    dataset: 'production',
    apiVersion: '2024-08-21',
    useCdn: false,
    token: process.env.SANITY_TOKEN, // The token should not be passed as a query parameter
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    if (!source || !source.asset?._ref) {
        console.error('Invalid image source:', source);
        return ''; // Return an empty string or a placeholder URL
    }
    return builder.image(source).url();
};