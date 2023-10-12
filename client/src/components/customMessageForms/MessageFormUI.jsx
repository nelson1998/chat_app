/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

const MessageFormUI = ({
    setAttachment,
    message,
    handleChange,
    handleSubmit,
    appendText,
}) => {
    const [preview, setPreview] = useState("");
    const airplaneIconRef = useRef();

    const keyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setPreview("");
            handleSubmit();
            airplaneIconRef.current.click(); // Trigger the click event on the PaperAirplaneIcon
        }
    };

    return (
        <div className="message-form-container">
            {preview && ( 
                <div className="message-form-preview">
                    <img alt="message-form-preview" className="message-form-preview-image" src={preview} onLoad={() => URL.revokeObjectURL(preview)} />
                    <XMarkIcon className="message-form-icon-x" onClick={() => {
                        setPreview("");
                        setAttachment("");
						}}
                    />
                </div>
            )}

            <div className="message-form">
                <div className="message-form-input-container">
                    <input className="message-form-input" type="text" value={message} onChange={handleChange} onKeyDown={keyPress} placeholder="Send a message..." />
                    {appendText && (
                        <input className="message-form-assist" type="text" disable="disabled" value={`${message} ${appendText}`} />
                    )}
                </div>

                <div className="message-form-icons">
                    <Dropzone acceptedFiles=".jpg, .jpeg, .png" multiple={false} noClick={true} onDrop={(acceptedFiles) => {
                            setAttachment(acceptedFiles[0]);
                            setPreview(URL.createObjectURL(acceptedFiles[0]));
							}} 
                    > 

                        {({ getRootProps, getInputProps, open }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PaperClipIcon className="message-form-icon-clip" onClick={open} />
                            </div>
                        )}
                    </Dropzone>

                    <hr className="vertical-line" />
                    <PaperAirplaneIcon ref={airplaneIconRef} className="message-form-icon-airplane" onClick={() => {
                            setPreview("");
                            handleSubmit();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageFormUI;
