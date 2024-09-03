import { useEffect, useState } from 'react'
import DashboardTable from '@/components/core/table/DashboardTable'
import ProductEdit from './Action/productEdit'
import ProductView from './Action/productView'
import ProductDelete from './Action/productDelete'
import { useAuth } from '@/components/context/AuthContext'
import { FaSearch } from 'react-icons/fa'
import ProductModal from './Modal/ProductModal'

const ProductList = () => {
  const { users } = useAuth()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: '', brand: '' })

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
        setProducts(data.data)
        setFilteredProducts(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = products

    if (filters.status) {
      result = result.filter((product) => product.status === filters.status)
    }
    if (filters.brand) {
      result = result.filter((product) => product.brand === filters.brand)
    }

    if (searchTerm) {
      result = result.filter((product) =>
        [
          product.product_id,
          product.customer_name,
          product.customer_number,
        ].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    setFilteredProducts(result)
  }, [searchTerm, filters, products])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const DashboardColumns = [
    {
      title: 'Sl',
      dataKey: 'product_id',
      row: (product) => <span>{product.product_id}</span>,
      sortable: true,
    },
    {
      title: 'Brand',
      dataKey: 'brand',
      row: (product) => <p>{product.brand}</p>,
      sortable: true,
    },
    {
      title: 'Model',
      dataKey: 'model',
      row: (product) => <p>{product.model}</p>,
    },
    {
      title: 'Problem',
      dataKey: 'problem',
      row: (product) => <p>{product.problem}</p>,
    },
    {
      title: 'Status',
      dataKey: 'status',
      row: (product) => <p>{product.status}</p>,
    },
    {
      title: 'Customer Name',
      dataKey: 'customer_name',
      row: (product) => <p>{product.customer_name}</p>,
    },
    {
      title: 'Action',
      dataKey: 'action',
      row: (product) => (
        <div className="flex justify-center items-center space-x-2">
          <ProductEdit product={product} />
          <ProductView product={product} />
          {users && users.role === 'admin' && (
            <>
              <ProductDelete product={product} />
            </>
          )}
          <ProductModal product={product} />
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Products List</h2>
      <div className="mb-4 flex gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by Product ID, Customer Name, or Customer Number"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <FaSearch className="absolute top-2 right-2 text-gray-500" />
        </div>

        <div className="flex gap-4">
          <div>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <DashboardTable
        data={filteredProducts}
        columns={DashboardColumns}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ProductList
