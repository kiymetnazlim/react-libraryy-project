import { useState } from "react";
import Navbar from "./Components/Navbar";
import BookManagement from "./Pages/BookForm";
import LendBook from "./Pages/LendBooks";
import './App.css'
import Login from "./Pages/Login";

function App() {
  const [activePage, setActivePage] = useState<string>(""); // Varsayılan olarak kitap listesi

  const handlePageSelect = (page: string) => {
    setActivePage(page);
  };

  return (
    <>

      <Navbar onSelectPage={handlePageSelect} />

      {/* Sayfa durumuna göre bileşen göster */}
      {activePage === "book-management" && <BookManagement />}
      {activePage === "lend-book" && <LendBook />}
      {activePage === "" && <Login />}


    </>

  );

}

export default App;
