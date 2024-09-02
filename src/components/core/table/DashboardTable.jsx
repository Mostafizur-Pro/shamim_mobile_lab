import CustomSpinner from '../spinner/Spinner'

const DashboardTable = ({ columns, data, isLoading }) => {
  const roleColorMap = {
    basic: 'bg-green-300',
    standard: 'bg-blue-300',
    advanced: 'bg-yellow-300',
    plus: 'bg-purple-300',
    pro: 'bg-indigo-300',
    ultra: 'bg-red-300',
  }

  return (
    <div>
      <div className=" rounded-[20px]  ">
        <div className="w-full  lg:min-h-[200px]">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr className="w-96">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!isLoading &&
                data &&
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b-[0.5px]  border ${
                      roleColorMap[row.role]
                    }`}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 `}
                      >
                        {column.row(row)}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && (
            <div className="flex py-5 w-full justify-center items-center">
              <CustomSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardTable
