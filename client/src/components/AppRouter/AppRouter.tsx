import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';
import Account from '../../pages/Account/Account'
import ProductAndTypeAdd from '../../pages/Admin/ProductAndTypeAdd';
import ProductUpdate from '../../pages/Admin/ProductUpdate';
import Home from '../../pages/Home/Home';
import Basket from '../Basket/Basket';
import Layout from '../Layout/Layout';

const AppRouter = () => {
    const { is_admin }: any = useAppSelector(state => state.userSlice)

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='account' element={<Account />} />
                <Route path='basket' element={<Basket />} />
                {is_admin ? <Route path='productAndType' element={<ProductAndTypeAdd />} /> : <></>}
                {is_admin ? <Route path='productUpdate/:id/:status' element={<ProductUpdate />} /> : <></>}
            </Route>
        </Routes>
    )
}

export default AppRouter;