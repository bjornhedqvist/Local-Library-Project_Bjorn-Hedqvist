function findAccountById(accounts=[], id="") {
  let result = accounts.find((accountObj) => {
    return accountObj.id === id;
  });
  return result ? result : null;
}

function sortAccountsByLastName(accounts = []) {
  accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase()
      ? -1
      : 1;
  });
  return accounts;
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  const {id} = account;
  let total = books.reduce((total, bookObj) => {
    let accountDidBorrow = bookObj.borrows.some((borrowsObj) => {
      return borrowsObj.id === id;
    })
  if (accountDidBorrow) {
     total++;
   }
   return total
  }, 0)
  return total
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const {id: givenAccountId} = account
  let booksAccountPossesses = books.filter((bookObj)=>{
    let accountHasBookBorrowed = bookObj.borrows.some((borrowsObj)=>{
      return borrowsObj.id === givenAccountId && borrowsObj.returned === false
    })
    if (accountHasBookBorrowed===true){
      const {authorId} = bookObj
      let foundAuthor = authors.find((authorObj)=>{
          return authorObj.id === authorId
        })
      bookObj.author = foundAuthor
      return bookObj
    }
  })
  return booksAccountPossesses
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
