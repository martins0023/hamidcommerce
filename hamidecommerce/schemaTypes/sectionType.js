import {defineField, defineType} from 'sanity'

export const sectionType = defineType({
  name: 'section',
  title: 'section',
  type: 'document',
  fields: [
    defineField({
      name: 'exploreCategory',
      type: 'string',
      options: {
        list: [
          {title: 'Man', value: 'man'},
          {title: 'Woman', value: 'woman'},
          {title: 'Electronics', value: 'electronics'},
          {title: 'Games', value: 'games'},
          {title: 'Furniture', value: 'furniture'},
          {title: 'Toys', value: 'toys'},
          {title: 'Laptops', value: 'laptops'},
          {title: 'phones', value: 'phones'},
        ],
      },
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Most Popular', value: 'most popular'},
          {title: 'Most Trending', value: 'most trending'},
          {title: 'Trending Now', value: 'trending now'},
          {title: 'Trending in Category', value: 'trending in category'},
        ],
      },
    }),
    defineField({
      name: 'productName',
      type: 'string',
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'productName',
            maxLength: 255,
        }
    }),
    defineField({
      name: 'productBrand',
      type: 'string',
    }),
    defineField({
      name: 'productPrice',
      type: 'number',
    }),
    defineField({
        name: 'productImage',
        type: 'array',
        of: [{type: 'image'}],
        options: {
            hotspot: true,
        }
      }),
    defineField({
        name: 'productDetails',
        type: 'array',
        of: [{type: 'block'}],
    })
  ],
})
