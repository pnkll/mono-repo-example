import React from 'react';
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/outline';
import './BreadCrumbs.scss'

export default React.memo(function BreadCrumbs() {
    const breadcrumbs = useReactRouterBreadcrumbs()
    const location=useLocation()
    return (
        <>
            <div className="breadcrumbs__container">
                {breadcrumbs.map((breadcrumb, idx) => 
                <Link className={`breadcrumbs__elem ${location.pathname===breadcrumb.match.pathname?'current':''}`} key={breadcrumb.key} to={breadcrumb.match.pathname}>{breadcrumb.breadcrumb}{breadcrumbs.length - 1 !== idx ? <ChevronRightIcon width={17} /> : ''}</Link>)}
            </div>
        </>
    )
})