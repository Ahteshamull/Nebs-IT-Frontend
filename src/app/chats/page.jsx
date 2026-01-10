"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";

export default function MessagePage() {
  const demoCurrentUserId = "me";

  const [conversations, setConversations] = useState(() => [
    {
      _id: "c1",
      participants: [
        { _id: "me", fullname: "You", avatar: "" },
        { _id: "u1", fullname: "John Smith", avatar: "https://avatar.iran.liara.run/public/28" },
      ],
      lastMessage: {
        text: "That would be great! Also, are you flexible on the price?",
        createdAt: Date.now() - 1000 * 60 * 60,
      },
      messages: [
        {
          id: "m1",
          text: "What's the condition of the plate? Any damage or wear?",
          createdAt: Date.now() - 1000 * 60 * 60 * 4,
          msgByUserId: "u1",
        },
        {
          id: "m2",
          text: "It's in excellent condition, no visible damage.",
          createdAt: Date.now() - 1000 * 60 * 60 * 3,
          msgByUserId: "me",
        },
        {
          id: "m3",
          text: "That would be great! Also, are you flexible on the price?",
          createdAt: Date.now() - 1000 * 60 * 60 * 2,
          msgByUserId: "u1",
        },
      ],
    },
    {
      _id: "c2",
      participants: [
        { _id: "me", fullname: "You", avatar: "" },
        { _id: "u2", fullname: "Mike Wilson", avatar: "https://avatar.iran.liara.run/public/29" },
      ],
      lastMessage: {
        text: "Thanks for the quick response!",
        createdAt: Date.now() - 1000 * 60 * 60 * 24,
      },
      messages: [
        {
          id: "m4",
          text: "Thanks for the quick response!",
          createdAt: Date.now() - 1000 * 60 * 60 * 24,
          msgByUserId: "u2",
        },
      ],
    },
  ]);

  const [selectedConversationId, setSelectedConversationId] = useState(
    conversations[0]?._id || null,
  );
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!selectedConversationId && conversations.length)
      setSelectedConversationId(conversations[0]._id);
  }, []);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const id = setTimeout(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      } catch (e) {
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
    return () => clearTimeout(id);
  }, [selectedConversationId, conversations]);

  const filteredConvs = conversations.filter((c) => {
    const other = (c.participants || []).find((p) => p._id !== demoCurrentUserId) || {};
    return other.fullname?.toLowerCase().includes(search.toLowerCase());
  });

  const selectedConversation = conversations.find((c) => c._id === selectedConversationId) || null;

  const handleSend = () => {
    const text = (newMessage || "").trim();
    if (!text || !selectedConversationId) return;

    setConversations((prev) =>
      prev.map((c) =>
        c._id === selectedConversationId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: String(Date.now()),
                  text,
                  createdAt: Date.now(),
                  msgByUserId: demoCurrentUserId,
                },
              ],
              lastMessage: { text, createdAt: Date.now() },
            }
          : c,
      ),
    );

    setNewMessage("");
    // keep mobile view open
  };

  const handleConversationSelect = (id) => {
    setSelectedConversationId(id);
    setShowChat(true);
  };

  const handleBackToConversations = () => {
    setShowChat(false);
  };

  return (
    <div className="bg-sidebar min-h-[calc(100vh-104px)] w-full p-3">
      <div
        className="flex h-[calc(100vh-104px)] w-full flex-col gap-4 lg:flex-row"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Left */}
        <div
          className={`bg-sidebar flex h-full w-full flex-col gap-4 lg:w-[450px] ${showChat ? "hidden lg:flex" : "flex"}`}
        >
          <div className="bg-card border-border flex items-center gap-2 rounded-md border p-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex h-full flex-1 flex-col gap-2 overflow-y-auto">
            {filteredConvs.map((c) => {
              const other = (c.participants || []).find((p) => p._id !== demoCurrentUserId) || {};
              return (
                <div
                  key={c._id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all ${c._id === selectedConversationId ? "bg-[#B9D1F6]" : "border border-[#EAECEE] hover:bg-gray-50"}`}
                  onClick={() => handleConversationSelect(c._id)}
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={other.avatar || ""}
                      alt={other.fullname}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-foreground truncate text-sm font-semibold">
                          {other.fullname || "Unknown"}
                        </h3>
                        <p className="text-muted-foreground truncate text-xs">
                          {c.lastMessage?.text || ""}
                        </p>
                      </div>
                      <span className="text-muted-foreground ml-2 text-xs">
                        {new Date(c.lastMessage?.createdAt || Date.now()).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat */}
        <div
          className={`border-border bg-sidebar flex h-full min-h-0 flex-1 flex-col border-t lg:border-t-0 lg:border-l ${!showChat && !selectedConversationId ? "hidden lg:flex" : "flex"}`}
        >
          <div className="border-border flex items-center gap-3 border-b p-4">
            <button
              onClick={handleBackToConversations}
              className="rounded-full p-2 hover:bg-gray-100 lg:hidden"
            >
              <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
            </button>
            <h2 className="text-foreground truncate text-lg font-medium">
              {(selectedConversation &&
                (
                  (selectedConversation.participants || []).find(
                    (p) => p._id !== demoCurrentUserId,
                  ) || {}
                ).fullname) ||
                "No conversation selected"}
            </h2>
          </div>

          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
            {!selectedConversation ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-lg text-gray-400">💬</div>
                  <p className="text-sm text-gray-500">Select a conversation to start chatting</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {selectedConversation.messages.map((message) => {
                  const isMe = String(message.msgByUserId) === String(demoCurrentUserId);
                  return (
                    <div
                      key={message.id || message._id || message.createdAt}
                      className={`flex gap-3 ${isMe ? "justify-end" : ""}`}
                    >
                      {!isMe && (
                        <div className="bg-muted h-8 w-8 shrink-0 overflow-hidden rounded-full">
                          <img
                            src={(selectedConversation.participants || [])[1]?.avatar || ""}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[90%] ${isMe ? "items-end text-right" : "items-start"}`}
                      >
                        <div
                          className={`${isMe ? "bg-card" : "bg-primary/20"} text-foreground inline-block rounded-[20px] px-4 py-3`}
                        >
                          {message.text}
                        </div>
                        <div className="text-muted-foreground mt-1 text-xs">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </div>
                      </div>

                      {isMe && (
                        <div className="bg-muted h-8 w-8 shrink-0 overflow-hidden rounded-full">
                          <img src="" alt="me" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedConversation && (
            <div className="p-4">
              <div className="border-border bg-card flex items-center gap-3 rounded-[40px] border p-3">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent outline-none"
                />
                <button
                  onClick={handleSend}
                  className="border-border hover:bg-primary/10 rounded-full border p-2"
                >
                  <Send className="text-primary h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
