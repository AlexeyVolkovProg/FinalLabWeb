import {Pagination, Placeholder} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, selectSize} from "../../../redux/points/pointsSelectors";
import {decPage, incPage, setPage} from "../../../redux/points/pointsSlice";
import {useCountAllQuery} from "../../../api/pointsApi";
import {LoadError} from "../../util/LoadError";

export function Paginator({maxBetweenNumber, className}) {
    const dispatch = useDispatch()
    const page = useSelector(selectPage)
    const size = useSelector(selectSize)
    const {data, isLoading, isError} = useCountAllQuery()
    const pagesNumber = Math.ceil(data / size) - 1
    const betweenNumber = Math.min(pagesNumber + 1, maxBetweenNumber)

    const handleFirst = () => dispatch(setPage(0))
    const handleLast = () => dispatch(setPage(pagesNumber))
    const handlePrev = () => dispatch(decPage())
    const handleNext = () => dispatch(incPage())

    let pages = []
    for (let i = 0; i < betweenNumber; i++) {
        if (page === 0) {
            pages.push(i)
        } else if (page === pagesNumber) {
            pages.push(pagesNumber - (betweenNumber - i - 1))
        } else {
            pages.push(page - Math.floor(betweenNumber / 2) + i)
        }
    }

    if (isLoading) {
        return <Placeholder xs={6}/>
    }
    if (isError) {
        return <LoadError/>
    }

    return (
        <Pagination className={className}>
            <Pagination.First disabled={page === 0} onClick={handleFirst}/>
            <Pagination.Prev disabled={page === 0} onClick={handlePrev}/>

            {
                pages.map(pageNumber => (
                        <Pagination.Item key={pageNumber}
                                         active={pageNumber === page}
                                         onClick={() => {
                                             dispatch(setPage(pageNumber))
                                         }}
                        >
                            {pageNumber + 1}
                        </Pagination.Item>
                    )
                )
            }

            <Pagination.Next disabled={page === pagesNumber || pagesNumber === -1} onClick={handleNext}/>
            <Pagination.Last disabled={page === pagesNumber || pagesNumber === -1} onClick={handleLast}/>
        </Pagination>
    )
}
