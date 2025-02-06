'use client';
import styles from "./forum.module.css";
import { useRouter } from "next/navigation";
import { PlusIcon, Search, Loader2, ArrowRight } from "lucide-react";
import { Input } from "./input";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import QuestionDetails from "../Forum/questions/[id]/questionDetails"; // Import QuestionDetails component

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function QuestionCard({ title, body, category, author, hasAnswer, onViewDetails }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={`${styles.categoryBadge} ${styles[category.toLowerCase()]}`}>
          {category}
        </span>
      </div>
      <p className={styles.cardBody}>{body}</p>
      <div className={styles.cardFooter}>
        <span className={styles.author}>Asked by: {author}</span>
        {hasAnswer && <span className={styles.answeredBadge}>Answered ✅</span>}
      </div>
      <button className={styles.viewDetailsButton} onClick={onViewDetails}>
        View Details <ArrowRight className={styles.viewDetailsIcon} />
      </button>
    </div>
  );
}

export default function Forums() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // State for selected question
  const questionsPerPage = 5;

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const isStudent = /^f20.*@hyderabad\.bits-pilani\.ac\.in$/i.test(user.email);
        const isProfessor = /@hyderabad\.bits-pilani\.ac\.in$/i.test(user.email) && !isStudent;
        setUserRole(isStudent ? 'student' : isProfessor ? 'professor' : null);
      }
    };
    getUser();
  }, []);

  const fetchQuestions = async () => {
    try {
      const offset = (currentPage - 1) * questionsPerPage;
      const { data, error, count } = await supabase
        .from("questions")
        .select(`
          id, 
          title, 
          body, 
          category, 
          created_at, 
          has_answer,
          author_id,
          author_id:users(name, email)  // Fetching author's name and email
        `, { count: 'exact' })
        .range(offset, offset + questionsPerPage - 1)
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      setQuestions(data);
      setTotalQuestions(count);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchQuestions();
  }, [currentPage]);

  useEffect(() => {
    const subscription = supabase
      .channel('questions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'questions'
      }, () => fetchQuestions())
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const handleAskQuestion = () => router.push('/ask');
  const handleViewDetails = (id) => {
    setSelectedQuestionId(id); // Set the selected question's ID
  };

  const handleCloseDetails = () => {
    setSelectedQuestionId(null); // Reset selected question ID to close details
  };

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.user_id.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.pageTitle}>Recent Questions</h1>
            </div>
            {userRole === "student" && (
              <button onClick={handleAskQuestion} className={styles.button}>
                <PlusIcon className={styles.buttonIcon} /> Ask Question
              </button>
            )}
          </div>

          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <Input
                placeholder="Search questions by title, content, or author..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <Loader2 className={styles.spinner} />
              <span>Loading questions...</span>
            </div>
          ) : error ? (
            <div className={styles.error}>
              ⚠️ Error loading questions: {error}
            </div>
          ) : (
            <>
              <div className={styles.questionGrid}>
                {filteredQuestions.map(question => (
                  <QuestionCard
                    key={question.id}
                    title={question.title}
                    body={question.body}
                    category={question.category}
                    author={question.author_id?.name || question.author_id?.email} // Show the author's name or email
                    hasAnswer={question.has_answer}
                    onViewDetails={() => handleViewDetails(question.id)}
                  />
                ))}
              </div>
              
              {selectedQuestionId && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={handleCloseDetails}>Close</button>
                    <QuestionDetails id={selectedQuestionId} />
                  </div>
                </div>
              )}
              
              <div className={styles.pagination}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? styles.activePage : ''}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
