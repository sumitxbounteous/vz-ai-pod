import { createRootRoute, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import "../styles.css"

const RootLayout = () => (
    <>
        {/* <div className='flex items-center justify-between border-b p-2'>
            <div>
                <h1 className="text-2xl p-2">VZ AI Pod</h1>
            </div>
            <div className="p-2 flex gap-4 mr-6">
                <Link to="/" className="[&.active]:font-bold text-xl">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold text-xl">
                    About
                </Link>
            </div>
        </div> */}
        <Outlet />

        {/* <TanStackRouterDevtools /> */}
    </>
)

export const Route = createRootRoute({ component: RootLayout })