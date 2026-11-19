"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Check,
  Send,
  Sparkles,
  User,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ParentInteractions({ articleId, articleTitle }) {
  // 1. Likes State
  const [likes, setLikes] = useState(14);
  const [hasLiked, setHasLiked] = useState(false);

  // 2. Share State
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // 3. Comments State
  const [comments, setComments] = useState([
    {
      id: "c-1",
      name: "Selamawit B.",
      classroom: "Little Explorers (1-2 yrs)",
      text: "Seeing Nathan so engaged with the sensory painting made our whole week! Thank you teachers for the love and patience.",
      date: "2 days ago",
      avatarBg: "bg-rose-100 text-rose-600",
    },
    {
      id: "c-2",
      name: "Dawit & Rahel",
      classroom: "Curious Learners (2-3 yrs)",
      text: "Lia came home singing the morning circle rhyme all evening! Wonderful curriculum update.",
      date: "Yesterday",
      avatarBg: "bg-sky-100 text-sky-600",
    },
  ]);

  const [authorName, setAuthorName] = useState("");
  const [classroom, setClassroom] = useState("Little Explorers (1-2 yrs)");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);

      // Restore like state
      const savedLike = localStorage.getItem(`lh_like_${articleId}`);
      if (savedLike) {
        setHasLiked(true);
        setLikes((prev) => prev + 1);
      }

      // Restore stored comments
      const storedComments = localStorage.getItem(`lh_comments_${articleId}`);
      if (storedComments) {
        try {
          const parsed = JSON.parse(storedComments);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setComments(parsed);
          }
        } catch {}
      }
    }
  }, [articleId]);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    if (typeof window !== "undefined") {
      localStorage.setItem(`lh_like_${articleId}`, "true");
    }
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {}
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this week's classroom story from Little Heroes Daycare: "${articleTitle}"\n${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(
      `Check out this week's classroom story from Little Heroes Daycare: "${articleTitle}"`
    );
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`,
      "_blank"
    );
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const newComment = {
        id: `c-${Date.now()}`,
        name: authorName.trim(),
        classroom: classroom,
        text: commentText.trim(),
        date: "Just now",
        avatarBg: "bg-emerald-100 text-emerald-600",
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem(`lh_comments_${articleId}`, JSON.stringify(updated));
      }

      setCommentText("");
      setAuthorName("");
      setSubmitting(false);
      setSubmittedToast(true);
      setTimeout(() => setSubmittedToast(false), 3500);
    }, 400);
  };

  return (
    <div className="mt-14 pt-10 border-t border-slate-100 dark:border-slate-800 space-y-12">
      {/* 1. Action Bar: Like Button & Addis Social Sharing */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-sky-50/50 dark:bg-slate-900/40 border border-sky-100 dark:border-slate-800">
        {/* Heart / Like Counter */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
              hasLiked
                ? "bg-rose-500 text-white shadow-rose-200 dark:shadow-none"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500"
            }`}
          >
            <Heart
              size={18}
              className={`${hasLiked ? "fill-white" : "text-rose-500"}`}
            />
            <span>{likes}</span>
            <span className="text-xs font-normal opacity-90">
              {hasLiked ? "Loved!" : "Love this"}
            </span>
          </motion.button>
          <span className="text-xs text-slate-400">
            {likes} families reacted
          </span>
        </div>

        {/* Share to WhatsApp & Telegram Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Share update:
          </span>

          {/* Telegram */}
          <button
            onClick={shareToTelegram}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9] hover:text-white transition-colors border border-[#229ED9]/20"
            title="Share with family on Telegram"
          >
            Telegram
          </button>

          {/* WhatsApp */}
          <button
            onClick={shareToWhatsApp}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20"
            title="Share with family on WhatsApp"
          >
            WhatsApp
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 border border-slate-200 dark:border-slate-700 transition-colors inline-flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="text-emerald-600 text-xs">Copied</span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Parent Community Comments Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-500 flex items-center justify-center">
              <MessageCircle size={16} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Family Notes & Feedback
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Leave a cheerful note for the educators and classroom assistants
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {comments.length} Notes
          </span>
        </div>

        {/* Comment Submission Form */}
        <form
          onSubmit={handleSubmitComment}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Almaz T. (Noah's Mom)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Child's Classroom Stage
              </label>
              <select
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all"
              >
                <option value="Little Explorers (1-2 yrs)">
                  Little Explorers (1 - 2 yrs)
                </option>
                <option value="Curious Learners (2-3 yrs)">
                  Curious Learners (2 - 3 yrs)
                </option>
                <option value="Confident Creators (3-4 yrs)">
                  Confident Creators (3 - 4 yrs)
                </option>
                <option value="Alumni / Visitor">Alumni / Family</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Message
            </label>
            <textarea
              required
              rows={3}
              placeholder="Share your thoughts on this week's activities or say thank you to the educators..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              Comments are shared with the Little Heroes educator team.
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 inline-flex items-center gap-1.5"
            >
              <Send size={13} />
              <span>{submitting ? "Posting..." : "Post Note"}</span>
            </button>
          </div>

          {submittedToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2"
            >
              <Sparkles size={14} />
              <span>Thank you! Your note has been posted for the team.</span>
            </motion.div>
          )}
        </form>

        {/* List of Comments */}
        <div className="space-y-3 pt-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      comment.avatarBg || "bg-sky-100 text-sky-600"
                    }`}
                  >
                    {comment.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {comment.name}
                    </h5>
                    <span className="text-[11px] font-medium text-sky-500">
                      {comment.classroom}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{comment.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
