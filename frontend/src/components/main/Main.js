import {PointsTable} from "./sub/PointsTable";
import Header from "../base/Header";
import {PointForm} from "./sub/PointForm";
import {TableControl} from "./sub/TableControl";
import {Graph} from "./sub/Graph";

export function Main() {
    return (
        <div>
            <Header />
            <div className="mt-3 d-flex justify-content-center flex-wrap align-items-start">

                <div className="d-flex flex-column align-items-center m-3">
                    <Graph width={350} height={350} />
                    <PointForm />
                </div>

                <div className="user-select-none border border-1 rounded p-2 m-3 shadow">
                    <TableControl />
                    <PointsTable />
                </div>

            </div>
        </div>
    )
}
