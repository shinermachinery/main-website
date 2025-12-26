export const productQuery = `*[_type == "product" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  description,
  image,
  price,
  features
}`