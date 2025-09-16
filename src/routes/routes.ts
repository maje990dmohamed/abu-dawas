import AddHealthCertificate from '../pages/addHealthCertificate/pages/AddHealthCertificate'
import HomePage from '../pages/HomePage'
import type { RouteType } from '../types/types'
export const routes : RouteType[] = [
    {
        id: 1,
        query : "/",
        component: HomePage,
    },
    {
        id: 2,
        query : "/add-new-health-certificate",
        component: AddHealthCertificate,
    }
]