import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/components/context/AuthContext'

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { users } = useAuth()
  const navigate = useNavigate()

  const handleFormSubmit = async (data) => {
    console.log('data', data)
    const productData = {
      ...data,
      user_id: users?.id, // Ensure users and users.id exist
    }
    try {
      // Post request to the API endpoint
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      // console.log('Success:', result)

      reset() // Reset form fields after successful submission
      if (result) {
        navigate('/dashboard/product/product-list')
      }
    } catch (error) {
      console.error('Submission error:', error)
    }
  }

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h5 className="text-2xl font-bold mb-4">Add Product Details</h5>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Product Fields */}
            <div>
              <Label htmlFor="brand">
                Brand <span className="text-red-500">*</span>
              </Label>
              <Input
                id="brand"
                type="text"
                {...register('brand', { required: 'Brand is required' })}
                placeholder="Enter Brand"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                type="text"
                {...register('model')}
                placeholder="Enter Model"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="receive_date">
                Receive Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="receive_date"
                type="date"
                {...register('receive_date', {
                  required: 'Receive Date is required',
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.receive_date && (
                <p className="text-red-500 text-sm">
                  {errors.receive_date.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="delivery_date">
                Delivery Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="delivery_date"
                type="date"
                {...register('delivery_date', {
                  required: 'Delivery Date is required',
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.delivery_date && (
                <p className="text-red-500 text-sm">
                  {errors.delivery_date.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="ime">IME</Label>
              <Input
                id="ime"
                type="text"
                {...register('ime')}
                placeholder="Enter IME"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="problem">Problem</Label>
              <Input
                id="problem"
                type="text"
                {...register('problem')}
                placeholder="Enter Problem Description"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="status">
                Status <span className="text-red-500">*</span>
              </Label>
              <select
                id="status"
                {...register('status', { required: 'Status is required' })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="customer_name">
                Customer Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customer_name"
                type="text"
                {...register('customer_name', {
                  required: 'Customer Name is required',
                })}
                placeholder="Enter Customer Name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.customer_name && (
                <p className="text-red-500 text-sm">
                  {errors.customer_name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="customer_number">
                Customer Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customer_number"
                type="text"
                {...register('customer_number', {
                  required: 'Customer Number is required',
                  minLength: {
                    value: 10,
                    message: 'Customer Number must be at least 10 digits',
                  },
                })}
                placeholder="Enter Customer Number"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.customer_number && (
                <p className="text-red-500 text-sm">
                  {errors.customer_number.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="bill">
                Bill Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bill"
                type="number"
                {...register('bill', { required: 'Bill Amount is required' })}
                placeholder="Enter Bill Amount"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.bill && (
                <p className="text-red-500 text-sm">{errors.bill.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="paid">Paid</Label>
              <Input
                id="paid"
                type="number"
                {...register('paid')}
                placeholder="Enter Paid Amount"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="due">Due</Label>
              <Input
                id="due"
                type="number"
                {...register('due')}
                placeholder="Enter Due Amount"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              type="button"
              // onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              // disabled={loading}
            >
              {/* {loading ? 'Creating...' : 'Create Product'} */}
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
