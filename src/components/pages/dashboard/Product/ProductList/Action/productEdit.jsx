import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

const ProductEdit = ({ product }) => {
  const [formData, setFormData] = useState({
    brand: product.brand,
    model: product.model,
    receive_date: product.receive_date,
    delivery_date: product.delivery_date,
    problem: product.problem,
    status: product.status,
    customer_name: product.customer_name,
    customer_number: product.customer_number,
    bill: product.bill,
    paid: product.paid,
    due: product.due,
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/products/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      // Handle successful update and reload the page
      window.location.reload()
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <div className="text-blue-600 text-xl">
              <FaEdit />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="receive_date">
                Receive Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="receive_date"
                type="date"
                value={formData.receive_date}
                disabled // Disable the receive_date field
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="delivery_date">
                Delivery Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="delivery_date"
                type="date"
                value={formData.delivery_date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="status">
                Status <span className="text-red-500">*</span>
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {Object.keys(formData)
              .filter(
                (key) =>
                  !['receive_date', 'delivery_date', 'status'].includes(key)
              )
              .map((key) => (
                <div key={key} className="">
                  <Label htmlFor={key} className="text-right uppercase">
                    {key.replace('_', ' ')}
                  </Label>
                  <Input
                    id={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button
              type="button" // Changed from 'submit' to 'button' since it's not within a form element
              className="bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductEdit
