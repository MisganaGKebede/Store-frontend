import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="bg-white shadow-md rounded p-4 w-full max-w-xs hover:scale-105 transition-transform duration-200">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
    </Link>
  )
}

export default ProductCard
