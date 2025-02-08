'use client';
import styles from "./forum.module.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { PlusIcon, Search, Loader2, MessageSquareText } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "./input";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RedditForum() {
  const [queryText, setQueryText] = useState("");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryTags, setQueryTags] = useState("");
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [answerInputs, setAnswerInputs] = useState({});
  const [page, setPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const { data, error } = await supabase.from("reddit").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setQueries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const postQuery = async () => {
    if (!queryText.trim() || !queryTitle.trim()) return;

    const newQuery = {
      name: "Student", // Replace with actual user data from authentication
      title: queryTitle,
      query: { query: queryText }, // Ensure proper JSON structure
      tags: queryTags.split(",").map(tag => tag.trim()),
      created_at: new Date().toISOString(),
      answers: []
    };

    const { error } = await supabase.from("reddit").insert([newQuery]);
    if (error) console.error(error);
    setQueryText("");
    setQueryTitle("");
    setQueryTags("");
    fetchQueries();
};

  const postAnswer = async (queryId, answerText) => {
    if (!answerText.trim()) return;
    const updatedQueries = queries.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          answers: [
            ...q.answers,
            {
              name: "Professor",
              department: "CS",
              answer: answerText,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return q;
    });
    const { error } = await supabase
      .from("reddit")
      .update({ answers: updatedQueries.find(q => q.id === queryId).answers })
      .eq("id", queryId);
    if (error) console.error(error);
    setAnswerInputs(prev => ({ ...prev, [queryId]: "" }));
    fetchQueries();
  };

  const filteredQueries = queries.filter(
    q =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.query.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredQueries.length / questionsPerPage);
  const displayedQueries = filteredQueries.slice((page - 1) * questionsPerPage, page * questionsPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Recent Questions</h1>
      <div className={styles.roleToggle}>
        <button onClick={() => setUserRole("student")} className={userRole === "student" ? styles.activeRole : ""}>
          Switch to Student
        </button>
        <button onClick={() => setUserRole("professor")} className={userRole === "professor" ? styles.activeRole : ""}>
          Switch to Professor
        </button>
      </div>
      {userRole === "student" && (
        <div className={styles.inputContainer}>
          <Input value={queryTitle} onChange={e => setQueryTitle(e.target.value)} placeholder="Title" />
          <Input value={queryText} onChange={e => setQueryText(e.target.value)} placeholder="Ask a question..." />
          <Input value={queryTags} onChange={e => setQueryTags(e.target.value)} placeholder="Tags (comma-separated)" />
          <button onClick={postQuery} className={styles.askButton}><PlusIcon /> Post</button>
        </div>
      )}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <Input placeholder="Search questions..." className={styles.searchInput} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </div>
      {loading ? (
        <div className={styles.loading}><Loader2 className={styles.spinner} /><span>Loading...</span></div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div>
          <div className={styles.queryList}>
            {displayedQueries.map(q => (
              <div key={q.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{q.title}</h3>
                  <div className={styles.tags}>{q.tags.map((tag, index) => <span key={index} className={styles.tag}>#{tag}</span>)}</div>
                </div>
                <p className={styles.cardBody}>{q.query.query}</p>
                <p className={styles.author}>Asked by: {q.name}</p>
                <div className={styles.answers}>{q.answers.map((ans, i) => <div key={i} className={styles.answer}><p>{ans.answer}</p><span>- {ans.name}, {ans.department}</span></div>)}</div>
                {userRole === "professor" && (
                  <div className={styles.answerInputContainer}>
                    <textarea placeholder="Write your answer..." value={answerInputs[q.id] || ""} onChange={e => setAnswerInputs(prev => ({ ...prev, [q.id]: e.target.value }))} className={styles.answerInput} />
                    <button onClick={() => postAnswer(q.id, answerInputs[q.id])} className={styles.answerButton}><MessageSquareText /> Post Answer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={styles.paginationButton}
  >
    <ChevronLeft className={styles.paginationIcon} />
  </button>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => setPage(pageNumber)}
      className={`${styles.paginationButton} ${
        page === pageNumber ? styles.active : ""
      }`}
    >
      {pageNumber}
    </button>
  ))}
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className={styles.paginationButton}
  >
    <ChevronRight className={styles.paginationIcon} />
  </button>
</div>
        </div>
      )}
    </div>
  );
}
