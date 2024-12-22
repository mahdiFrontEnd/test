import {useSearchParams} from "react-router-dom";


const UseSetParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const dispatch = useDispatch()

    const handleSetParams = (newFilter) => {

        let params = {}

        // eslint-disable-next-line no-restricted-syntax
        for (const [k, v] of searchParams.entries()) {
            params = {...params, [k]: v}
        }

        params.skip = 0
        // eslint-disable-next-line array-callback-return
        newFilter.map((item) => {
            params = {...params, [item?.key]: item?.value}
        })

        const handleDelete = (key) => {
            delete params[key]
        }


        const convertToString = (key) => {
            params[key] = JSON.stringify(params[key])
        }

        Object.entries(params).forEach(([key, value]) => {


            if (['', undefined, 'undefined', null, 0, '0'].includes(value) && !value) {
                handleDelete(key)
            } else if (Array.isArray(value)) {
                if (value?.length > 0) {
                    convertToString(key)
                } else {
                    handleDelete(key)
                }
            }

        });

        setSearchParams({...params})
        // dispatch(getFilter({...params}));

    };

    const handleSetSkipTakeParams = (skip, take) => {
        // eslint-disable-next-line no-shadow
        let searchObj = {}

        // eslint-disable-next-line no-restricted-syntax
        for (const [k, v] of searchParams.entries()) {
            searchObj = {...searchObj, [k]: v}
        }



        setSearchParams({...searchObj, skip, take})
    }
    const handleDeleteParams = (x={}) => {
        setSearchParams(x)
    }


    return [handleSetParams, handleDeleteParams, handleSetSkipTakeParams];
};

export default UseSetParams;