// src/components/CommentBox.jsx
import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { createPortal } from "react-dom";

 

export default function CommentBox({ projectId, onNewComment }) {
  const [commentText, setCommentText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifResults, setGifResults] = useState([]);
  const [gifSearch, setGifSearch] = useState("");
  const [recentStickers, setRecentStickers] = useState(
    JSON.parse(localStorage.getItem("recentStickers")) || []
  );

  const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  
  const addComment = async () => {
      if (!commentText.trim() && !selectedMedia) return;  
    const payload = {};
    if (commentText.trim()) payload.text = commentText;
    if (selectedMedia) payload.media = selectedMedia;


    try {
      const token = localStorage.getItem("access");
      const res = await api.post(
        `/api/accounts/projects/${projectId}/comments`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.new_comment) {
        onNewComment(res.data.new_comment);
        setCommentText("");
        setSelectedMedia(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    }
  };

  
  const onEmojiClick = (emojiObject) => {
    setCommentText((prev) => prev + emojiObject.emoji);
  };

   
  const searchGifs = async () => {
    if (!gifSearch.trim()) return;
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
          gifSearch
        )}&limit=12`
      );
      const data = await res.json();
      setGifResults(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

 
  const addGif = (gifUrl) => {
    setSelectedMedia(gifUrl);
    setCommentText(""); 
    setShowGifPicker(false);
    setGifResults([]);
    setGifSearch("");
    addToRecent(gifUrl);
  };

 
  const addSticker = (stickerUrl) => {
    setSelectedMedia(stickerUrl);
    setCommentText("");
    addToRecent(stickerUrl);
  };

  
  const addToRecent = (url) => {
    let updated = [url, ...recentStickers.filter((s) => s !== url)];
    if (updated.length > 12) updated = updated.slice(0, 12); 
    setRecentStickers(updated);
    localStorage.setItem("recentStickers", JSON.stringify(updated));
  };

  return (
    <div className="relative">
     
      {selectedMedia && (
        <div className="mb-2 relative w-max">
          <img src={selectedMedia} className="w-32 h-32 rounded" alt="preview" />
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-0 right-0 text-red-500 bg-gray-700 rounded-full p-1 text-xs"
          >
            ✕
          </button>
        </div>
      )}

 
      <textarea
        rows={3}
        placeholder="Write a comment..."
        className="w-full resize-none rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            addComment();
          }
        }}
      />

     
      <div className="absolute right-2 bottom-2 flex gap-1">
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 text-gray-400 hover:text-white"
        >
          😊
        </button>

        <button
          type="button"
          onClick={() => setShowGifPicker((prev) => !prev)}
          className="p-2 text-gray-400 hover:text-white"
        >
          GIF
        </button>

        <button
          onClick={addComment}
          disabled={!commentText.trim() && !selectedMedia}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

   
      {showEmojiPicker &&
        createPortal(
          <div className="fixed bottom-14 right-4 z-[9999]">
            <Picker onEmojiClick={onEmojiClick} theme="dark" />
          </div>,
          document.body
        )}

     
      {showGifPicker &&
        createPortal(
          <div className="fixed bottom-14 right-4 z-[9999] w-80 bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-lg">
         
            <input
              type="text"
              value={gifSearch}
              onChange={(e) => setGifSearch(e.target.value)}
              placeholder="Search GIFs..."
              className="w-full mb-2 px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={searchGifs}
              className="mb-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
            >
              Search
            </button>
 
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {gifResults.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height_small.url}
                  alt={gif.title}
                  className="cursor-pointer rounded"
                  onClick={() => addGif(gif.images.fixed_height.url)}
                />
              ))}
            </div>

     
            {recentStickers.length > 0 && (
              <>
                <p className="text-gray-400 text-xs mt-2">Recent</p>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {recentStickers.map((sticker, idx) => (
                    <img
                      key={idx}
                      src={sticker}
                      alt="recent-sticker"
                      className="cursor-pointer rounded"
                      onClick={() => addSticker(sticker)}
                    />
                  ))}
                </div>
              </>
            )}
 
          </div>,
          document.body
        )}
    </div>
  );
}
