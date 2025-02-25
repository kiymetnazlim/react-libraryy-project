import CustomDropdown from "../../Components/CustomDropdown";

const storedUsers: { name: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
console.log(storedUsers)

const userNames = storedUsers.map(user => user.name);
console.log(userNames)

const storedBooks: { title: string }[] = JSON.parse(localStorage.getItem('books') || '[]');
console.log(storedBooks)

const bookNames = storedBooks.map(book => book.title)
console.log(bookNames)


const LendBooks = () => {
    return (
        <>
            <div style={styles.container}>
                <CustomDropdown options={userNames} width="400px" height="600px" position="center" />
                <CustomDropdown options={bookNames} width="400px" height="600px" position="center" />
            </div>
            <div>

            </div>
        </>

    );

};

const styles = {
    container: {
        display: "flex" as "flex",
        flexDirection: "row" as "row",
        justifyContent: "center" as "center",
        alignItems: "center" as "center",
        height: "100vh",
    } as React.CSSProperties, // React.CSSProperties türüyle stil nesnesi
};


export default LendBooks;