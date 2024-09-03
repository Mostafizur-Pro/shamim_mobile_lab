import MainLayout from '@/components/layouts/MainLayout'
import LoginPage from '@/components/pages/auth/user/login/Login'
import SingleProduct from '@/components/pages/publicPage/singleProduct/singleProduct'

const PublicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/product/:id',
        element: <SingleProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/v1/products/${params.id}`),
      },

      // {
      //   path: "/categorylist/:id",
      //   element: <CategoryList></CategoryList>,
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://b612-used-products-resale-server-side-mostafizur-pro.vercel.app/categoryall?category=${params.id}`
      //     ),
      // },
    ],
  },
]

export default PublicRoutes
