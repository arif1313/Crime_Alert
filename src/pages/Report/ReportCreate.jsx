import { useState } from "react";
import { Link } from "react-router-dom";

const ReportCreate = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isTextEditing, setIsTextEditing] = useState(false);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages([...images, ...newImages]); // Append new images
    };

    return (
        <div className="w-full max-w-3xl  mx-auto space-y-6 mt-20 min-h-screen py-10">
            <div className="flex flex-col lg:flex-row bg-[#ffc8cb] p-5 rounded-md shadow-md w-full text-[#47080b] ">
                {/* Image Section */}
                <div className="relative w-full lg:w-72 h-72 bg-gray-300 rounded-md shadow-2xl flex overflow-hidden">
                    {images.length > 0 ? (
                        <div className="w-full h-full">
                            {images.length === 1 && (
                                <img src={images[0]} className="w-full h-full object-cover rounded-md" alt="Uploaded" />
                            )}
                            {images.length === 2 && (
                                <div className="flex flex-col w-full h-full gap-1">
                                    {images.slice(0, 2).map((img, index) => (
                                        <img key={index} src={img} className="w-full h-1/2 object-cover object-top rounded-md" alt="Uploaded" />
                                    ))}
                                </div>
                            )}
                            {images.length === 3 && (
                                <div className="w-full h-full grid grid-rows-2 gap-1">
                                    <div>
                                        <img src={images[0]} className="object-cover h-full w-full object-top" alt="Uploaded" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 h-1/2">
                                        {images.slice(1, 3).map((img, index) => (
                                            <img key={index} src={img} className="w-full h-full object-cover rounded-md" alt="Uploaded" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {images.length === 4 && (
                                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
                                    {images.slice(0, 4).map((img, index) => (
                                        <img key={index} src={img} className="w-full h-full object-cover object-top rounded-md" alt="Uploaded" />
                                    ))}
                                </div>
                            )}
                            {images.length > 4 && (
                                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
                                    {images.slice(0, 3).map((img, index) => (
                                        <img key={index} src={img} className="w-full h-full object-cover object-top rounded-md" alt="Uploaded" />
                                    ))}
                                    <div className="relative">
                                        <img src={images[3]} className="w-full h-full object-cover object-top rounded-md" alt="Uploaded" />
                                        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold rounded-md">
                                            +{images.length - 4}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                            <span className="bg-gray-800 text-white px-4 py-2 rounded">Upload Image(s)</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                        </label>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5 w-full">
                    {/* Editable Title with Fixed Width */}
                    <div className="w-full max-w-[400px]">
                        {isTitleEditing ? (
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => setIsTitleEditing(false)}
                                className="input input-bordered text-xl font-bold min-w-0 w-full"
                                placeholder="Write a Headline"
                                autoFocus
                            />
                        ) : (
                            <h1
                                className={`text-2xl font-bold cursor-pointer ${title ? "" : "text-gray-400"}`}
                                onClick={() => setIsTitleEditing(true)}
                            >
                                {title || "Crime Headline"}
                            </h1>
                        )}
                    </div>

                    {/* Editable Description */}
                    <div className="w-full">
                        {isTextEditing ? (
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onBlur={() => setIsTextEditing(false)}
                                className="textarea textarea-bordered w-full mt-2"
                                placeholder="Write description"
                                autoFocus
                            />
                        ) : (
                            <p
                                className={`py-6 cursor-pointer ${text ? "" : "text-gray-400"}`}
                                onClick={() => setIsTextEditing(true)}
                            >
                                {text || "Crime Description"}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            
        <Link to=""  className="btn my-10 bg-red-500 text-white">
        post 
          </Link>

          <button className="btn my-10 btn-primary text-white" >
            Descard
          </button>

        </div>
    );
};

export default ReportCreate;
