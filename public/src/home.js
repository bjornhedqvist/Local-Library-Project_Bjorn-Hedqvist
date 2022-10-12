function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  let borrowedBooks = books.filter((bookObj) => {
    let borrows = bookObj.borrows;
    let isBorrowed = borrows.some((currStatus) => {
      return currStatus.returned === false;
    });
    return isBorrowed;
  });
  return borrowedBooks.length;
}

function getMostCommonGenres(books = []) {
  const result = books.reduce((genres, book) => {
    const matchingGenre = genres.find(
      (genreObj) => genreObj.name === book.genre
    );
    !matchingGenre
      ? genres.push({ name: book.genre, count: 1 })
      : matchingGenre.count++;
    return genres;
  }, []);
  let sorted = result.sort((genreA, genreB) => {
    return genreB.count - genreA.count;
  });
  return sorted.slice(0, 5);
}

function getMostPopularBooks(books = []) {
  let result = books.map((bookObj) => {
    return { name: bookObj.title, count: bookObj.borrows.length };
  });
  let sorted = result.sort((bookA, bookB) => {
    return bookB.count - bookA.count;
  });
  return sorted.slice(0, 5);
}

function getMostPopularAuthors(books = [], authors = []) {
  let result = authors.map((authorObj) => {
    const booksForAuthor = books.filter((bookObj) => {
      return authorObj.id === bookObj.authorId;
    });
    const countNum = booksForAuthor.reduce((acc, bookObj) => {
      return acc + bookObj.borrows.length;
    }, 0);
    return {
      name: authorObj.name.first + " " + authorObj.name.last,
      count: countNum,
    };
  });
  let sorted = result.sort((bookA, bookB) => {
    return bookB.count - bookA.count;
  });
  return sorted.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
