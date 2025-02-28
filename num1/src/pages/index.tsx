import { useState } from "react";
import Head from "next/head";
import { Geist } from "next/font/google";
import styles from "src/styles/Home.module.css";
import { Check, Trash, Plus } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }

    const newItem: TodoItem = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    }

    setTodoList((prevList) => [...prevList, newItem]);
    setInputValue("");
  }; 

  const toggleComplete = (itemId: number) => {
    setTodoList((prevList) => 
      prevList.map((item) => 
        item.id === itemId 
          ? { ...item, completed: !item.completed } 
          : item
      )
    );
  };

  const removeItem = (e: React.MouseEvent<HTMLButtonElement>, itemId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setTodoList((prevList) => prevList.filter((item) => item.id !== itemId));
  };
  
  return (
    <>
      <Head>
        <title>TODO List App</title>
        <meta name="description" content="Todo list by Michael Gathara" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={geistSans.className}>
        <h1 className={styles.appName}>
          Todo List App
        </h1>
        <main className={styles.main}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={addItem}>
              <input 
                className={styles.formInput} 
                type="text" 
                placeholder="Add a new task..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <button 
                className={styles.formAddButton} 
                type="submit"
              >
                <Plus size={20} />
              </button>
            </form>
          </div>
          <div className={styles.listContainer}>
            {todoList.length === 0 ? (
              <p className="text-center text-gray-500 mt-6">No tasks yet. Add one above!</p>
            ) : (
              todoList.map((item) => (
                <div 
                  key={item.id} 
                  className={styles.todoContainer}
                  onClick={() => toggleComplete(item.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div 
                      className={`${styles.todoCheckbox} ${item.completed ? styles.todoCheckboxChecked : ''}`}
                    >
                      {item.completed && <Check size={14} />}
                    </div>
                    <li 
                      className={`${styles.todoItem} ${item.completed ? styles.todoCompletedItem : ''}`}
                    >
                      {item.text}
                    </li>
                  </div>
                  <button 
                    className={styles.todoDeleteButton}
                    onClick={(e) => removeItem(e, item.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}