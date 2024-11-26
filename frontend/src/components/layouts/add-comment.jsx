import commentService from "@/services/comment-service";
import React, { useState } from "react";

const AddComment = ({ refModel, refId, setCommentModal }) => {
  const [rating, setRating] = useState(0); // Yulduzcha baholash
  const [hoverValue, setHoverValue] = useState(0);
  const [comment, setComment] = useState(""); // Matn maydoni
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const addCommentHandler = async (refModel, refId, rating, comment) => {
    try {
      const data = { text: comment, rating: rating };
      const response = await commentService.writeComment(refModel, refId, data);

      if (response) {
        setTimeout(() => {
          setCommentModal(false);
        }, 2000);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== "") {
      addCommentHandler(refModel, refId, rating, comment);
      setIsSubmitted(true);
    } else {
      alert("Iltimos, yulduzcha tanlang va fikr kiriting!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setCommentModal(false)}>
      <div className="bg-light rounded-lg shadow-lg p-6 w-96 relative" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Fikr Qo'shish{" "}
          <span
            onClick={() => setCommentModal(false)}
            className="absolute right-3 top-3 border w-[20px] h-[20px] transition-all flex items-center justify-center cursor-pointer pb-1 hover:bg-red-500 hover:text-white rounded"
          >
            &times;
          </span>
        </h2>
        {isSubmitted ? (
          <p className="text-green-600 text-center">Fikringiz muvaffaqiyatli yuborildi!</p>
        ) : (
          <>
            <div className="flex flex-row-reverse justify-center mb-4">
              {[...Array(5)].map((_, index) => {
                const value = 5 - index;
                return (
                  <span
                    key={value}
                    className={`text-3xl cursor-pointer transition ${value <= (hoverValue || rating) ? "text-yellow-400" : "text-gray-300"}`}
                    onMouseOver={() => setHoverValue(value)}
                    onMouseOut={() => setHoverValue(0)}
                    onClick={() => handleRating(value)}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <textarea
              className={`w-full h-24 p-3 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4`}
              placeholder="Fikringizni yozing..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button type="button" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleSubmit}>
              Yuborish
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddComment;
