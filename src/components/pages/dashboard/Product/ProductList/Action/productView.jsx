import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'

const ProductView = ({ product }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <div className="text-green-600 text-xl">
              <FaEye />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <p className="font-bold">Brand:</p>
              <p>{product.brand}</p>
            </div>

            <div>
              <p className="font-bold">Product ID:</p>
              <p>{product.product_id}</p>
            </div>

            <div>
              <p className="font-bold">Model:</p>
              <p>{product.model}</p>
            </div>

            <div>
              <p className="font-bold">IME:</p>
              <p>{product.ime}</p>
            </div>

            <div>
              <p className="font-bold">Image:</p>
              <p>{product.image}</p>
            </div>

            <div>
              <p className="font-bold">Receive Date:</p>
              <p>{product.receive_date}</p>
            </div>

            <div>
              <p className="font-bold">Delivery Date:</p>
              <p>{product.delivery_date}</p>
            </div>

            <div>
              <p className="font-bold">Problem:</p>
              <p>{product.problem}</p>
            </div>

            <div>
              <p className="font-bold">Status:</p>
              <p>{product.status}</p>
            </div>

            <div>
              <p className="font-bold">Bill:</p>
              <p>{product.bill}</p>
            </div>

            <div>
              <p className="font-bold">Customer Name:</p>
              <p>{product.customer_name}</p>
            </div>

            <div>
              <p className="font-bold">Customer Number:</p>
              <p>{product.customer_number}</p>
            </div>

            <div>
              <p className="font-bold">Paid:</p>
              <p>{product.paid}</p>
            </div>

            <div>
              <p className="font-bold">Due:</p>
              <p>{product.due}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductView
