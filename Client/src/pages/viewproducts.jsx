import ProductCard from "../components/productcard"

const dummyProducts = [
  {
    id: 1,
    name: "Noir Intense",
    description: "A bold evening scent",
    price: 2500,
    image: "https://placehold.co/200x200"
  },
  {
    id: 2,
    name: "Rose Blanche",
    description: "Light and floral",
    price: 1800,
    image: "https://placehold.co/200x200"
  }
]

function ViewProducts() {
  return (
    <div>
      <h2>All Products</h2>
      <div>
        {dummyProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ViewProducts