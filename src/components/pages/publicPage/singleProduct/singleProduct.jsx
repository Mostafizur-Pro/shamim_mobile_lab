import { useLoaderData } from 'react-router-dom'

const SingleProduct = () => {
  const product = useLoaderData()

  if (!product || !product.data) {
    return <div className="text-center text-gray-500">Loading...</div>
  }

  const {
    brand,
    delivery_date,
    image,
    model,
    problem,
    product_id,
    receive_date,
    status,
  } = product.data

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 shadow-xl rounded-xl border border-gray-300">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        Product Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col space-y-6">
          <DetailItem label="Product ID" value={product_id} />
          <DetailItem label="Brand" value={brand} />
          <DetailItem label="Model" value={model} />
          <DetailItem label="Status" value={status} />
          <DetailItem label="Problem" value={problem} />
          <DetailItem
            label="Receive Date"
            value={new Date(receive_date).toLocaleDateString()}
          />
          <DetailItem
            label="Delivery Date"
            value={new Date(delivery_date).toLocaleDateString()}
          />
        </div>

        {image && (
          <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <img
              src={image}
              alt={`Product ${product_id}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Helper component for reusable detail items
const DetailItem = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <p className="text-lg font-semibold text-gray-700 mb-2">{label}</p>
    <p className="text-gray-900">{value}</p>
  </div>
)

export default SingleProduct
