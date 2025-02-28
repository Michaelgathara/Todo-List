import { useState } from 'react';
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "src/styles/Home.module.css";
import { Check, Delete, Plus } from "lucide-react";
import { ListItem } from 'src/types/list';

export default function Home() {

  const [itemValue, setItemValue] = useState<string>("");
  const [itemsList, setItemsList] = useState<ListItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setItemValue(e.target.value);
  };

  // TODO: Need a way to add the value to list
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (itemValue.trim() === "") {
      return;
    }

    const newItem: ListItem = {
      key: Date.now(),
      text: itemValue.trim(), 
      completed: false,
    }

    setItemsList((prevList) => [...prevList, newItem]);
    setItemValue("");
  };
  // TODO: Need to have a way to mark item as completed
  const deleteItem = (itemId: number) => {
    {itemsList.map((item) => 
      item.key === itemId
    )}
  };

  const toggleComplete = (itemId: number) => {

  };

  return (
    <>
      <Head>
        <title>Todo List 2</title>
        <meta name="description" content="Todo List 2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.todoTextContainer}>
          <form className={styles.todoFormContainer} onSubmit={addItem}>
            <input 
              type="text" 
              className={styles.todoListInput}
              placeholder="Enter a TODO item....." 
              value={itemValue}
              onChange={((e) => handleInputChange(e))}
            />
            <button 
              type="submit"
              className={styles.todoSubmitButton}
            >
              < Plus size={20}/>
            </button>
          </form>
        </div>
        <div className={styles.todoListContainer}>
          {itemsList.length === 0 ? (
            <p className={styles.todoEmptyWarning}>No Items yet ... Add one above!</p>
          ) : (
            itemsList.map((item) => (
             <div key={item.key} className={styles.todoListItemListing}>
              <p className={`${styles.todoListItemListing_text} ${item.completed ? styles.todoListItemListing_textChecked : ''}`}>
                {item.text}
              </p>
              <Delete size={20} key={item.key} onClick={() => deleteItem(item.key)}/>
              <Check size={20} key={item.key} onClick={() => toggleComplete(item.key)}/>
             </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
