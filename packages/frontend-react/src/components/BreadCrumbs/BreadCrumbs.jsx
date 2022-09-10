import React from 'react';
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/outline';
import './BreadCrumbs.scss'
import { routes } from '../../router/routes.jsx';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/slices/appSlice';

export default React.memo(function BreadCrumbs() {
    const token = useSelector(selectToken)
    const breadcrumbs = useReactRouterBreadcrumbs(routes(token))
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