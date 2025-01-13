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
        <div className="shadow-lg" data-testid="output">
                <p className="text-secondary text-start p-2">Compiler</p>

            <div className={`${theme === 'light' ? 'bg-white text-dark' : 'bg-neutral-800 text-white'} compiler`} data-testid="status">
                $ {processing && "\nCompiling the code..."}

                <div className="output-window h-[80%]">
                    {outputDetails ? <>{getOutput()}</> : null}
                </div>

                <hr className="my-4" />

                {outputDetails && (
                    <div className="output-window pt-3">
                        <div className="flex justify-between" data-testid="output">
                            <p data-testid="status">
                                Status:{" "}
                                <span className="text-green-500">
                                    {outputDetails?.status?.description}
                                </span>
                            </p>
                            <p>
                                Memory:{" "}
                                <span className="text-green-500">
                                    {outputDetails?.memory}
                                </span>
                            </p>
                            <p>
                                Time:{" "}
                                <span className="text-green-500">
                                    {outputDetails?.time}
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default OutputBox;
