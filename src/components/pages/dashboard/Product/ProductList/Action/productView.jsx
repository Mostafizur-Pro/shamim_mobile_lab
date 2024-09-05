import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'

// Fallback image URL constant
const FALLBACK_IMAGE_URL =
  'https://img.freepik.com/free-vector/hand-drawn-phone-cartoon-illustration_23-2150616513.jpg?t=st=1725519341~exp=1725522941~hmac=902ea2293a1eb61cdd0eeaa50f4ec901cd03b753817fd1d3b86f8d8b4ffd77b9&w=826'

const ProductView = ({ product }) => {
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
  } = product || {}

  // Construct image URL
  const imageUrl =
    image === FALLBACK_IMAGE_URL
      ? image
      : `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/images/uploads/${image}`

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
          <DialogTitle>Product Details</DialogTitle>
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
      </DialogContent>
    </Dialog>
  )
}

export default ProductView
