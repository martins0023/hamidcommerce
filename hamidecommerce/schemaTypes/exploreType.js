import {defineField, defineType} from 'sanity'

export const exploreType = defineType({
  name: 'explore',
  title: 'Explore',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
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
      name: 'productName',
      type: 'string',
    }),
  ],
})
