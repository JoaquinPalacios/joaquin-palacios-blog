"use client";

import { useState, FormEvent } from "react";

export function Comments({ id, uid }: { id: string; uid: string }) {
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);

  // const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   console.log("test");

  //   await fetch(`/api/comments/submit`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       post_id: id,
  //       nickname,
  //       email,
  //       comment,
  //       uid,
  //     }),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       // if (response.ok) {
  //       setLoading(false);
  //       setComment("");
  //       setEmail("");
  //       setNickname("");
  //       // }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div className="comments">
      <h3>Share your thoughts</h3>
      <form>
        {/* <form onSubmit={onSubmit}> */}
        <div>
          <label htmlFor="comment" className="mb-2 mt-6 text-md block">
            Comment
          </label>
          <textarea
            id="comment"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment"
            className="w-full border p-4"
            value={comment}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 mt-6 text-md block">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            className="w-full border p-4"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="nickname" className="mb-2 mt-6 text-md block">
            Nickname
          </label>
          <input
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            placeholder="Your nickname"
            className="w-full border p-4"
            value={nickname}
          />
        </div>
        <button
          className="p-4 rounded-lg bg-slate-700 text-white mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send comment"}
        </button>
      </form>
    </div>
  );
}
