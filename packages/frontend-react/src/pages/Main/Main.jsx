import React from "react";
import TransitionLayout from "../../page_layouts/TransitionLayout/TransitionLayout.jsx";
import Select from '../../components/Select/Select'
import Multiselect from "multiselect-react-dropdown";

export default function Main() {



    const rules = React.useMemo(() => [
        {
            type: 'category',
            code: 'A',
            label: 'Категория 1',
            items: [
                {
                    type: 'category',
                    label: 'Подкатегория 1',
                    code: 'a',
                    items: [
                        {
                            type: 'rule',
                            label: 'Правило A/a/hui',
                            code: 'hui'
                        },
                        {
                            type: 'rule',
                            label: 'Правило A/a/her',
                            code: 'her'
                        },
                        {
                            type: 'rule',
                            label: 'Правило A/a/zalupa',
                            code: 'zalupa'
                        }
                    ]
                },
                {
                    type: 'rule',
                    label: 'Правило A/herota',
                    code: 'herota'
                }
            ]
        }
    ], [])

    const options = React.useMemo(() => [
        {
            cat: 'Group 1',
            key: 'Option 1',
            value: 1,
            label: 1
        },
        {
            cat: 'Group 1',
            key: 'Option 2',
            options: [
                {
                    cat: 'Group 8',
                    key: 'options 3'
                }
            ]
        },
        {
            cat: 'Group 1',
            key: 'Option 3'
        },
        {
            cat: 'Group 2',
            key: 'Option 4'
        },
        {
            cat: 'Group 2',
            key: 'Option 5'
        },
        {
            cat: 'Group 2',
            key: 'Option 6'
        },
        {
            cat: 'Group 2',
            key: 'Option 7'
        }
    ], [])
    //console.log(hello)
    return (
        <>
            <TransitionLayout>
                main
                {/* <Select options={options} /> */}
                <Multiselect groupBy="cat" options={options} />
            </TransitionLayout>
        </>
    )
}