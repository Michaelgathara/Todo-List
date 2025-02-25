import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "src/styles/Home.module.css";
import { Check, Delete, Plus } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type TodoItem = {
  id: number;
  text: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      console.log("Empty Input");
      return;
    }

    console.log("New Item: ", inputValue);
    const newItem: TodoItem = {
      id: Date.now(),
      text: inputValue.trim(),
    }

    setTodoList((prevList) => [...prevList, newItem]);
    setInputValue("");
  }; 

  const removeItem = (e: React.MouseEvent<HTMLButtonElement>, itemId: number) => {
    e.preventDefault();

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
      <p className={`${styles.appName} ${geistSans.className}`}>
        Todo List App
      </p>
      <div className={
        `${styles.main} ${geistSans.className}`
      }>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <input 
              className={styles.formInput} 
              type="text" 
              placeholder="Enter item ...."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button 
              className={styles.formAddButton} 
              type="submit" 
              onClick={addItem}
            >
                <Plus />
            </button>
          </form>
        </div>
        <div className={styles.listContainer}>
          {todoList.map((item) => (
            <div key={item.id} className={styles.todoContainer}>
                <li key={item.id} className={styles.todoItem}>
                  {item.text}
                </li>
                <button 
                  className={styles.todoDeleteButton}
                  type="submit"
                  onClick={(e) => {removeItem(e, item.id)}}
                >
                  <Check />
                </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
