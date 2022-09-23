import React from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table/Table.jsx';
import TransitionLayout from '../../../page_layouts/TransitionLayout/TransitionLayout.jsx';
import { tableApi } from '../../../services/TableService.js';

export default function TableById() {
    const params = useParams()
    const {data:table}=tableApi.useGetTableContentsQuery(params.id)
    const columns = Object.keys(tmp.headers).map((el,index)=>
    el?{Header: Object.values(tmp.headers)[index], accessor: el}:el) 
    return (
        <>
            <TransitionLayout from='bottom'>
                <Table columns={columns} data={tmp.docs.map(el=>el?el.data:el)}/>
            </TransitionLayout>
        </>
    )
}

export const tmp = {
    "docs": [
        {
            "_id": "de47c746b1ea2746a416e3dc",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "﻿Ls",
                "PuId": "PuId",
                "PuName": "PuValue",
                "PuValue": "PuValue",
                "PuDate": "PuDate",
                "PuScaleId": "PuScaleId",
                "TransferBday": "TransferBday",
                "TransferEday": "TransferEday",
                "PuMeasure": "PuMeasure",
                "_id": "de47c746b1ea2746a416e3dc"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "c6ad67210a82a5290172bde4",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018059134",
                "PuId": "2836755",
                "PuName": "411,4000",
                "PuValue": "411,4000",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "0",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "c6ad67210a82a5290172bde4"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "f555194ab15e2d8d12601d74",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018059134",
                "PuId": "2836756",
                "PuName": "36,0000",
                "PuValue": "36,0000",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "0",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "f555194ab15e2d8d12601d74"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "a52ae274f0da0f3a34536e01",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018064053",
                "PuId": "2499056",
                "PuName": "9450,0000",
                "PuValue": "9450,0000",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "2",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "a52ae274f0da0f3a34536e01"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "13052249b1026da3427283fd",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018064077",
                "PuId": "2499145",
                "PuName": "10128,9000",
                "PuValue": "10128,9000",
                "PuDate": "01.06.2022 0:00:00",
                "PuScaleId": "1",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "13052249b1026da3427283fd"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "64546a4d75c5198a8f8748cd",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018064138",
                "PuId": "2500001",
                "PuName": "231,0000",
                "PuValue": "231,0000",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "0",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "64546a4d75c5198a8f8748cd"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "9e4f535798e8f2e48b55b990",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018064176",
                "PuId": "2757258",
                "PuName": "171,9000",
                "PuValue": "171,9000",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "0",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "9e4f535798e8f2e48b55b990"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "094c75c26c63a51106fb45a9",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018001881",
                "PuId": "2617952",
                "PuName": "1698,0000",
                "PuValue": "1698,0000",
                "PuDate": "01.03.2021 0:00:00",
                "PuScaleId": "2",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "094c75c26c63a51106fb45a9"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "8955d077a39aa8921af9f8fa",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018001966",
                "PuId": "2467034",
                "PuName": "113,5500",
                "PuValue": "113,5500",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "0",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "8955d077a39aa8921af9f8fa"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        },
        {
            "_id": "de4c041cc5b4fcab3dccef76",
            "createdAt": "2022-09-22T13:29:08.187Z",
            "createdBy": "632b2c90050946e0628bc7fb",
            "data": {
                "Ls": "1018001966",
                "PuId": "2467035",
                "PuName": "77,3400",
                "PuValue": "77,3400",
                "PuDate": "01.07.2022 0:00:00",
                "PuScaleId": "0",
                "TransferBday": "1",
                "TransferEday": "20",
                "PuMeasure": "",
                "_id": "de4c041cc5b4fcab3dccef76"
            },
            "org_id": "632b2bde1e18d5955b6cd62a",
            "table_id": "632c5f74c7574ba5243e4b29",
            "updatedAt": "2022-09-22T13:29:29.496Z",
            "updatedBy": "632b2c90050946e0628bc7fb"
        }
    ],
    "totalDocs": 62,
    "limit": 10,
    "totalPages": 7,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2,
    "headers": {
        "Ls": "Проверяю работу заголовка",
        "PuId": "Проверяю работу заголовка1",
        "PuName": "Проверяю работу заголовка1",
        "PuValue": "PuValue",
        "PuDate": "PuDate",
        "PuScaleId": "PuScaleId",
        "TransferBday": "TransferBday",
        "TransferEday": "TransferEday",
        "PuMeasure": "PuMeasure"
    }
}