import React from "react";
import "../static/navbar.css";  // CSS dosyasını içe aktar

interface NavbarProps {
    onSelectPage: (page: string) => void;
    //bu interface bir fonksiyonu prop'u alıyor.
    //fonksiyon page değerli alıyor string olarak.
    //navbardaki butonlara tıklandığında hangi sayfanın seçileceğini tutyor.
}
//NavbarProps alınan prop türünü gösteriyor.
const Navbar: React.FC<NavbarProps> = ({ onSelectPage }) => { //onSelectPage props olarak verilmiş.
    return (
        <nav>
            <ul>
                <li>
                    <button onClick={() => onSelectPage("books")}>Kullanıcı Ayarları</button>
                </li>
                <li>
                    <button onClick={() => onSelectPage("book-management")}>Kitap Yönetimi</button>
                </li>
                <li>
                    <button onClick={() => onSelectPage("lend-book")}>Kitap Ödünç Ver</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
