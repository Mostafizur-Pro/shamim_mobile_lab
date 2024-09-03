import { Button } from '@/components/ui/button'
import ProductModal from '../../ProductList/Modal/ProductModal'

const PrintModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg max-w-md mx-4 sm:mx-0">
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Are you sure you want to print?
            </p>
            <div className="flex justify-end mt-4">
              <Button
                onClick={onClose}
                className="mr-2 bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                // Add your print logic here
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Print <ProductModal product={product} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintModal
