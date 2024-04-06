import React from 'react';
import '../styles/output.css';

const OutputBox = ({ outputDetails, processing, theme }) => {
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
        <div className='shadow'>
            <p className='text-secondary text-start p-2 mt-4'>Compiler</p>
            <div className={theme == 'light' ? 'compiler bg-white text-dark' : 'compiler bg-dark text-white'}>

                $ {processing && "\nCompiling the code..."}
                <div className='output-window'>
                    {outputDetails ? <>{getOutput()}</> : null}
                </div>
                <hr />
                {outputDetails && <div className='output-window pt-3'>
                    <div className='d-flex justify-content-between'>
                        <p data-testid='status'>
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
                </div>}
            </div>
        </div>
    )
}

export default OutputBox;
