import React from 'react'
import '../styles/output.css'

const OutputBox = ({ outputDetails, processing }) => {

    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            // compilation error
            return (
                <pre className="text-danger">
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre>
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="text-danger">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="text-danger">
                    {atob(outputDetails?.stderr)}
                </pre>
            );
        }
    };

    return (
        <div>
            <div className='compiler'>
                <p>Output</p>
                <hr />
                $ {processing && "\nCompiling the code..."}
                <div className='output-window'>
                    {outputDetails ? <>{getOutput()}</> : null}
                </div>
                <hr />

            </div>
            <div className='output-window p-3 bg-secondary'>

                <div className='d-flex justify-content-around'>
                    <p>
                        Status:{" "}
                        <span className="text-success">
                            {outputDetails?.status?.description}
                        </span>
                    </p>
                    <p>
                        Memory:{" "}
                        <span className="text-success">
                            {outputDetails?.memory}
                        </span>
                    </p>
                    <p>
                        Time:{" "}
                        <span className="text-success">
                            {outputDetails?.time}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OutputBox
