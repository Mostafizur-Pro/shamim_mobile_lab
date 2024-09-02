// src/components/ProductList.tsx

import { useEffect, useState } from 'react'
import DashboardTable from '@/components/core/table/DashboardTable'
import ProductEdit from './Action/productEdit'
import ProductView from './Action/productView'
import ProductDelete from './Action/productDelete'

// Define columns for the DashboardTable
const DashboardColumns = [
  {
    title: 'Sl',
    dataKey: 'id',
    row: (product) => <span>{product?.id}</span>,
  },
  {
    title: 'Brand',
    dataKey: 'brand',
    row: (product) => <p>{product?.brand}</p>,
  },
  {
    title: 'Model',
    dataKey: 'model',
    row: (product) => <p>{product?.model}</p>,
  },

  {
    title: 'Problem',
    dataKey: 'problem',
    row: (product) => <p>{product?.problem}</p>,
  },
  {
    title: 'Status',
    dataKey: 'status',
    row: (product) => <p>{product?.status}</p>,
  },
  {
    title: 'Customer Name',
    dataKey: 'customer_name',
    row: (product) => <p>{product?.customer_name}</p>,
  },

  {
    title: 'Action',
    dataKey: 'action',
    row: (product) => (
      <div className="flex justify-center items-center">
        <div className="flex items-center text-lg">
          <ProductEdit product={product} />
        </div>
        <div className="flex items-center text-lg">
          <ProductView product={product} />
        </div>
        <div className="flex items-center text-lg">
          <ProductDelete product={product} />
        </div>
      </div>
    ),
  },
]

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/products`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('data', data)
        setProducts(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Products List</h2>
      <DashboardTable
        data={products}
        columns={DashboardColumns}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ProductList
