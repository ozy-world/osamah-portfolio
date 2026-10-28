import React, { useState, useEffect } from "react";
const questions = [
  {
    q: "Bir diziyi dönüştürmek için hangi metot kullanılır?",
    a: ["map", "push", "pop"],
    correct: 0,
  },
  {
    q: "React’te değişen veriyi hangi hook tutar?",
    a: ["useEffect", "useState", "useContext"],
    correct: 1,
  },
  {
    q: "=== neyi karşılaştırır?",
    a: ["Sadece değeri", "Sadece türü", "Değeri ve türü"],
    correct: 2,
  },
  {
    q: "Bir component’a veri nasıl aktarılır?",
    a: ["props", "CSS", "HTML yorumları"],
    correct: 0,
  },
  {
    q: "localStorage verileri ne zaman silinir?",
    a: ["Her render’da", "Sayfa yenilenince", "Silinene kadar saklanır"],
    correct: 2,
  },
];
export function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const done = index === questions.length;
  return (
    <main className="mini">
      <a href="/">← Portfolio</a>
      <p>JAVASCRIPT ALIŞTIRMASI</p>
      <h1>Kendini dene</h1>
      {done ? (
        <>
          <h2>
            {answers.filter((a, i) => a === questions[i].correct).length} /{" "}
            {questions.length}
          </h2>
          {questions.map((q, i) => (
            <p key={q.q}>
              {q.q}
              <br />
              Doğru cevap: <strong>{q.a[q.correct]}</strong>{" "}
              {answers[i] === q.correct ? "✓" : "✗"}
            </p>
          ))}
          <button
            onClick={() => {
              setIndex(0);
              setAnswers([]);
              setSelected(null);
            }}
          >
            Tekrar başla
          </button>
        </>
      ) : (
        <>
          <p>
            Soru {index + 1} / {questions.length}
          </p>
          <h2>{questions[index].q}</h2>
          <fieldset>
            <legend>Cevabını seç</legend>
            {questions[index].a.map((a, i) => (
              <label key={a}>
                <input
                  type="radio"
                  name="answer"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                {a}
              </label>
            ))}
          </fieldset>
          <button
            disabled={selected === null}
            onClick={() => {
              setAnswers([...answers, selected]);
              setIndex(index + 1);
              setSelected(null);
            }}
          >
            {index === questions.length - 1 ? "Sonuçları gör" : "Sonraki"}
          </button>
        </>
      )}
    </main>
  );
}
export function Tasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("study-tasks")) || [];
    } catch {
      return [];
    }
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    try {
      localStorage.setItem("study-tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);
  return (
    <main className="mini">
      <a href="/">← Portfolio</a>
      <p>GÜNLÜK ÇALIŞMA LİSTEM</p>
      <h1>Bugün ne çalışalım?</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) {
            setTasks([
              ...tasks,
              { id: crypto.randomUUID(), text: value.trim(), done: false },
            ]);
            setValue("");
          }
        }}
      >
        <label htmlFor="task">Yeni görev</label>
        <div className="task-entry">
          <input
            id="task"
            maxLength={150}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Örneğin: Array metotlarını tekrar et"
          />
          <button disabled={!value.trim()}>Ekle</button>
        </div>
      </form>
      <p>{tasks.filter((t) => !t.done).length} görev kaldı</p>
      <div className="actions">
        {[
          ["all", "Tümü"],
          ["active", "Yapılacak"],
          ["done", "Tamamlanan"],
        ].map(([key, label]) => (
          <button
            key={key}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <ul>
        {tasks
          .filter(
            (t) => filter === "all" || (filter === "done" ? t.done : !t.done),
          )
          .map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, done: !t.done } : t,
                      ),
                    )
                  }
                />
                <span
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </label>
              <button
                aria-label={task.text + " görevini sil"}
                onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
              >
                Sil
              </button>
            </li>
          ))}
      </ul>
      {!tasks.length && <p>İlk görevini ekleyerek başlayabilirsin.</p>}
    </main>
  );
}
