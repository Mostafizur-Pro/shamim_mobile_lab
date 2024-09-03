import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaPrint } from 'react-icons/fa'
import Barcode from 'react-barcode'

const ProductModal = ({ product }) => {
  const handlePrint = () => {
    // Open print dialog
    window.print()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="text-blue-600 text-xl">
            <FaPrint />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <p className="font-bold">
              Product ID:{' '}
              <span className="font-normal">{product.product_id}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold capitalize">
              Customer Name:{' '}
              <span className="font-normal">{product.customer_name}</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">
              Customer Number:{' '}
              <span className="font-normal">{product.customer_number}</span>
            </p>
          </div>
          <div className="flex flex-col items-center mt-4 space-y-4">
            <div>
              <Barcode value={product.product_id} />
            </div>
          </div>
          {/* Print Button */}
          <div className="mt-4 text-center">
            <Button onClick={handlePrint} className="bg-blue-600 text-white">
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
