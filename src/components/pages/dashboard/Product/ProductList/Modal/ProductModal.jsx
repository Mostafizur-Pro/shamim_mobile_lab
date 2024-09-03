import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaPrint } from 'react-icons/fa'
import Barcode from 'react-barcode'

const ProductModal = ({ product }) => {
  const handlePrint = () => {
    window.print()
  }
  // const productUrl = `http://localhost:5173/product/${product.product_id}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="text-blue-600 text-xl">
            <FaPrint />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] print-container">
        <style>
          {`
            @media print {
              .print-container {
                width: 1.8in; /* Set the width for the barcode container */
                height: 0.8in;
                margin: 0;
                padding: 0;
              }

              .barcode-container {
                width: 100%;
                height: auto;
              }
            }
          `}
        </style>

        <div className="text-[10px] capitalize text-center">
          <span>
            {product.customer_name}, {product.customer_number}
          </span>

          <div>
            <div className="barcode-container">
              <Barcode className="w-44 h-16" value={product.product_id} />
            </div>
          </div>

          <Button onClick={handlePrint} className="bg-blue-600 text-white">
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
