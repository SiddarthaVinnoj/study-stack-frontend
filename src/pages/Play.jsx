import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function Play() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  const playerRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id || user.id : null;

  // --- Load course and lesson ---
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/courses/${courseId}`);
        setCourse(res.data);
        const selectedLesson = res.data.lessons?.find(
          (l) => String(l.lessonId) === String(lessonId)
        );
        setLesson(selectedLesson);
      } catch (error) {
        console.log("Error loading lesson:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [courseId, lessonId]);

  // --- Load notes ---
  useEffect(() => {
    if (!userId || !lessonId) return;
    const allNotes = JSON.parse(localStorage.getItem("lessonNotes")) || {};
    const userNotes = allNotes[userId]?.[courseId]?.[lessonId] || [];
    setNotes(userNotes);
  }, [userId, courseId, lessonId]);

  // --- Load YouTube API and player ---
  useEffect(() => {
    if (!lesson) return;

    const getYouTubeId = (url) => {
      try {
        const regExp =
          /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
      } catch {
        return null;
      }
    };

    const videoId = getYouTubeId(lesson.video);
    if (!videoId) {
      console.error("Invalid video URL:", lesson.video);
      return;
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      if (playerRef.current) playerRef.current.destroy();
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        height: "400",
        width: "100%",
        playerVars: { rel: 0, modestbranding: 1 },
        events: { onReady: () => setPlayerReady(true) },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [lesson]);

  // --- Notes functions ---
  const addNote = () => {
    if (!noteText || !playerReady) return;
    const time = Math.floor(playerRef.current.getCurrentTime());
    const newNote = { text: noteText, time };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    const allNotes = JSON.parse(localStorage.getItem("lessonNotes")) || {};
    if (!allNotes[userId]) allNotes[userId] = {};
    if (!allNotes[userId][courseId]) allNotes[userId][courseId] = {};
    if (!allNotes[userId][courseId][lessonId]) allNotes[userId][courseId][lessonId] = [];
    allNotes[userId][courseId][lessonId] = updatedNotes;
    localStorage.setItem("lessonNotes", JSON.stringify(allNotes));

    setNoteText("");
  };

  const goToTimestamp = (time) => {
    if (playerReady && playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);

    const allNotes = JSON.parse(localStorage.getItem("lessonNotes")) || {};
    if (allNotes[userId]?.[courseId]?.[lessonId]) {
      allNotes[userId][courseId][lessonId] = updatedNotes;
      localStorage.setItem("lessonNotes", JSON.stringify(allNotes));
    }
  };

  if (loading)
    return <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  if (!lesson || !course)
    return <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Lesson not found</h2>;

  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif", backgroundColor: "#121212", minHeight: "100vh", padding: "20px" }}>
      
      {/* VIDEO + LESSON LIST */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* VIDEO & NOTES */}
        <div style={{ flex: "2 1 600px", minWidth: "300px" }}>
          <h2 style={{ color: "white", fontSize: "28px", marginBottom: "15px" }}>{lesson.title}</h2>
          <div id="youtube-player" style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.7)", marginBottom: "20px" }}></div>

          {/* NOTES */}
          <div style={{ backgroundColor: "#1f1f1f", padding: "15px", borderRadius: "10px" }}>
            <h3 style={{ color: "#e85d26", marginBottom: "10px" , paddingLeft:'5px', paddingTop:'5px'}}>Your Notes</h3>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <textarea
                placeholder="Write your note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#2b2b2b", color: "white", fontSize: "14px", resize: "none", minHeight: "60px" }}
              />
              <button
                onClick={addNote}
                style={{ marginLeft: "10px", padding: "10px 20px", backgroundColor: "#e85d26", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
              >
                Add Note
              </button>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {notes.map((note, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", padding: "8px", borderRadius: "6px", backgroundColor: "#2b2b2b" }}>
                  <div>
                    <span
                      onClick={() => goToTimestamp(note.time)}
                      style={{ cursor: "pointer", color: "#e85d26", fontWeight: "bold", marginRight: "10px", paddingLeft:'5px', paddingTop:'5px' }}
                    >
                      [{new Date(note.time * 1000).toISOString().substr(14, 5)}]
                    </span>
                    <span style={{ color: "white" }}>{note.text}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(idx)}
                    style={{ color: "white", background: "#555", border: "none", borderRadius: "5px", cursor: "pointer", padding: "5px 10px" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LESSON LIST */}
        <div style={{ flex: "1 1 250px", minWidth: "200px", backgroundColor: "#1f1f1f", padding: "20px", borderRadius: "10px", height: "fit-content", alignSelf: "flex-start" }}>
          <h3 style={{ color: "#e85d26", marginBottom: "15px" }}>Lessons</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {course.lessons?.map((l) => (
              <li key={l.lessonId} style={{ marginBottom: "10px" }}>
                <Link
                  to={`/play/${courseId}/${l.lessonId}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: String(l.lessonId) === String(lessonId) ? "bold" : "normal",
                    backgroundColor: String(l.lessonId) === String(lessonId) ? "#e85d26" : "transparent",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    display: "inline-block"
                  }}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate(`/course/${courseId}`)}
            style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#e85d26", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", width: "100%" }}
          >
            Back to Course
          </button>
        </div>

      </div>
    </div>
  );
}

export default Play;