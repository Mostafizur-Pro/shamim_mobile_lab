import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'
import { useEffect, useState } from 'react'

// Fallback image URL constant
const FALLBACK_IMAGE_URL =
  'https://img.freepik.com/free-vector/hand-drawn-phone-cartoon-illustration_23-2150616513.jpg?t=st=1725519341~exp=1725522941~hmac=902ea2293a1eb61cdd0eeaa50f4ec901cd03b753817fd1d3b86f8d8b4ffd77b9&w=826'

const ProductView = ({ product }) => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Destructure product properties
  const {
    image,
    name,
    brand,
    product_id,
    model,
    ime,
    receive_date,
    delivery_date,
    problem,
    status,
    bill,
    customer_name,
    customer_number,
    paid,
    due,
    user_id, // Make sure user_id is available in the props
  } = product || {}

  // Construct image URL
  const imageUrl =
    image === FALLBACK_IMAGE_URL
      ? image
      : `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/images/uploads/${image}`

  useEffect(() => {
    if (!user_id) return

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/users/${user_id}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setUserData(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [user_id])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="text-green-600 text-xl">
            <FaEye />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Product Details</DialogTitle>
        </DialogHeader>
        <div className="flex gap-5">
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={name || 'Product Image'}
              className="w-40 h-40 object-cover rounded-xl border border-gray-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Display product details */}
            {[
              { label: 'Brand', value: brand },
              { label: 'Product ID', value: product_id },
              { label: 'Model', value: model },
              { label: 'IME', value: ime },
              { label: 'Receive Date', value: receive_date },
              { label: 'Delivery Date', value: delivery_date },
              { label: 'Problem', value: problem },
              { label: 'Status', value: status },
              { label: 'Bill', value: bill },
              { label: 'Customer Name', value: customer_name },
              { label: 'Customer Number', value: customer_number },
              { label: 'Paid', value: paid },
              { label: 'Due', value: due },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-bold">{label}:</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-6 border-t border-gray-200 mt-6">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          {userData ? (
            <div className="space-y-2">
              <div className="text-lg font-medium text-gray-800">
                <span className="font-bold">Name:</span> {userData.name}
              </div>
              <div className="text-lg font-medium text-gray-800">
                <span className="font-bold">Number:</span> {userData.number}
              </div>
            </div>
          ) : (
            <div className="text-lg text-gray-600">No user data available</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductView
