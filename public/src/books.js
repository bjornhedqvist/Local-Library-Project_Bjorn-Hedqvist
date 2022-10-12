const { findAccountById } = require("./accounts");

function findAuthorById(authors = [], id = "") {
  let result = authors.find((authorObj) => {
    return authorObj.id === id;
  });
  return result ? result : null;
}

function findBookById(books=[], id="") {
  let result = books.find((bookObj) => {
    return bookObj.id === id;
  });
  return result ? result : null;
}

function isBorrowed(borrows = []) {
  let isBorrowed = borrows.some((currStatus) => {
    return currStatus.returned === false;
  });
  return isBorrowed;
}

function partitionBooksByBorrowedStatus(books = []) {
  let borrowedBooks = books.filter((bookObj) => {
    let borrows = bookObj.borrows;
    return isBorrowed(borrows);
  });
  let returnedBooks = books.filter((bookObj) => {
    let returned = bookObj.borrows;
    let isReturned = returned.every((currStatus) => {
      return currStatus.returned === true;
    });
    return isReturned;
  });
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book = {}, accounts = []) {
  let { borrows } = book;
  let result = borrows.map((borrowerAccount) => {
    let foundBorrowerObj = accounts.find((borrowerObj) => {
      return borrowerObj.id === borrowerAccount.id;
    });
    //foundBorrowerObj.returned = borrowerAccount.returned;
    //return foundBorrowerObj;
    return {...foundBorrowerObj, ...borrowerAccount}
  });
  return result.slice(0, 10);
  // return result.filter((items, idx)=>idx < 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
