import { useEffect, useRef, useState } from "react";
import styled from "./Chatbot.module.css";
import { useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom'

import { request } from "../../services/service";
import { socket } from "../../socket";

const Chatbot = () => {
  const currUser = useSelector(state => state.auth.currUser);
  const messagesEndRef = useRef();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [getMessages, setGetMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState('');

  const fetchMessage = async (roomId) => {
    if (roomId) {

      try {
        const { data } = await request.getMessages(roomId);
        if (data.message === "ok") {
          setGetMessages(data.result);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [getMessages])

  const sendMessage = async() => {
    if(message && roomId && currUser) {
      try{
        const value = {
          userId: currUser?.userId,
          roomId: roomId,
          content: message
        }
        const { data } = await request.sendMessage(value);
        if(data.message === 'ok') {
        socket.emit('send-message', data.result);
        setGetMessages(prev => [...prev, data.result])
          // fetchMessage(roomId);
          setMessage('');
        }
      }catch(err) {
        console.error(err);
      }
    }
  }

  const handleToggleChat = async () => {
    if(!currUser) {
      return navigate('/login');
    }
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      try {
        const value = {
          userId: currUser?.userId,
        };
        const { data } = await request.createRoom(value);
        if (data.message === "ok") {
          socket.emit('create-room', data.result)
          // fetchMessage(data.result._id);
          setRoomId(data.result._id);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const { data } = await request.deleteRoom(roomId);
        if (data.message === "ok") {
          // socket.emit('delete-room', data.result)
          setGetMessages([]);
          setRoomId('');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendMessage = (e) => {
    if(e.key === 'Enter' && message) {
      sendMessage();
    }
  }

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [getMessages]);

  // socket
  useEffect(() => {

    socket.emit('userData', currUser);

    socket.on('receiver', (data) => {
      setGetMessages(prev => [...prev, data]);
    })

    socket.on('chat', data => {
      if(data.action === 'delete-room') {
        setIsOpen(false);
      setGetMessages([]);
      setMessage('');
      }
    })

    return () => {
      socket.removeAllListeners();
    }
  }, [])

  return (
    <div className={styled.chatbot}>
      <div className={styled.bubble} onClick={handleToggleChat}>
        <img src="images/chat.png" />
      </div>

      {isOpen && (
        <div className={styled.content}>
          <div className={styled.head}>
            <h4>Customer Support</h4>
            <button>let's Chat App</button>
          </div>
          <div
          style={{
            overflowY: "auto",
            overflowX: "none",
            height: '400px',
            padding: '20px'
          }}
          className={styled['scroll-bar']}
          >
            {getMessages &&
              getMessages?.map((m) => {
                return (
                  <div
                    key={m._id}
                    className="d-flex flex-wrap"
                    style={{
                      justifyContent:
                        m.creator?.role === 0 ? "flex-end" : "flex-start",
                      wordWrap: "break-word",
                    }}
                  >
                    {m.creator?.role === 0 ? '' : <img src="./images/user.webp" className="p-1" style={{alignItems: 'left', height: '50px'}} />}
                    <div
                      style={{
                        backgroundColor:
                          m.creator?.role === 0 ? "#eef5ff" : "#e4fbf8",
                        width: "fit-content",
                        maxWidth: "70%",
                        textAlign: 'left'
                      }}
                      className="text-black my-2 p-2 rounded-3"
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
              
              <div ref={messagesEndRef}></div>
          </div>

          <div className={styled.bottom}>
            <img src="./images/user.webp" />
            <input
              type="text"
              placeholder="What can i do for you!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleSendMessage}
            />
            <div>
              <i className="fas fa-paperclip"></i>
            </div>
            <div>
              <i className="fas fa-smile"></i>
            </div>
            <button className={styled.send} onClick={sendMessage}>
              <i
                className="fas fa-paper-plane"
                style={{ color: "#48b0f7" }}
              ></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
