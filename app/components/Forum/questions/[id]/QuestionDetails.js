"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import styles from './questionDetails.module.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function QuestionDetails({ id }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.log("No question ID provided");
      return;
    }

    console.log(`Fetching question with ID: ${id}`);

    const fetchQuestionAndAnswer = async () => {
      setLoading(true);
      try {
        // Fetch question details
        const { data: questionData, error: questionError } = await supabase
          .from("questions")
          .select(`
            id,
            title,
            body,
            category,
            created_at,
            has_answer,
            users(name, email)
          `)
          .eq("id", id)
          .single();

        if (questionError) {
          console.error("Error fetching question:", questionError);
          throw questionError;
        }

        console.log("Fetched Question:", questionData);

        // Fetch the answer for this question
        const { data: answerData, error: answerError } = await supabase
          .from("answers")
          .select(`
            id,
            body,
            created_at,
            users(name, email)
          `)
          .eq("question_id", id)
          .single();

        if (answerError) {
          console.warn("No answer found or error fetching answer:", answerError);
        }

        console.log("Fetched Answer:", answerData);

        setQuestion(questionData);
        setAnswer(answerData || null); // Set null if no answer found
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1 className={styles.questionTitle}>{question?.title}</h1>
        <p className={styles.questionBody}>{question?.body}</p>
        <span className={styles.author}>
          Asked by: {question?.users?.name || question?.users?.email || "Unknown"}
        </span>
        {question?.has_answer && <span className={styles.answeredBadge}>Answered ✅</span>}

        {answer ? (
          <div className={styles.answerContainer}>
            <h2>Answer</h2>
            <p>{answer?.body}</p>
            <span className={styles.author}>
              Answered by: {answer?.users?.name || answer?.users?.email || "Unknown"}
            </span>
          </div>
        ) : (
          <div>No answer yet</div>
        )}
      </div>
    </div>
  );
}