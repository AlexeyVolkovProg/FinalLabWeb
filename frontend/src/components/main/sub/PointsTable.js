import {Table} from "react-bootstrap";
import {useFetchAllQuery} from "../../../api/pointsApi";
import {useSelector} from "react-redux";
import {selectPage, selectSize} from "../../../redux/points/pointsSelectors";
import {LoadError} from "../../util/LoadError";

export function PointsTable() {
    const page = useSelector(selectPage)
    const size = useSelector(selectSize)

    let {data, isLoading, isError} = useFetchAllQuery({page, size})

    const formatDateTime = (time) => {
        const date = new Date(time)
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return date.toLocaleString('ru', options)
    }

    if (isLoading) {
        data = []
    }

    if (isError) {
        return <LoadError />
    }

    return (
        <div className="text-center table-responsive border border-1 rounded overflow-auto"
             style={{maxHeight: 662, }}>
            <Table striped borderless hover className="m-0">
                <thead style={{position: "sticky", top: "0", backgroundColor: "white"}}>
                    <tr>
                        <th>Date & time</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length !== 0 ?
                        data.map(el => (
                            <tr key={Math.random().toString(16).slice(2)}>
                                <td>{el.creationTime}</td>
                                <td>{el.x}</td>
                                <td>{el.y}</td>
                                <td>{el.r}</td>
                                <td style={{color: el.result ? "green" : "red"}}>{el.result ? "Hit" : "Miss"}</td>
                            </tr>
                        )) :
                        null
                    }
                </tbody>
            </Table>
        </div>
    )
}
