import React from "react";

const ArticleCard = ({ image, title, description, button, size }: any) => {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg">
            {/* Background Image */}
            <img
                src={image}
                alt={title}
                className="w-full object-cover object-center h-full"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2
                    className={`${size === "sm" ? "text-sm" : "text-2xl"
                        } font-bold leading-tight`}
                >
                    {title.split(" ").map((word: any, index: any) => (
                        <span
                            key={index}
                            className={index % 2 !== 0 ? "text-orange-500" : ""}
                        >
                            {word}{" "}
                        </span>
                    ))}
                </h2>
                <p
                    className={`mt-2 ${size === "sm" ? "text-xs" : "text-sm"
                        } text-gray-200`}
                >
                    {description}
                </p>
                <p
                    className={`mt-2 ${size === "sm" ? "text-xs" : "text-sm"
                        } text-gray-200 italic`}
                >
                    baca selengkapnya
                </p>

                {/* Action Buttons */}
                {
                    button && (
                        <div className="mt-4 flex items-center space-x-4 justify-end ">
                            <div className="bg-gray-800 flex items-center space-x-4 justify-end">
                                <button className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70">
                                    <span>💬</span>
                                </button>
                                <button className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70">
                                    <span>❤️</span>
                                </button>
                                <button className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70">
                                    <span>🔄</span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ArticleCard;
